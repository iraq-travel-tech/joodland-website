import FlightsPage from "@components/pages/flights/FlightsPage";
import { useTranslations } from "next-intl";
import React from "react";

export default function page({
  params,
}: {
  params: {
    FromTo: string;
  };
}) {
  const from = params.FromTo.split("-")[0];
  const to = params.FromTo.split("-")[1];
  const t = useTranslations("flights");

  const allTexts = {
    flights: {
      selectOutbound: t("selectOutbound"),
      btns: {
        goback: t("btns.goback"),
        stops: t("btns.stops"),
        sort: t("btns.sort"),
      },
      directions: {
        oneway: t("directions.oneway"),
        round: t("directions.round"),
      },
    },
  };

  return (
    <div className="md:mt-4">
      <FlightsPage allTexts={allTexts.flights} />
    </div>
  );
}
