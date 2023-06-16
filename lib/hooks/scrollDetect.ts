import { useEffect, useState } from "react";

export function useIsScrollingDown() {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingDown(prevScrollPos < currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrollingDown;
}
