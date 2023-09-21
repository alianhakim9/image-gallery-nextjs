"use client";

import { FormEvent } from "react";
import { Alert, Button, Form } from "react-bootstrap";

export default function SearchPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query");
    if (query) {
      alert(query);
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
        <Button type="submit" className="mt-3">
          Search
        </Button>
      </Form>
    </div>
  );
}
