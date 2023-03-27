import { SearchParamsProps } from "@/interfces/SearchParamsProps";

type PageProps = {
  searchParams: SearchParamsProps;
};
export default function page({ searchParams }: PageProps) {
  return <div>page</div>;
}
