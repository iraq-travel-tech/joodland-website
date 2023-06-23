"use client";
import Button from "@components/elements/button/Button";
import { useRouter } from "next/navigation";
import { GoChevronLeft } from "react-icons/go";

export default function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col max-w-6xl gap-3 px-4 pt-6 mx-auto sm:px-6 lg:px-8 md:flex-row md:gap-7">
        <div className="w-full">
          <Button
            bg={"ghost"}
            onClick={() => router.back()}
            startIcon={<GoChevronLeft />}
          >
            Go Back
          </Button>
          {children}{" "}
        </div>
      </div>
    </div>
  );
}
