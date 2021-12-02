export const increment = (value) => {
  return {
    type: 'INCREMENT',
    payload: value,
  };
};

export const minus = () => {
  return {
    type: 'DECREASE',
  };
};
export const loggedIn = () => {
  return {
    type: 'SIGN_IN',
  };
};
