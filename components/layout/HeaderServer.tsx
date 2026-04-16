import { sanityFetch } from "@/sanity/lib/live";
import { headerBrandsQuery } from "@/sanity/lib/queries";
import Header from "./Header";

const ECCO_LINK = { label: "ECCO", href: "/varumarken/ecco" };

/**
 * Server component wrapper for Header.
 * Derives navigation brand links from brandPage documents in Sanity.
 * ECCO is appended to the best-selling list because it uses a
 * different schema type (eccoBrandPage).
 */
export default async function HeaderServer() {
  const { data } = await sanityFetch({ query: headerBrandsQuery });

  const bestSelling = [ECCO_LINK, ...(data?.bestSellingBrands ?? [])];
  const otherBrands = data?.otherBrands ?? [];

  return <Header bestSelling={bestSelling} otherBrands={otherBrands} />;
}
