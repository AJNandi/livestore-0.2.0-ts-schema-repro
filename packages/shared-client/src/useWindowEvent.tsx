/* eslint-disable */
import { useEffect, useRef } from "react";

// https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/hooks/use-window-event.ts
export function useWindowEvent<TType extends keyof WindowEventMap>(
  type: TType,
  listener: (this: Window, ev: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  let listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    function handler(event: WindowEventMap[TType]) {
      listenerRef.current.call(window, event);
    }

    window.addEventListener(type, handler, options);
    return () => window.removeEventListener(type, handler, options);
  }, [type, options]);
}
