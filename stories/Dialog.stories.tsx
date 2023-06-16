import Dialog from "@components/elements/dialog/Dialog";
import { useState } from "react";
export default {
  title: "Dialog",
  component: Dialog,
};

export const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus esse
        magni ullam ipsum tempora at, expedita cupiditate culpa veritatis autem
        distinctio quam maiores neque dolorum, inventore, rem quia omnis
        ratione. Sunt culpa consectetur, possimus accusamus nesciunt sint, eum
        quae cumque voluptate harum velit explicabo dolore exercitationem
        delectus repellat sit inventore, nostrum ut. Vero quam aperiam saepe
        culpa velit odio deserunt dolorem voluptate recusandae. Eum, ab maiores.
        Sequi culpa similique repellendus officiis labore! Enim iure quos harum
        quod vel sunt id accusamus fugiat accusantium optio? Quas, quam. Fuga,
        quasi repellat aspernatur, maxime hic placeat cupiditate quo distinctio
        laborum vel ex? Quidem?
      </button>
      <Dialog open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-2">
          <button onClick={() => setOpen(false)}>C lose</button>
          <button onClick={() => setOpen(false)}>C lose</button>
        </div>
      </Dialog>
    </div>
  );
};
