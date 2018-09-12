const initialState = {
  authenticated: false,
  user: {}
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATE_THE_USER':
      return {
        authenticated: true,
        user: state.user
      };
    case 'DEAUTHENTICATE_THE_USER':
      return {
        authenticated: false,
        user: state.user
      };
    case 'SET_USER':
      return {
        authenticated: true,
        user: action.user
      };
    default:
      return state;
  }
}
