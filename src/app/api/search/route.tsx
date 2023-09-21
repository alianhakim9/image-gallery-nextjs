import { UnsplashImageResponse } from "@/models/unsplash-image";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      {
        error: "No query provided",
      },
      { status: 400 }
    );
  }
  const response = await fetch(
    `${process.env.BASE_URL}/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const { results }: UnsplashImageResponse = await response.json();
  return NextResponse.json(results);
}
