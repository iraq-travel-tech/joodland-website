"use client";

import Dialog from "@components/elements/dialog/Dialog";
import { useRouter } from "next/navigation"; // Import the necessary hooks
import Button from "@components/elements/button/Button";
import { updateQueryParameter } from "@lib/functions/updateQueryParameter";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type FilterItem = {
  label: string;
  value: string;
};

type FilterProps = {
  label: string;
  items: FilterItem[];
  onFilterChange: (filterName: string, checked: boolean) => void;
};
const CheckboxFilter: React.FC<FilterProps> = ({
  label,
  items,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="font-semibold text-gray-700 mb-2">{label}</div>
      <div className="flex flex-col">
        {items.map((item) => (
          <label
            key={item.value}
            className="flex items-center cursor-pointer mb-2"
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              onChange={(e) => onFilterChange(item.value, e.target.checked)}
            />
            <span className="ml-2 text-gray-700">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default function TopFiltersNav({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterName: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters((prevFilters) => [...prevFilters, filterName]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== filterName)
      );
    }
  };

  const handleSortByChange = (sortBy: string) => {
    updateQueryParameter("sort", sortBy, router);
  };

  // Update URL whenever selected filters change
  useEffect(() => {
    updateQueryParameter("airlines", selectedFilters.join(","), router);
  }, [selectedFilters, router]);

  const t = useTranslations("common");

  return (
    <div className="p-4 bg-gray-100 rounded">
      <Dialog open={isDialogOpen} setOpen={setIsDialogOpen}>
        <div className=" sm:w-96 w-80 p-4 bg-white rounded-lg flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h1 className="font-bold text-xl">{t("btns.filters")}</h1>
            <button
              className="font-semibold text-blue-600 hover:text-blue-700"
              onClick={() => setIsDialogOpen(false)}
            >
              {t("btns.clear")}
            </button>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-gray-600 text-sm">{t("btns.sortby")}</span>
            <select
              name="sort by"
              className="mt-2 p-2 bg-gray-100 rounded focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
              onChange={(e) => handleSortByChange(e.target.value)}
            >
              {[
                { label: t("sort.Cheapest"), value: "cheapest" },
                { label: t("sort.Fastest"), value: "fastest" },
                { label: t("sort.Best"), value: "best" },
              ].map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <CheckboxFilter
            label="Stops"
            items={[
              { label: t("sort.nonstop"), value: "nonstop" },
              { label: t("sort.1stop"), value: "1stop" },
            ]}
            onFilterChange={handleFilterChange}
          />
          <CheckboxFilter
            label={t("texts.Airlines")}
            items={[
              { label: "Egypt Air", value: "egypt-air" },
              { label: "Emirates", value: "emirates" },
              { label: "Royal Jordanian", value: "royal-jordanian" },
            ]}
            onFilterChange={handleFilterChange}
          />
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            {t("btns.done")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
