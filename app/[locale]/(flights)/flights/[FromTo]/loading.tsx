import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col gap-4 pt-6 pb-10">
      <div className="h-7 w-[7em] mb-2 rounded bg-gray-300 animate-pulse"></div>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_max-content] relative grid-rows-[max-content-1fr_max-content_max-content] custom-shadow rounded-lg p-4`}
        >
          <p className="col-span-2 h-6 w-[10em] bg-gray-300 animate-pulse rounded-lg"></p>
          <div className="flex items-center justify-between col-span-2 sm:col-span-1">
            <div className="flex gap-4 mt-4">
              <div className="flex-col">
                <p className="h-8 bg-gray-300 rounded-lg w-36 animate-pulse"></p>
                <p className="w-16 h-6 mt-2 bg-gray-300 rounded-lg animate-pulse"></p>
              </div>
              <div className="flex-col">
                <p className="h-8 bg-gray-300 rounded-lg w-36 animate-pulse"></p>
                <p className="w-16 h-6 mt-2 bg-gray-300 rounded-lg animate-pulse">
                  {" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            {/* <div className="absolute w-20 bg-gray-300 rounded-lg sm:h-12 right-3 bottom-3 animate-pulse"></div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
