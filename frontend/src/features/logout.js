// authentication.js

export const LOGOUT = 'authentication/LOGOUT';

export const logout = () => {
  return {
    type: LOGOUT
  };
};
