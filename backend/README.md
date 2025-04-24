## Environment Variables
 - Create a `.env` file in this directory
 - Add the following environment variables to the `.env` file
```.env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://{user}.jxlmrvwanbkomzpobzqs:{pass_word}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://{user}.jxlmrvwanbkomzpobzqs:{pass_word}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Supabase service role secret key. Used for uploading images to Supabase storage.
SUPABASE_ENDPOINT={Project_URL}
SUPABASE_KEY={service_role_secret}
SUPABASE_BUCKET_NAME=Liff-img

# Google Storage service account key. Used for uploading images to Google Cloud Storage.
GOOGLE_CLOUD_PROJECT_ID={project_id}
GOOGLE_CLOUD_KEYFILE={path_to_your_service_account_keyfile}
GOOGLE_CLOUD_BUCKET_NAME={bucket_name}

ORIGIN=https://{your_domain.com}
PORT=3002
```

## Note
- After npm install, run `npx prisma generate` to generate the Prisma client.
- Add the notification type to database by running the following command:
```sql
INSERT INTO categories (category_name)
VALUES
    ('น้ำท่วม'),
    ('ความสะอาด'),
    ('ไฟฟ้า'),
    ('ทางเท้า'),
    ('หาบเร่แผงลอย'),
    ('ประปา'),
    ('ถนน'),
    ('ผิดกฎจราจร'),
    ('ทุจริต'),
    ('สัตว์'),
    ('เสียง'),
    ('โรงเรียน'),
    ('ฝุ่นควัน&กลิ่น&PM2.5'),
    ('แท็กซี่/รถเมล์'),
    ('ต้นไม้'),
    ('ภัยออนไลน์'),
    ('อุปกรณ์ชำรุด'),
    ('อาคารสถานที่ชำรุด'),
    ('เผาในที่โล่ง'),
    ('จุดเสี่ยง'),
    ('ขอความช่วยเหลือ'),
    ('สุขภาพ & บัตรทอง'),
    ('ผู้พิการ+ใช้ล้อ'),
    ('อุบัติเหตุ'),
    ('ควันดำ'),
    ('สายสื่อสาร'),
    ('ยาเสพติด'),
    ('ป้ายโฆษณา'),
    ('ขึ้นทะเบียน&สำรวจ'),
    ('ถังดับเพลิง/ประปาหัวแดง'),
    ('เสนอแนะ'),
    ('ขอใช้บริการ'),
    ('คุ้มครองผู้บริโภค'),
    ('สถานบันเทิง'),
    ('ชื่นชม'),
    ('บริจาค/ช่วยเหลือ'),
    ('อื่นๆ');
```