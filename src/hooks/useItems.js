import { useState, useEffect } from "react";

const useItems = ({ localStorageKey }) => {
  const [items, setItems] = useState(() => {
    const persistedItems = window.localStorage.getItem(localStorageKey);
    if (persistedItems) return JSON.parse(persistedItems);
    return [];
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [localStorageKey, items]);

  return [items, setItems];
};

export default useItems;
