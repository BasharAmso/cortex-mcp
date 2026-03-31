---
id: PAT-0160
name: Form Validation Pattern
category: patterns
tags: [forms, validation, react-hook-form, zod, error-handling, schema-validation]
capabilities: [client-validation, server-validation, error-display, schema-definition]
useWhen:
  - building forms with client-side validation
  - implementing schema-based validation with Zod or Yup
  - displaying validation errors accessibly
  - coordinating client and server-side validation
  - handling complex form state with nested fields
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0313, PAT-0165]
dependencies: []
synonyms: ["how to validate forms in React", "how to use react-hook-form with zod", "how to show form errors", "how to do client-side validation", "how to validate email and password fields", "best way to handle form validation"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/react-hook-form/react-hook-form"
difficulty: beginner
owner: "cortex"
pillar: "frontend"
---

# Pattern: Form Validation

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0160 |
| **Name** | Form Validation Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Form validation has two jobs: prevent bad data from reaching the server, and guide users to fix mistakes. Client-side validation is for UX; server-side validation is for security. You always need both.

### The Stack: React Hook Form + Zod

React Hook Form handles form state with minimal re-renders. Zod provides type-safe schema validation. Together they are the standard pattern in modern React:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // data is fully typed and validated
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      {/* ... more fields */}
    </form>
  );
}
```

### Validation Timing

| Strategy | When Errors Appear | Best For |
|----------|-------------------|----------|
| **onSubmit** | After form submission | Simple forms, fewer distractions |
| **onBlur** | When field loses focus | Longer forms, immediate feedback |
| **onChange** | As the user types | Password strength, search filters |
| **onTouched** | onBlur first, then onChange | Best UX for most forms (React Hook Form default with `mode: 'onTouched'`) |

### Error Display Guidelines

1. **Place errors directly below the field** they relate to, not in a summary at the top.
2. **Use `role="alert"`** on error messages so screen readers announce them immediately.
3. **Set `aria-invalid="true"`** on the invalid input.
4. **Use color AND text** to indicate errors. Red border alone fails accessibility (color-only indicator).
5. **Be specific.** "Please enter a valid email address" is better than "Invalid input."

### Server-Side Validation Errors

When the server returns validation errors, map them back to form fields:

```typescript
const onSubmit = async (data: FormData) => {
  const response = await createAccount(data);
  if (response.errors) {
    // Map server errors to form fields
    response.errors.forEach(({ field, message }) => {
      setError(field as keyof FormData, { message });
    });
  }
};
```

### Common Schema Patterns

```typescript
// Optional field with default
z.string().optional().default('')

// Enum selection
z.enum(['starter', 'pro', 'enterprise'], { message: 'Please select a plan' })

// URL validation
z.string().url('Please enter a valid URL')

// Date range
z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine(d => d.endDate > d.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
})

// File upload
z.instanceof(File).refine(f => f.size < 5_000_000, 'File must be under 5MB')
```

### Multi-Step Form Pattern

For wizard-style forms, validate each step independently:

1. Define a Zod schema per step.
2. Use `useForm` with the current step's schema.
3. Store completed step data in parent state or context.
4. Validate and merge all steps on final submission.

## Anti-Patterns

- Validating only on the client (server must re-validate everything)
- Error summary at the top with no inline field errors (users cannot find the problem)
- Blocking submit without showing why (button disabled with no error messages)
- Clearing all form data after a single validation error
- Using `required` attribute without custom error messages (browser defaults are not user-friendly)

## Key Takeaways

- React Hook Form + Zod is the standard pattern: minimal re-renders, type-safe schemas
- Validate on the client for UX, on the server for security; always do both
- Show errors inline below each field with `role="alert"` for accessibility
- Use `onTouched` mode for the best balance of immediate feedback without distracting the user
- Map server validation errors back to individual form fields
