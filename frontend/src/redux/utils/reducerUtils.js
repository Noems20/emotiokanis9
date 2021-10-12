export const addItem = (itemToAdd, itemsData) => {
  itemsData.push(itemToAdd);
  return itemsData;
};

export const updateItem = (itemToUpdate, itemsData) => {
  const updatedItemsData = itemsData.map((item) => {
    if (item._id === itemToUpdate._id) {
      return itemToUpdate;
    }
    return item;
  });

  return updatedItemsData;
};

export const deleteItem = (itemToDelete, itemsData) => {
  return itemsData.filter((item) => item._id !== itemToDelete);
};
