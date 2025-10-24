import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // In development, redirect to download with test mode
    if (process.env.NODE_ENV === 'development') {
      const downloadUrl = new URL('/api/download-codebase?test=true', request.url);
      return NextResponse.redirect(downloadUrl);
    }

    // In production, redirect to download page (will check subscription)
    const downloadUrl = new URL('/download-codebase', request.url);
    return NextResponse.redirect(downloadUrl);

  } catch (error) {
    console.error("Error in test download:", error);
    return NextResponse.redirect(new URL('/pricing', request.url));
  }
}
