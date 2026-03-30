---
id: SKL-0065
name: File Uploads
category: skills
tags: [file-upload, s3, presigned-url, multipart, image-processing, sharp, storage, validation, streaming]
capabilities: [upload-handling, presigned-url-generation, image-processing, file-validation, chunked-upload]
useWhen:
  - adding file or image upload to an application
  - setting up S3 or R2 presigned URLs for direct browser uploads
  - processing or resizing uploaded images
  - handling large file uploads with progress tracking
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0010, PAT-0002]
dependencies: []
synonyms: ["how do I let users upload files", "my file uploads are too slow and crash the server", "how to upload images to S3 from the browser", "I need to resize images after upload", "how to handle large file uploads without timing out"]
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# File Uploads

Handle file uploads safely and efficiently. Limit payload sizes, validate content server-side, and never trust client-provided file metadata.

## Upload Strategy Comparison

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| Server passthrough | Browser -> your server -> S3 | Small files (<5MB), simple setup |
| Presigned URL | Browser -> S3 directly | Large files, reduces server load |
| Chunked/multipart | File split into parts, uploaded in parallel | Very large files (>100MB) |

**Recommendation:** Presigned URLs for most apps. Server passthrough only for tiny files where simplicity matters more.

## Presigned URL Flow

```
Browser                    Your API                   S3/R2
   |--- POST /upload/url -->|                           |
   |                        |--- generatePresignedUrl ->|
   |<-- { url, fields } ----|                           |
   |--- PUT file directly --------------------------->  |
   |                        |<-- S3 Event Notification--|
   |                        |--- process & save ref --->|
```

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

async function getUploadUrl(userId: string, contentType: string) {
  const key = `uploads/${userId}/${crypto.randomUUID()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return { url, key };
}
```

## Validation: Before and After

**Before upload (client-side):**
- Check file type against an allowlist (e.g., `image/jpeg`, `image/png`, `application/pdf`)
- Enforce maximum file size (reject early, save bandwidth)
- Show file preview for images

**After upload (server-side):**
- Verify content type by reading magic bytes, not the file extension
- Enforce payload size limits at the server/gateway level
- Scan for malware if handling user content at scale
- Never trust the file extension alone

## Image Processing with Sharp

```typescript
import sharp from 'sharp';

async function processAvatar(inputBuffer: Buffer) {
  return sharp(inputBuffer)
    .resize(400, 400, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();
}
```

Generate multiple sizes on upload: thumbnail (150px), medium (600px), original. Store all variants.

## Chunked Uploads for Large Files

For files over 100MB, use S3 multipart upload:
1. Initiate multipart upload (get upload ID)
2. Split file into 5-10MB chunks
3. Upload each chunk in parallel (3-5 concurrent)
4. Complete the multipart upload with part ETags

Libraries like `@aws-sdk/lib-storage` or `tus-js-client` handle this automatically.

## Key Constraints

- Never store uploads in your application's filesystem in production
- Always validate file type server-side, not just client-side
- Set presigned URL expiration to 5-15 minutes maximum
- Generate unique keys (UUIDs) to prevent overwrites and path traversal
- Set a Content-Length limit on presigned URLs to prevent abuse
- Log to stdout (not to files) so infrastructure handles routing, per Node.js best practices
