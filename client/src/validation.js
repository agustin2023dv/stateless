export const validateUsername = (username) => {
    return username.length >= 6 && username.length <= 12;
  };

  export const validateEmptyEmail = (email) => {
    return email.trim() === '' || email === '';
  };
  
  

export const validateEmailFormat = (email) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
};


export const validateEmptyUsername = (username) =>{
    return username.trim() === '';
}
  
  export const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 15;
  };
  
  export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };