## Environment Variables
 - Create a `.env` file in this directory
 - Add the following environment variables to the `.env` file
```.env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://{user}.jxlmrvwanbkomzpobzqs:{pass_word}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://{user}.jxlmrvwanbkomzpobzqs:{pass_word}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

SUPABASE_ENDPOINT={Project_URL}
SUPABASE_KEY={service_role_secret}
SUPABASE_BUCKET_NAME=Liff-img

ORIGIN=https://{your_domain.com}
PORT=3002
```

## Structure of the backend directory
```bash
    backend
    ├── /src
    │   ├── /routes
    │   │   └── post.ts
    │   └── index.ts
    ├── .env
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tsconfig.json
```

## Note
- After npm install, run `npx prisma generate` to generate the Prisma client.