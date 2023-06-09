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
  State: { name: string; iataCode: string };
  setState: (state: any) => void;
  placeHolder: string;
  startIcon: React.ReactNode;
  SearchFunction: (
    state: any
  ) => Promise<ElasticSearchResponse[]> | ElasticSearchResponse[];
  RecentSearches?: { name: string; iata: string }[] | []; // Modify this line
};

const HomeSearchInput: React.FC<HomeSearchInputProps> = ({
  State,
  setState,
  placeHolder,
  startIcon,
  SearchFunction,
  RecentSearches,
}) => {
  const [inputState, setInputState] = useState(State.name); // Set inputState to be a string
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
        if (typeof debouncedFrom === "string" && debouncedFrom.trim() !== "") {
          const data = await SearchFunction(debouncedFrom.trim());
          setResults(data);
        }
      } catch (err) {
        console.error(err);
        setError("Network Error");
      }
      setLoading(false);
    }

    fetchResults();
  }, [debouncedFrom, SearchFunction]);

  const containerClasses = useMemo(() => {
    return `autocomeplete-container p-3 absolute bg-white sm:h-[17em] max-h-[50vh] sm:rounded-lg rounded sm:top-14 top-32 sm:w-[27em] ${
      params?.locale === "ar" ? "sm:right-0 sm:left-auto" : "sm:left-0"
    } sm:right-auto  overflow-y-scroll right-5 left-5  flex-col flex gap-4 sm:py-0 
    ${RecentSearches && RecentSearches?.length > 0 ? "pb-3" : "py-3"}
    sm:shadow-xl z-50`;
  }, [params]);

  return (
    <div
      className={`sm:relative sm:p-0 ${
        openContainer && "z-50 fixed p-5"
      } bg-white top-0 left-0 w-full h-full ${openContainer && "z-50"}
      `}
    >
      <motion.div layout>
        {openContainer && (
          <div className="flex items-center justify-between mb-4 text-2xl font-bold sm:hidden">
            <p>{placeHolder}</p>
            <button className="transition-all active:scale-90">
              <IoMdClose />
            </button>
          </div>
        )}
        <TextInput
          className=""
          startIcon={startIcon}
          State={inputState} // pass inputState as a string
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
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex h-20 gap-2 p-2 rounded">
                    <div className="bg-gray-300 rounded min-w-14 w-14 h-14 animate-pulse"></div>
                    <div className="flex flex-col gap-1">
                      <div className="w-[8em] h-6 bg-gray-300 animate-pulse rounded"></div>
                      <div className="w-[4em] h-4 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                {RecentSearches && (
                  <div className="sticky top-0 left-0 z-40 flex gap-2 py-2 overflow-x-scroll bg-white sm:px-2 min-h-max">
                    {RecentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="px-2 py-1 text-sm border rounded-full min-w-max text-zinc-400"
                        onClick={() => {
                          setInputState(search.name);
                          setState({
                            name: search.name,
                            iataCode: search.iata,
                          });
                        }}
                      >
                        {search.name}
                      </button>
                    ))}
                  </div>
                )}
                {results.map((item, index) => (
                  <AirportItem
                    key={item.id + index}
                    item={item}
                    onSelect={(selectedAirport) => {
                      setSelectedFromList(true);
                      setInputState(selectedAirport.name); // Set the name in inputState
                      setState(selectedAirport); // set the state as the object
                      setSelectedFromList(false);
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const AirportItem: React.FC<{
  item: ElasticSearchResponse;
  onSelect: (selectedAirport: { name: string; iataCode: string }) => void;
}> = ({ item, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      className="relative flex h-20 gap-2 p-2 rounded cursor-pointer hover:bg-gray-100"
      onClick={() => {
        onSelect({
          name: item.name,
          iataCode: item.id, // assuming the id is the IATA code
        });
      }}
    >
      {/* <img
        className="object-cover rounded min-w-14 w-14 h-14"
        src={item.destination_images?.image_jpeg}
        alt={`${item.name} - ${item.cityname}`}
      /> */}
      <div className="flex flex-col">
        <div className="font-bold">{item.name}</div>
        <div className="text-sm text-zinc-400 line-clamp-1">
          {item.cityname}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSearchInput;
