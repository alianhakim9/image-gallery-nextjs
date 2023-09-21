import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata: Metadata = {
  title: "Incremental Static Regeneration - Image gallery",
};

// export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      //   cache: "no-cache", // or u can use no-store
      next: {
        revalidate: 15,
      },
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = width / image.width + image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert variant="info">
        This page uses <strong>incremental static regeneration.</strong> A new
        page is fetched every 15 second (after refresing the page, you get a new
        image from the Unsplash API.)
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow-lg mw-100 h-100"
      />
      <div className="d-flex mt-3 gap-2">
        <p>author: </p>
        <Link href={`/users/${image.user.username}`}>
          {image.user.username}
        </Link>
      </div>
    </div>
  );
}
