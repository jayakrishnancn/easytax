export const getLocalData = (key: string, _default = {}) => {
  let initialData = _default;
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  } catch {}
  return initialData;
};

export const setLocalData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
