export const debounce = (callback: Function, timeout = 500) => {
  let timer: NodeJS.Timeout | null;
  const self = this;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback.apply(self, args);
    }, timeout);
  };
};
