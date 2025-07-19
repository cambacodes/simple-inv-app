import { useEffect, useRef, useState } from "react";

export function useDebounced<T>(value: T, delay = 300, immediate = false): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(
    immediate ? value : (() => value)()
  );
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (immediate && isFirstRun.current) {
      setDebouncedValue(value);
      isFirstRun.current = false;
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, immediate]);

  return debouncedValue;
}
