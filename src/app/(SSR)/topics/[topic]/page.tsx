import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

// export const dynamicParams = false;

interface PageProps {
  params: {
    topic: string;
  };
}

export function generateStaticParams() {
  return ["health", "indie", "skateboard"].map((topic) => ({ topic }));
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: `${topic} - Image Gallery`,
  };
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {}
  );

  const images: Array<UnsplashImage> = await response.json();

  return (
    <div>
      <Alert variant="info">
        This page use <strong>generatedStaticParams</strong> to render and cache
        static at build time, event though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          key={image.urls.raw}
          src={image.urls.raw}
          alt={image.description}
          className={styles.image}
          width={250}
          height={250}
        />
      ))}
    </div>
  );
}
