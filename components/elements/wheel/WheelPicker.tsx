"use client";

import { useState, useRef, useEffect } from "react";

interface WheelPickerProps {
  list: number[];
  State: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ list, State, setState }) => {
  const ComponentRef = useRef<HTMLDivElement>(null);
  const [centeredNumber, setCenteredNumber] = useState(list.indexOf(State));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isDown, setIsDown] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartY(e.clientY - (ComponentRef.current?.offsetTop || 0));
    setScrollTop(ComponentRef.current?.scrollTop || 0);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.clientY - (ComponentRef.current?.offsetTop || 0);
    const walk = (y - startY) * 3; // scroll-fast factor
    if (ComponentRef.current) {
      ComponentRef.current.scrollTop = scrollTop - walk;
    }
  };



  useEffect(() => {
    const Component = ComponentRef.current;

    // detect when user scrolls
    const onScroll = () => {
      if (Component) {
        const { scrollTop, clientHeight } = Component;

        const scrollPosition = scrollTop + clientHeight;
        const centeredNumber = Math.round(scrollPosition / 33) - 5;

        setCenteredNumber(centeredNumber);

        setState(list[centeredNumber]);
      }
    };

    Component?.addEventListener("scroll", onScroll);

    return () => {
      Component?.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, list.length);
    const centeredItemRef = itemRefs.current[centeredNumber];
    if (centeredItemRef) {
      centeredItemRef.scrollIntoView({
        block: "center",
      });
    }
  }, [State, centeredNumber]);

  return (
    <div
      ref={ComponentRef}
      className="flex cursor-grab active:cursor-grabbing noscrollwheel pt-20 pb-20 flex-col overflow-y-scroll text-center snap-mandatory snap-y relative"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {list.map((item, index) => (
        <div
          style={{
            minHeight: 33,
          }}
          key={item}
          className={`snap-center pt-1 w-[5em] relative z-10 transition-all scale-100 select-none
              
            ${
              index === centeredNumber
                ? "font-bold text-black scale-105"
                : "text-zinc-500 scale-95"
            }
              
              `}
          ref={(el) => (itemRefs.current[index] = el)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default WheelPicker;
