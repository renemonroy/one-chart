import { useCallback, useRef } from "react";

const useDebouncedCallback = (
  callback: (...args: any[]) => any,
  delay = 500,
) => {
  const timeout = useRef<any>(null);

  return useCallback(
    (...args) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => callback(...args), delay);
    },
    [callback],
  );
};

export default useDebouncedCallback;
