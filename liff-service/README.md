## Environment Variables
 - Create a `.env` file in this directory
 - Add the following environment variables to the `.env` file
```.env
VITE_LIFF_ID={your_liff_id}
VITE_MAP_API_KEY={your_map_api_key by Traces Track (OpenStreetMap)}
VITE_RAPID_API_KEY={your_rapid_api_key for reverse geocoding}
VITE_LIFF_URL=https://liff.line.me
```

## API Used
 [feroeg-reverse-geocoding (RAPID_API_KEY)](https://rapidapi.com/castelli0giovanni-VdUSmLXuCR3/api/feroeg-reverse-geocoding/playground/apiendpoint_25fdc514-102d-4c92-bd75-92c8ea9e364d)
 [OpenStreetMap API by Traces Track (MAP_API_KEY)](https://console.tracestrack.com/)

## Structure of the liff-service directory
```bash
    liff-service
    ├── /public
    │   ├── /animations
    │   │   └── megaPhone-Animation.lottie
    │   └── /liff-icons
    │       ├── favicon.svg
    │       ├── folder_check.svg
    │       ├── location.svg
    │       └── megaphone.svg
    ├── /src
    │   ├── /components
    │   │   ├── detail.tsx
    │   │   ├── index.ts
    │   │   ├── map.css
    │   │   ├── map.tsx
    │   │   ├── qr-address.css
    │   │   ├── qr-address.tsx
    │   │   ├── qr-reader-file.css
    │   │   ├── qr-reader-file.tsx
    │   │   ├── qr-reader.css
    │   │   ├── qr-reader.tsx
    │   │   ├── upload-image.css
    │   │   └── upload-image.tsx
    │   ├── /pages
    │   │   ├── index.tsx
    │   │   ├── Inform.tsx
    │   │   ├── Inform.tsx
    │   │   ├── Status.tsx
    │   │   └── StatusById.tsx
    │   ├── /utils
    │   │   ├── Flex-message.ts
    │   │   ├── FlexBubble.test.ts
    │   │   └── index.ts
    │   ├── App.css
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .env
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── vite.config.ts
```