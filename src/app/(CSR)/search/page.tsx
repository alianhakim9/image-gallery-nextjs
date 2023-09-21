import { Metadata } from "next";
import SearchPage from "./SearchPage";

export const metadata: Metadata = {
  title: "Search - Image gallery",
};

export default async function Page() {
  return <SearchPage />;
}
