export const validateUsername = (username) => {
    return username.length >= 6 && username.length <= 12;
  };

export const validateEmptyUsername = (username) =>{
    return username.length == 0;
}
  
  export const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 15;
  };
  
  export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };