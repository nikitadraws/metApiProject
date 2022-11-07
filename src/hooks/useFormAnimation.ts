import { useEffect, useRef } from "react";
import { spring } from "react-flip-toolkit";

export const useFormAnimation = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const form = [formRef.current];
      form.forEach((el, i) => {
        spring({
          config: "wobbly",
          values: {
            translateY: [-15, 0],
            opacity: [0, 1],
          },
          onUpdate: ({ translateY, opacity }) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateY}px)`;
          },
          delay: i * 40,
        });
      });
    }
  }, []);

  return formRef;
};
