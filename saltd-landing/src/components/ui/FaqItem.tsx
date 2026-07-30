'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** A single expandable question/answer row. Shared by the home FAQ and /faq page. */
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-saltd-black/10 py-5">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center text-left font-body font-semibold text-lg text-saltd-black"
      >
        {q}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-saltd-lime text-2xl leading-none flex-shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-body text-base text-saltd-black/60 mt-3 pb-2">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
