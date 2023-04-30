import PostCard from "@/components/ui/cards/PostCard";
import React from "react";

export default function HomePosts() {
  return (
    <div className="flex mt-10 flex-col gap-3">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
