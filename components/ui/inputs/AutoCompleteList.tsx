import { ElasticSearch } from "@/interfces/elasticSearch";
import { motion } from "framer-motion";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface AutoCompleteListProps {
  results: ElasticSearch[];
  setState: any;
  setOpenInput: any;
  setSelectedFromList: any;
  OpenInput: boolean;
}

export default function AutoCompleteList(props: AutoCompleteListProps) {
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
    >
      <motion.ul
        layout
        className="absolute max-h-[20em] overflow-y-scroll w-full shadow-lg z-40 top-20 bg-white rounded p-2"
      >
        {props.results.map((result: ElasticSearch, index) => {
          const previousImage =
            index > 0
              ? props.results[index - 1].destination_images?.image_jpeg
              : null;
          const currentImage = result.destination_images?.image_jpeg;
          const showImage = currentImage !== previousImage || index === 0;

          return (
            <motion.li
              key={result.id + index}
              layout
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 20,
                opacity: 0,
              }}
              onClick={() => {
                props.setState(result.id);
              }}
              className="flex gap-3 rounded hover:bg-gray-100 justify-between items-center p-2 cursor-pointer"
            >
              {" "}
              {showImage ? (
                <div className="min-w-10 h-10">
                  <img
                    className="w-full h-full rounded object-cover"
                    src={currentImage}
                    alt=""
                  />
                </div>
              ) : (
                <MdOutlineSubdirectoryArrowRight className="text-black ml-3" />
              )}
              <div className="flex flex-col flex-1">
                <div className="font-bold">{result.name}</div>
                <div className="text-zinc-500 text-xs truncate max-w-[20em] ">
                  {result.cityname}
                </div>
              </div>
              <div className="font-bold text-white bg-orange-600 py-1 px-2 rounded text-xs">
                {result.id}
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* dark background */}
      <div
        // onClick={() => props.setOpenInput(null)}
        className="fixed inset-0 sm:bg-black/40 bg-white z-10"
      />
    </motion.div>
  );
}
