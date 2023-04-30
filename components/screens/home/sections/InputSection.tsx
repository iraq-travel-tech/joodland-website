import Avatar from "@/components/ui/avatars/Avatar";
import UiButton from "@/components/ui/buttons/UiButton";
import React from "react";

export default function InputSection() {
  return (
    <div className="rounded-xl bg-white border flex flex-col p-4 gap-3">
      {/* <div className="flex mb-3 gap-2 items-center">
        <div className="bg-gray-200 rounded-full w-10 h-10"></div>
        <div className="flex flex-col">
          <div className="font-bold capitalize">omar chatin</div>
          <div className="text-gray-500 text-xs">@omar-ctr</div>
        </div>
      </div> */}
      <Avatar
        img="https://images.unsplash.com/photo-1682258687337-9d2ca99054cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        name="omar chatin"
        username="@omar-ctr"
      />
      <input
        placeholder="write your title"
        type="text"
        className="bg-white border rounded py-2 px-3 shadow-md"
      />
      <input
        placeholder="write your description..."
        type="text"
        className="bg-white border rounded py-2 px-3 shadow-md"
      />

      <UiButton className="w-max">post</UiButton>
    </div>
  );
}
