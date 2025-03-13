## Environment Variables
 - Create a `.env` file in this directory
 - Add the following environment variables to the `.env` file
```.env
CHANNEL_SECRET={your_channel_secret}
CHANNEL_ACCESS_TOKEN={your_channel_access_token}
LIFF_URL=https://liff.line.me/{your_liff_id}
PUBLIC_URL=https://{your_domain.com}/public
PORT=3000
```

## Structure of the line-bot directory
```bash
    line-bot
    ├── /src
    │   ├── /handlers
    │   │   ├── check-event.ts
    │   │   ├── default-message.ts
    │   │   ├── index.ts
    │   │   └── reply.ts
    │   └── index.ts
    ├── .env
    ├── Dockerfile
    ├── environment.d.ts
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tsconfig.json
```