"use client";

import React, { useEffect, useState } from "react";
import Dialog from "@components/elements/dialog/Dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Import the necessary hooks
import Button from "@components/elements/button/Button";

type FilterItem = {
  label: string;
  value: string;
};

type FilterProps = {
  label: string;
  items: FilterItem[];
  filtersState: any;
  onFilterChange: (filterName: string, checked: boolean) => void;
};

const CheckboxFilter: React.FC<FilterProps> = ({
  label,
  items,
  filtersState,
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
              checked={filtersState[item.value] || false}
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
  // Hooks
  const [sortBy, setSortBy] = useState<string>("cheapest");
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});

  // Next.js hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = (filterName: string, checked: boolean) => {
    setFilters((prev) => ({ ...prev, [filterName]: checked }));
  };

  const setFiltersInView = () => {
    const params = searchParams
      ? new URLSearchParams(searchParams.toString())
      : null;

    if (params) {
      const airlines = Object.keys(filters)
        .filter((filterName) => filters[filterName])
        .map((name) => name.replace(/\s+/g, "-"))
        .join(",");
      params.set("airlines", airlines);
      params.set("sort", sortBy);
      router.replace(`${pathname}?${params}`);
    }
  };

  useEffect(() => {
    setFiltersInView();
  }, [filters, sortBy]);
  return (
    <div className="p-4 bg-gray-100 rounded">
      <Dialog open={isDialogOpen} setOpen={setIsDialogOpen}>
        <div className=" sm:w-96 w-80 p-4 bg-white rounded-lg flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h1 className="font-bold text-xl">All Filters</h1>
            <button
              className="font-semibold text-blue-600 hover:text-blue-700"
              onClick={() => setIsDialogOpen(false)}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-gray-600 text-sm">Sort By</span>
            <select
              name="sort by"
              className="mt-2 p-2 bg-gray-100 rounded focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {[
                { label: "Cheapest", value: "cheapest" },
                { label: "Fastest", value: "fastest" },
                { label: "Best", value: "best" },
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
              { label: "Non-Stop", value: "nonstop" },
              { label: "1 Stop", value: "1stop" },
            ]}
            filtersState={filters}
            onFilterChange={handleFilterChange}
          />
          <CheckboxFilter
            label="Airlines"
            items={[
              { label: "Egypt Air", value: "egyptair" },
              { label: "Emirates", value: "emirates" },
              { label: "Royal Jordanian", value: "royaljordanian" },
            ]}
            filtersState={filters}
            onFilterChange={handleFilterChange}
          />
          <Button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full">
            Done
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
