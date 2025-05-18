// src/middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    
    const publicPaths = ["/", "/auth/login", "/submit-complaint"];
    if (publicPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    
    if (!kindeUser || !kindeUser.id || !kindeUser.email) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    
    let dbUser = await db
      .select()
      .from(users)
      .where(eq(users.kindeId, kindeUser.id))
      .then((res) => res[0]);

    if (!dbUser) {
      [dbUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          kindeId: kindeUser.id,
          email: kindeUser.email,
          name: kindeUser.given_name || kindeUser.family_name || "",
          role: "citizen",
        })
        .returning();
    } else {
      await db
        .update(users)
        .set({
          email: kindeUser.email,
          name: kindeUser.given_name || kindeUser.family_name || "",
          updatedAt: new Date(),
        })
        .where(eq(users.kindeId, kindeUser.id));
    }

    
    const isAdmin = dbUser.role === "admin";
    const isCitizen = dbUser.role === "citizen";

    
    if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/dashboard") && !isCitizen) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    
    if (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/") {
      const redirectUrl = isAdmin ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    publicPaths: ["/", "/auth", "/submit-complaint"],
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};