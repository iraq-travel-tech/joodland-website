import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col gap-4 pt-6 pb-10">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_max-content] relative grid-rows-[max-content-1fr_max-content_max-content] custom-shadow rounded-lg p-4`}
        >
          <p className="col-span-2 h-6 w-[10em] bg-gray-300 animate-pulse rounded-lg"></p>
          <div className="flex sm:col-span-1 col-span-2 justify-between items-center">
            <div className="flex gap-4 mt-4">
              <div className="flex-col">
                <p className="h-8 w-36 bg-gray-300 animate-pulse rounded-lg"></p>
                <p className="h-6 w-16 bg-gray-300 animate-pulse rounded-lg mt-2"></p>
              </div>
              <div className="flex-col">
                <p className="h-8 w-36 bg-gray-300 animate-pulse rounded-lg"></p>
                <p className="h-6 w-16 bg-gray-300 animate-pulse rounded-lg mt-2">
                  {" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-5 items-center">
            {/* <div className="sm:h-12 absolute right-3 bottom-3 w-20 rounded-lg bg-gray-300 animate-pulse"></div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
