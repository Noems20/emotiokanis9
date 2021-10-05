export const addService = (serviceToAdd, servicesData) => {
  servicesData.push(serviceToAdd);
  return servicesData;
};

export const updateService = (serviceToUpdate, servicesData) => {
  const updatedServicesData = servicesData.map((service) => {
    if (service._id === serviceToUpdate._id) {
      return serviceToUpdate;
    }
    return service;
  });

  return updatedServicesData;
};

export const deleteService = (serviceToDelete, servicesData) => {
  return servicesData.filter((service) => service._id !== serviceToDelete);
};
