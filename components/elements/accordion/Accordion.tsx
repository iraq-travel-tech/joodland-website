"use client";
import * as RxAccordion from "@radix-ui/react-accordion";
import { BsChevronDown } from "react-icons/bs";

type QuestionProps = {
  question: string;
  answer: string;
}[];

type AccordionProps = {
  questions: QuestionProps;
};

export default function Accordion({ questions }: AccordionProps) {
  return (
    <RxAccordion.Root
      className="mt-8 shadow-lg rounded-lg"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {questions.map(({ question, answer }, index) => (
        <RxAccordion.Item
          value={`${index}`}
          key={index}
          className="border-b last:border-0"
        >
          <RxAccordion.Header>
            <RxAccordion.Trigger className="w-full group flex justify-between items-center p-4 hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-left">{question}</span>
              <BsChevronDown className="transform group-focus:rotate-180 transition-transform" />
            </RxAccordion.Trigger>
          </RxAccordion.Header>
          <RxAccordion.Content
            className="transition-all duration-500 overflow-hidden ease-in-out data-[state=open]:max-h-max max-h-0"
            forceMount
          >
            <div id={`content-${index}`} className="p-4 ">
              {answer}
            </div>
          </RxAccordion.Content>
        </RxAccordion.Item>
      ))}
    </RxAccordion.Root>
  );
}
