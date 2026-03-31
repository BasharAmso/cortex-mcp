---
id: PAT-0015
name: File Upload & Storage
category: patterns
tags: [file-upload, storage, s3, cloudflare-r2, presigned-url, multipart, image-processing, cdn, security]
capabilities: [upload-design, storage-selection, image-processing, cdn-integration]
useWhen:
  - implementing file uploads for a web or mobile app
  - choosing between S3, R2, and other storage providers
  - handling image processing and optimization on upload
  - serving user-uploaded files securely through a CDN
  - generating presigned URLs for direct-to-storage uploads
estimatedTokens: 600
relatedFragments: [PAT-0002, PAT-0003, PAT-0011, SKL-0006]
dependencies: []
synonyms: ["how to upload files in my app", "store images in the cloud", "S3 vs Cloudflare R2", "image upload and resize", "serve user uploaded files"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
---

# File Upload & Storage

Handle file uploads securely, store them durably, and serve them fast. Delegate heavy lifting to object storage and CDNs rather than processing through your application server.

## Upload Strategies

| Strategy | Flow | Best For |
|----------|------|----------|
| **Direct to server** | Client -> Your API -> Storage | Small files (<10MB), simple apps |
| **Presigned URL** | Client -> Your API (get URL) -> Storage directly | Large files, reduced server load |
| **Multipart/resumable** | Client -> Storage (chunked) | Very large files, unreliable networks |

## Presigned URL Flow (Recommended)

1. Client requests upload URL: `POST /api/uploads { filename, contentType }`
2. Server validates request, generates presigned URL + file key
3. Client uploads directly to storage using the URL (PUT)
4. Client confirms upload: `POST /api/uploads/confirm { fileKey }`
5. Server validates file exists, saves metadata to database

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function createUploadUrl(userId: string, contentType: string) {
  const key = `uploads/${userId}/${crypto.randomUUID()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return { url, key };
}
```

## Storage Provider Comparison

| Provider | Egress Cost | S3-Compatible | Best For |
|----------|-------------|---------------|----------|
| **AWS S3** | $0.09/GB | Yes (native) | AWS ecosystem |
| **Cloudflare R2** | Free egress | Yes | Cost-sensitive, global |
| **Supabase Storage** | Included in plan | Yes | Supabase apps |
| **GCS** | $0.12/GB | Partial | GCP ecosystem |

## Security Checklist

1. **Validate file type** server-side (check magic bytes, not just extension)
2. **Limit file size** in both client and server
3. **Generate random filenames** as storage keys (never use originals)
4. **Scan for malware** on sensitive uploads
5. **Set Content-Disposition** headers to prevent browser execution
6. **Restrict presigned URL expiry** to 5-15 minutes
7. **Serve uploads from a separate domain** to prevent XSS on your main domain

## Image Processing

- **On upload:** Use Sharp (Node.js) to generate thumbnails and optimized versions
- **On-the-fly:** Use Cloudflare Images, imgproxy, or Vercel OG for dynamic resizing
- **Always serve WebP/AVIF** with fallback to JPEG for older browsers

## Anti-Patterns

- Storing files in the database (BLOBs scale poorly)
- Trusting file extensions without validating content type
- No size limits on upload endpoints
- Serving user uploads from the same domain as your app (XSS risk)
- Not using a CDN for frequently accessed files
