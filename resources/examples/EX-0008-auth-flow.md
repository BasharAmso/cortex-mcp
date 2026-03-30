---
id: EX-0008
name: Authentication Flow
category: examples
tags: [authentication, nextauth, next-js, login, signup, session, oauth, jwt, auth-flow]
capabilities: [auth-setup, session-management, protected-routes, oauth-integration]
useWhen:
  - implementing login/signup in Next.js
  - setting up NextAuth
  - protecting routes with authentication
  - adding OAuth providers
estimatedTokens: 650
relatedFragments: [PAT-0003, SKL-0005, SKL-0006]
dependencies: []
synonyms: ["add login to my Next.js app", "NextAuth setup example", "protect pages behind login", "OAuth with Google sign in", "session based auth in Next.js"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: intermediate
---

# Authentication Flow (Next.js + NextAuth)

Complete authentication setup with Google OAuth, credentials login, session management, and route protection using Next.js App Router.

## 1. NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.hashedPassword) return null;

        const isValid = await compare(credentials.password, user.hashedPassword);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## 2. Session Provider Wrapper

```typescript
// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## 3. Protected API Route Middleware

```typescript
// lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new NextResponse("Unauthorized", { status: 401 });
  }
  return session;
}

// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/api/protected/:path*"],
};
```

## 4. Login Page

```typescript
// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (res?.error) return setError("Invalid email or password");
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />
      <button type="submit">Sign in</button>
      <button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign in with Google
      </button>
    </form>
  );
}
```

## Key Points

- Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL` in your `.env.local`
- Google OAuth credentials come from the Google Cloud Console
- The `middleware.ts` matcher array defines which routes require authentication
- Use `getServerSession(authOptions)` in Server Components and API routes
- Use `useSession()` hook in Client Components for session access
