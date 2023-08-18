# screen-recorder

Web-based screen recorder with upload to S3. Built with SvelteKit, Tailwind, DaisyUI & S3.

## Demo

[https://screenrec.vercel.app/](https://screenrec.vercel.app/) (recordings are deleted after 48 hours)

## Features

- Record your screen
- Upload & get a shareable link

## Development

```bash
git clone https://
cd screen-recorder
pnpm install

# Either run MinIO locally with the command below or use a hosted service
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  -e "MINIO_ROOT_USER=changeme" \
  -e "MINIO_ROOT_PASSWORD=changeme" \
  -v ./recordings:/data \
  minio/minio server /data --console-address ":9001"

# At this point, copy the .env.example file to .env and fill in the values
# Then run the following command to start the dev server
pnpm dev
```
