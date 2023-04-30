import React from "react";
import Avatar from "../avatars/Avatar";
import Divide from "../dividers/Divide";

export default function PostCard() {
  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-white border ">
      <Avatar
        img="https://images.unsplash.com/photo-1682258687337-9d2ca99054cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        name="omar chatin"
        username="@omar-ctr"
      />

      <Divide mb="2" />

      <div className="text-3xl font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      </div>

      <div className="text-zinc-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
        maxime necessitatibus porro fuga nihil, possimus culpa odit. Libero iure
        nisi minima. Saepe inventore eius aliquam amet architecto. Consequuntur,
        nisi quidem?
      </div>
    </div>
  );
}
