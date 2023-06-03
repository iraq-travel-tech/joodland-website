import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Dialog({
  children,
  open,
  setOpen,
  noBackground,
}: {
  children: any;
  open: boolean;
  setOpen: any;
  noBackground?: boolean;
}) {
  useEffect(() => {
    // Disable scroll on the body element when the dialog is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed flex items-center justify-center inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-lg"
              onClick={() => setOpen(false)}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`z-10 relative w-max ${
                !noBackground && "bg-white border"
              } p-3 rounded-lg shadow-lg`}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
