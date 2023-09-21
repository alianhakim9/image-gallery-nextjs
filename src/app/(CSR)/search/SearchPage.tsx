"use client";
import Image from "next/image";

import { FormEvent, useState } from "react";
import { UnsplashImage } from "@/models/unsplash-image";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState<Array<UnsplashImage> | null>(
    null
  );
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [searchResultError, setSearchResultError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (query) {
      try {
        setSearchResult(null);
        setSearchResultError(false);
        setSearchResultLoading(true);

        const response = await fetch(`api/search?query=${query}`);
        const images: Array<UnsplashImage> = await response.json();
        setSearchResult(images);
      } catch (error) {
        console.error(error);
        setSearchResultError(true);
      } finally {
        setSearchResultLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page <strong>fetches and caches data</strong> using client side
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search Image</Form.Label>
          <Form.Control
            placeholder="E.g skateboard, photography, ..."
            name="query"
            type="text"
          />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={searchResultLoading}>
          Search
        </Button>
      </Form>

      <div className="mt-5">
        <div className="d-flex flex-column align-items-center">
          {searchResultLoading && <Spinner animation="border" />}
          {searchResultError && <p>Something went wrong</p>}
          {searchResult?.length === 0 && (
            <p>Nothing found, try another query</p>
          )}
        </div>
        {searchResult &&
          searchResult.map((item) => (
            <Image
              src={item.urls.raw}
              alt={item.description}
              className={styles.image}
              width={250}
              height={250}
              key={item.urls.raw}
            />
          ))}
      </div>
    </div>
  );
}
