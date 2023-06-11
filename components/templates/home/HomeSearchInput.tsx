import TextInput from "@components/elements/textinput/TextInput";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDebouncedValue } from "@mantine/hooks";
import { IoMdClose } from "react-icons/io";
import { useParams } from "next/navigation";

export type ElasticSearchResponse = {
  id: string;
  destination_images: { image_jpeg: string };
  name: string;
  cityname: string;
};

type HomeSearchInputProps = {
  State: string;
  setState: (state: string) => void;
  placeHolder: string;
  startIcon: React.ReactNode;
  SearchFunction: (state: any) => Promise<ElasticSearchResponse[]> | ElasticSearchResponse[];
};

const HomeSearchInput: React.FC<HomeSearchInputProps> = ({
  State,
  setState,
  placeHolder,
  startIcon,
  SearchFunction,
}) => {
  const [inputState, setInputState] = useState(State);
  const [openContainer, setOpenContainer] = useState(false);
  const [results, setResults] = useState<ElasticSearchResponse[]>([]);
  const [selectedFromList, setSelectedFromList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [debouncedFrom] = useDebouncedValue(inputState, 500);

  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      if (openContainer) {
        event.preventDefault();
        setOpenContainer(false);
      }
    },
    [openContainer, setOpenContainer]
  );

  useEffect(() => {
    if (openContainer) {
      window.history.pushState(null, "");
      window.addEventListener("popstate", handlePopState);
    } else {
      window.removeEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [openContainer, handlePopState]);

  const params = useParams();

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      setError("");
      try {
        const data = await SearchFunction(debouncedFrom.trim());
        setResults(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      }
      setLoading(false);
    }

    if (debouncedFrom.trim() !== "") {
      fetchResults();
    }
  }, [debouncedFrom, SearchFunction]);

  const containerClasses = useMemo(() => {
    return `autocomeplete-container absolute bg-white sm:h-[17em] max-h-[50vh] sm:rounded-lg rounded sm:top-14 top-32 sm:w-[27em] ${params?.locale === "ar" ? "sm:right-0" : "sm:left-0"} left-5 sm:right-auto overflow-y-scroll right-5 flex-col flex gap-4 sm:py-0 py-3 sm:shadow-lg z-50`;
  }, [params]);

  return (
    <div
      className={`sm:relative sm:p-0 ${
        openContainer && "z-50 fixed p-5"
      } bg-white  top-0 left-0 w-full h-full`}
    >
      <motion.div layout>
        {openContainer && (
          <div className="text-2xl flex justify-between items-center mb-4 font-bold sm:hidden">
            <p>{placeHolder}</p>
            <button className="active:scale-90 transition-all">
              <IoMdClose />
            </button>
          </div>
        )}
        <TextInput
          className=""
          startIcon={startIcon}
          State={inputState}
          setState={setInputState}
          placeholder={placeHolder}
          onBlur={() => {
            if (!selectedFromList) {
              setInputState("");
              setSelectedFromList(false);
            }
            setTimeout(() => {
              setOpenContainer(false);
            }, 400);
          }}
          onFocus={() => setOpenContainer(true)}
        />
      </motion.div>
      {openContainer && (
        <div className={containerClasses}>
          <AnimatePresence>
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-20 rounded flex gap-2 p-2">
                  <div className="min-w-14 w-14 h-14 rounded bg-gray-300 animate-pulse"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-[8em] h-6 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-[4em] h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div>{error}</div>
            ) : (
              results.map((item, index) => (
                <AirportItem
                  key={item.id + index}
                  item={item}
                  onSelect={() => {
                    setSelectedFromList(true);
                    setInputState(item.id);
                    setState(item.id);
                    setSelectedFromList(false);
                  }}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const AirportItem: React.FC<{
  item: ElasticSearchResponse;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      className="h-20 relative cursor-pointer rounded hover:bg-gray-100 p-2 flex gap-2"
      onClick={onSelect}
    >
      <img
        className="object-cover min-w-14 w-14 h-14 rounded"
        src={item.destination_images?.image_jpeg}
        alt={`${item.name} - ${item.cityname}`}
      />
      <div className="flex flex-col">
        <div className="font-bold">{item.name}</div>
        <div className="text-zinc-400 text-sm line-clamp-1">
          {item.cityname}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSearchInput;
