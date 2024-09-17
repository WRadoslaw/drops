import { useEffect, useRef } from "react";

type CallbackFn = () => void | (() => void);

export const useMountEffect = (callback: CallbackFn, check?: () => boolean) => {
  const wasTriggered = useRef(false);

  useEffect(() => {
    const checkResult = check ? check() : true;
    if (!wasTriggered.current && checkResult) {
      callback();
      wasTriggered.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasTriggered, check?.()]);
};
