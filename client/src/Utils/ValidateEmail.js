const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValid = regexEmail.test(email);
  return isValid;
};
export default validateEmail;
