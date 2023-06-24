"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { GoChevronLeft } from "react-icons/go";
export default function GoBackBtn({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => router.back()}
        dir="ltr"
        bg={"ghost"}
        startIcon={<GoChevronLeft />}
      >
        {children}
      </Button>
    </>
  );
}
