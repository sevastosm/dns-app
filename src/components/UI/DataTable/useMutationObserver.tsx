import { useEffect, useMemo } from "react";
// import { isSSR, getRefElement } from './utils';

interface Props {
  target?: Element | Node | null | any;
  options?: MutationObserverInit;
  callback?: MutationCallback;
}

export const useMutationObserver = ({
  target,
  options = {},
  callback,
}: Props): any => {
  const observer = useMemo(
    () =>
      new MutationObserver((mutationRecord, mutationObserver) => {
        callback?.(mutationRecord, mutationObserver);
      }),
    [callback]
  );

  useEffect(() => {
    const element = target;

    if (observer && element) {
      observer.observe(element, options);
      return () => observer.disconnect();
    }
  }, [target, observer, options]);
};
