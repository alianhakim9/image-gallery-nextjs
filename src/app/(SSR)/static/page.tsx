import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata: Metadata = {
  title: "Static Fetching - Image gallery",
};

export default async function Page() {
  const response = await fetch(
    `${process.env.BASE_URL}/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = width / image.width + image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert variant="info">
        This page <strong>fetches and caches data at build time.</strong> Even
        though the Unsplash API always returns a new image, we see the same
        image after refreshing the page until we compile the project again.
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
