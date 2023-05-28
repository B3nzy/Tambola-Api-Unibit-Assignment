function ValidateUser(userData) {
  const password = userData.password;
  const email = userData.email;

  const regexPassword =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;
  if (!regexPassword.test(password)) {
    return {
      Error: "Password validation failed!",
    };
  } else if (!regexEmail.test(email)) {
    return {
      Error: "No such email address exists!",
    };
  } else {
    return {
      Error: null,
    };
  }
}

module.exports = ValidateUser;
