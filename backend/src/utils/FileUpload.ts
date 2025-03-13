import { createClient } from '@supabase/supabase-js';

interface UploadStrategy {
    upload(file: Express.Multer.File): Promise<string>;
}

const supabaseEndpoint = process.env.SUPABASE_ENDPOINT as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const bucketName = process.env.SUPABASE_BUCKET_NAME as string;
if (!supabaseEndpoint || !supabaseKey || !bucketName) {
    throw new Error('SUPABASE is not provided');
}
const supabase = createClient(supabaseEndpoint, supabaseKey);
class SupabaseStorageStrategy implements UploadStrategy {
    async upload(file: Express.Multer.File): Promise<string> {
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(file.originalname, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            throw new Error(error.message);
        }

        // return URL file
        return supabase.storage.from(bucketName).getPublicUrl(file.originalname).data.publicUrl;
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

export { uploadSupabase, FileUpload };