---
id: SKL-0051
name: Form Handling
category: skills
tags: [forms, validation, accessibility, file-upload, multi-step, error-handling, inputs, react-hook-form, zod]
capabilities: [form-validation, error-display, multi-step-forms, file-upload-handling, accessible-forms]
useWhen:
  - building forms with client-side validation
  - implementing multi-step wizards or checkout flows
  - handling file uploads with preview and progress
  - making forms accessible to screen readers
  - choosing a form library for a React project
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0054, SKL-0023, PAT-0001]
dependencies: []
synonyms: ["how do I validate a form in React", "build a multi step form wizard", "my form errors are confusing users", "how to handle file uploads", "make my form work with screen readers"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "frontend"
---

# Form Handling

Build forms that validate clearly, handle errors gracefully, and work for everyone.

## Library Choice

| Library | Best For | Bundle Size | Ecosystem |
|---------|----------|-------------|-----------|
| **React Hook Form** | Performance-critical, large forms | ~9kb | Dominant in React ecosystem |
| **TanStack Form** | Headless, framework-agnostic, type-safe | ~8kb | Newer, growing adoption |
| **Formik** | Simple forms, familiar API | ~13kb | Mature, large user base |
| Native HTML + `useActionState` | Server actions (Next.js), simple forms | 0kb | Built-in |
| **Zod** + React Hook Form | Type-safe schema validation | ~11kb + 9kb | Best DX for TypeScript |

**Default recommendation:** React Hook Form + Zod for type-safe validation. This is the most common pairing in the React ecosystem.

## Validation Pattern

```tsx
const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

### Validation Timing

| Event | Validate | Why |
|-------|----------|-----|
| On submit | Always | First validation pass |
| On blur (after first submit) | Field-level | Immediate feedback after initial attempt |
| On change (after error shown) | Field-level | Clear errors as user fixes them |
| On keystroke (before submit) | Never | Annoying and distracting |

## Error Display Rules

1. **Show errors next to the field**, not in a banner at the top.
2. **Use `aria-describedby`** to connect error text to the input.
3. **Use `aria-invalid="true"`** on fields with errors.
4. **Red is not enough.** Add an icon or text prefix like "Error:" for colorblind users.
5. **Tell users how to fix it**, not just what is wrong.

```tsx
<label htmlFor="email">Email</label>
<input
  id="email" type="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
  {...register("email")}
/>
{errors.email && (
  <p id="email-error" role="alert" className="text-red-600 text-sm">
    {errors.email.message}
  </p>
)}
```

## Multi-Step Forms

1. **Store state in a parent** or use React Hook Form's `useFormContext`.
2. **Show a progress indicator** (Step 2 of 4).
3. **Allow going back** without losing data.
4. **Validate per step**, not all at once on final submit.
5. **Save progress** to localStorage or URL params for long forms.

## File Uploads

| Feature | Implementation |
|---------|---------------|
| Preview | `URL.createObjectURL(file)` for images |
| Size limit | Validate in `onChange` before upload |
| Progress | Use `XMLHttpRequest` or `fetch` with `ReadableStream` |
| Drag and drop | `onDragOver`, `onDrop` events on a drop zone |
| Multiple files | `<input type="file" multiple>` |

**Always validate** file type, file size, and count on client and server.

## Accessibility Checklist

- Every `<input>` has an associated `<label>` (not just placeholder text).
- Required fields use `aria-required="true"` and visual indicator.
- Error messages are announced with `role="alert"` or `aria-live="assertive"`.
- Form can be completed entirely by keyboard (Tab, Enter, Space).
- Submit button is disabled during submission with `aria-busy="true"`.
- Focus moves to the first error field after a failed submission.
