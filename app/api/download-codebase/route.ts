import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { createCodebaseZip } from "@/scripts/create-codebase-zip";
import { readFileSync, unlinkSync } from "fs";
import { resolve } from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testMode = searchParams.get('test') === 'true';
    const bypassAuth = searchParams.get('bypass') === 'true';

    // Check if user is authenticated
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In development mode, allow bypassing subscription check for testing
    let hasValidSubscription = false;

    if (process.env.NODE_ENV === 'development' && (testMode || bypassAuth)) {
      console.log('🧪 Development mode: Bypassing subscription check for testing');
      hasValidSubscription = true;
    } else {
      // Check if user has an active subscription in production
      const subscriptionPlan = await getUserSubscriptionPlan(user.id);
      hasValidSubscription = subscriptionPlan.isPaid;
    }

    if (!hasValidSubscription) {
      return NextResponse.json({ error: "Subscription required" }, { status: 403 });
    }

    // Generate the zip file
    const zipPath = await createCodebaseZip();

    // Read the file
    const fileBuffer = readFileSync(zipPath);

    // Clean up the temp file
    unlinkSync(zipPath);

    // Return the file as a download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="getcracked-codebase.zip"`,
      },
    });

  } catch (error) {
    console.error("Error generating codebase zip:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
