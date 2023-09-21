import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata: Metadata = {
  title: "Dynamic Fetching - Image gallery",
};

// export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      //   cache: "no-cache", // or u can use no-store
      next: {
        revalidate: 0,
      },
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = width / image.width + image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert variant="info">
        This page <strong>fetches and caches data at build time.</strong> Even
        though the Unsplash API always returns a new image, we see the same
        image after refreshing the page..
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
