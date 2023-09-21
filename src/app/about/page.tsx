import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Image gallery",
};

export default async function About() {
  await new Promise((receive) => setTimeout(receive, 1000));
  return <div>This is about page</div>;
}
