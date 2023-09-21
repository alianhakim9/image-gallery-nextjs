"use client";

import { Button } from "react-bootstrap";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="text-center">
      <h1>Error : 😒</h1>
      <p>{error.message}</p>
      <Button
        onClick={reset}
        className="rounded-pill ps-5 pe-5"
        variant="primary"
      >
        Try Again
      </Button>
    </div>
  );
}
