---
id: SKL-0353
name: Image & Avatar Handling
category: skills
tags: [image, avatar, upload, resize, crop, cdn, placeholder, lazy-loading, optimization]
capabilities: [image-upload, avatar-generation, image-optimization, cdn-delivery, placeholder-images]
useWhen:
  - implementing user avatar upload and display
  - optimizing images for web delivery
  - building image upload with crop and resize
  - generating placeholder images for missing content
  - setting up CDN-based image delivery
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0075, PAT-0015, SKL-0013]
dependencies: []
synonyms: ["how to handle image uploads", "user avatar implementation", "image optimization for web", "placeholder image when loading", "resize images on upload", "CDN image delivery"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/imgproxy/imgproxy"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Image & Avatar Handling

Images are the heaviest assets on most pages. Handling them well means fast uploads, automatic optimization, responsive sizing, and graceful fallbacks when images are missing or still loading.

## Avatar Display Component

```jsx
function Avatar({ src, name, size = 'md' }) {
  const [error, setError] = useState(false);
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base' };
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  // Generate consistent color from name
  const hue = name ? name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360 : 0;

  if (!src || error) {
    return (
      <div
        className={`rounded-full flex items-center justify-center font-medium text-white ${sizes[size]}`}
        style={{ backgroundColor: `hsl(${hue}, 50%, 45%)` }}
        role="img"
        aria-label={name}
      >
        {initials || '?'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover ${sizes[size]}`}
      onError={() => setError(true)}
    />
  );
}
```

Avatar rules:
- Always provide a fallback (initials on colored background)
- Use `onError` to catch broken image URLs
- Generate consistent colors from the user's name for recognizability
- Use `object-cover` to handle non-square source images

## Image Upload with Validation

```jsx
function ImageUpload({ onUpload, maxSizeMB = 5 }) {
  const handleFile = (file) => {
    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or WebP image');
      return;
    }
    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image must be under ${maxSizeMB}MB`);
      return;
    }
    // Preview and upload
    const preview = URL.createObjectURL(file);
    onUpload({ file, preview });
  };

  return (
    <label className="cursor-pointer border-2 border-dashed rounded-lg p-6 text-center block">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={e => e.target.files[0] && handleFile(e.target.files[0])}
      />
      <p>Click or drag to upload</p>
      <p className="text-sm text-gray-500">JPG, PNG, or WebP up to {maxSizeMB}MB</p>
    </label>
  );
}
```

## Client-Side Image Resizing

Resize before uploading to save bandwidth and server processing:

```jsx
function resizeImage(file, maxWidth = 1200) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/webp', 0.85);
    };
    img.src = URL.createObjectURL(file);
  });
}
```

## Responsive Image Delivery

```html
<img
  src="/images/hero-800.webp"
  srcset="/images/hero-400.webp 400w, /images/hero-800.webp 800w, /images/hero-1200.webp 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Product screenshot"
  loading="lazy"
  decoding="async"
  width="800"
  height="450"
/>
```

- Always set explicit `width` and `height` to prevent layout shift
- Use `loading="lazy"` for below-the-fold images
- Serve WebP with AVIF as progressive enhancement
- Use `srcset` with width descriptors and `sizes` for responsive selection

## Placeholder Strategies

| Strategy | Use When | Example |
|----------|----------|---------|
| **Blur-up** | Hero images, featured content | Tiny base64 image that blurs, then swaps to full |
| **Solid color** | Thumbnails, grid items | Dominant color from the image as background |
| **Skeleton** | Avatars, profile images | Grey circle with shimmer animation |
| **Initials** | User avatars specifically | First letters of name on colored background |

## Key Takeaways

- Always provide initials-based fallback for user avatars; never show a broken image icon
- Resize images client-side before upload to reduce bandwidth and processing
- Use `srcset` and `sizes` for responsive delivery; let the browser pick the right size
- Set explicit `width` and `height` on all `<img>` tags to prevent Cumulative Layout Shift
- Lazy-load all images below the fold with `loading="lazy"`
