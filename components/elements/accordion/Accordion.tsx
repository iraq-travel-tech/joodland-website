"use client";
import React, { ForwardedRef, ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa";

interface QuestionItem {
  question: string;
  answer: string;
}

interface AccordionDemoProps {
  questions: QuestionItem[];
}

const AccordionDemo: React.FC<AccordionDemoProps> = ({ questions }) => {
  return (
    <Accordion.Root
      className="bg-mauve6 w-full rounded-md shadow-[0_2px_10px] shadow-black/5 "
      type="single"
      collapsible
    >
      {questions.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
};

interface AccordionItemProps {
  children: ReactNode;
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Item
      className="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]"
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

interface AccordionTriggerProps {
  children: ReactNode;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className="text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none"
      {...props}
      ref={forwardedRef}
    >
      {children}
      <FaChevronDown
        className="text-violet10 ease-[cubic-bezier(0.87,0,0.13,1)] transition-transform duration-300"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

interface AccordionContentProps {
  children: ReactNode;
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Content
    className="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));

export default AccordionDemo;
