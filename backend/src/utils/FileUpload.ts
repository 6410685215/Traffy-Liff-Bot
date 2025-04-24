import { createClient } from '@supabase/supabase-js';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

interface UploadStrategy {
    upload(file: Express.Multer.File): Promise<string>;
}

const supabaseEndpoint = process.env.SUPABASE_ENDPOINT as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabaseBucketName = process.env.SUPABASE_BUCKET_NAME as string;
if (!supabaseEndpoint || !supabaseKey || !supabaseBucketName) {
    throw new Error('SUPABASE is not provided');
}
const supabase = createClient(supabaseEndpoint, supabaseKey);
class SupabaseStorageStrategy implements UploadStrategy {
    async upload(file: Express.Multer.File): Promise<string> {
        const filename = `${uuidv4()}-${file.originalname}`
        const { data, error } = await supabase.storage
            .from(supabaseBucketName)
            .upload(filename, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            throw new Error(error.message);
        }

        // return URL file
        return supabase.storage.from(supabaseBucketName).getPublicUrl(filename).data.publicUrl;
    }
}

const googleCloudProjectId = process.env.GOOGLE_CLOUD_PROJECT_ID as string;
const googleCloudKeyfile = process.env.GOOGLE_CLOUD_KEYFILE as string;
const googleCloudBucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME as string;
class GoogleCloudStorageStrategy implements UploadStrategy {
    async upload(file: Express.Multer.File): Promise<string> {
        const storage = new Storage({projectId: googleCloudProjectId, keyFilename: googleCloudKeyfile});
        const bucket = storage.bucket(googleCloudBucketName);
        const filename = `${uuidv4()}-${file.originalname}`;
        const fileUpload = bucket.file(filename);

        await fileUpload.save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
            resumable: false,

        });

        // return URL file
        return `https://storage.googleapis.com/${googleCloudBucketName}/${filename}`;
    }
}

class FileUpload {
    private strategy: UploadStrategy;

    constructor(strategy: UploadStrategy) {
        this.strategy = strategy;
    }

    public async upload(file: Express.Multer.File): Promise<string> {
        return this.strategy.upload(file);
    }
}

const uploadSupabase = new SupabaseStorageStrategy();
// const uploadGoogleCloud = new GoogleCloudStorageStrategy();

export { /* uploadGoogleCloud, */ uploadSupabase, FileUpload };