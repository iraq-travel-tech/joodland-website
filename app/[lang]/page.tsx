import HomeMain from "@/components/home/HomeMain";
import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";

export interface PageProps {
  params: { lang: Locale };
}

export default async function page(props: PageProps) {
  const dictionary: any = await getDictionary(props.params.lang);

  return (
    <div>
      <HomeMain lang={props.params.lang} dictionary={dictionary} />
    </div>
  );
}
