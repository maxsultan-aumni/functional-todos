// Impure
const autoIncrementedId = () => {
  let currentId = 0;

  return () => {
    currentId++;
    return currentId;
  };
};

// Impure
export const generateUniqueId = autoIncrementedId();
