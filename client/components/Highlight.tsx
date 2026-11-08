import { Fragment } from "react";

/** Renders server text with **red** and ==amber== highlight markers. No HTML is ever injected. */
export function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return (
            <strong key={i} className="font-bold text-flame">
              {part.slice(2, -2)}
            </strong>
          );
        if (part.startsWith("==") && part.endsWith("=="))
          return (
            <span key={i} className="text-amber">
              {part.slice(2, -2)}
            </span>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
