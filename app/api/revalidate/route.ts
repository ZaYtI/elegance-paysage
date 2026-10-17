import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { sanityRevalidateSecret } from "@/lib/sanity/env";

export async function POST(request: NextRequest) {
  if (!sanityRevalidateSecret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 500 });
  }

  const { isValidSignature } = await parseBody(request, sanityRevalidateSecret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }

  revalidateTag("sanity", { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
