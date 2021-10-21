export const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

export const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

export const validateLoginData = (email, password) => {
  let errors = {};

  if (isEmpty(email)) {
    errors.email = 'No puede estar vacío';
  } else if (!isEmail(email)) {
    errors.email = 'Debe ser un email valido';
  }

  if (isEmpty(password)) errors.password = 'No puede estar vacío';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateRegisterData = (
  name,
  email,
  password,
  confirmPassword
) => {
  let errors = {};

  if (isEmpty(email)) {
    errors.email = 'No debe estar vacio';
  } else if (!isEmail(email)) {
    errors.email = 'Debe ser un email valido';
  }

  if (isEmpty(name)) errors.name = 'No debe estar vacio';
  if (isEmpty(password)) errors.password = 'No debe estar vacio';
  if (password !== confirmPassword)
    errors.confirmPassword = 'Las contraseñas no coinciden';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateUpdateUserData = (name, password, confirmPassword) => {
  let errors = {};

  if (isEmpty(name)) errors.name = 'No debe estar vacio';

  if (isEmpty(password) && !isEmpty(confirmPassword))
    errors.password = 'No debe estar vacio';

  if (isEmpty(confirmPassword) && !isEmpty(password))
    errors.confirmPassword = 'Las contraseñas no coinciden';

  if (password !== confirmPassword)
    errors.confirmPassword = 'Las contraseñas no coinciden';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateMailData = (name, email, subject, message) => {
  let errors = {};

  if (isEmpty(name)) errors.name = 'No puede estar vacío';
  if (isEmpty(email)) {
    errors.email = 'No puede estar vacío';
  } else if (!isEmail(email)) {
    errors.email = 'Debe ser un email válido';
  }
  if (isEmpty(subject)) errors.subject = 'No puede estar vacío';
  if (isEmpty(message)) errors.message = 'No puede estar vacío';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
