import React, { useEffect, useState } from "react";
import useDebouncedCallback from "../useDebouncedCallback/useDebouncedCallback";

export default function useResizeObserver(
  ref: React.RefObject<Element>,
  delay?: number,
  arr?: any[],
): DOMRectReadOnly | null {
  const changes = arr || [];
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

  const handleResize = useDebouncedCallback((entries) => {
    entries.forEach((entry: any) => {
      setDimensions(entry.contentRect);
    });
  }, delay || 500);

  useEffect(() => {
    if (!ref?.current) return;

    const observeTarget = ref.current;

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref, ...changes]);

  return dimensions;
}
