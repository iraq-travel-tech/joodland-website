"use client"
import Button from "@components/elements/button/Button";
import { useRouter } from "next/navigation";
import { GoChevronLeft } from "react-icons/go";

export default function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl pt-6 mx-auto px-4 sm:px-6 lg:px-8 flex md:flex-row flex-col md:gap-7 gap-3">
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
