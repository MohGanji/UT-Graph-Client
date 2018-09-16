export const auth = store => next => action => {
  // Please notice: this code is gonna become cleaner soon!
  if (action.type === 'AUTHENTICATE_THE_USER') {
    let accessToken = localStorage.getItem('accessToken');
    fetch('/api/v1/auth/validateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken: accessToken })
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('access token is invalid');
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        store.dispatch({ type: 'SET_USER', user: responseJson.data.user });
      })
      .catch(function () {
        let refreshToken = localStorage.getItem('refreshToken');
        fetch('/api/v1/auth/refreshToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refreshToken })
        })
          .then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('refresh token is invalid');
            }
          })
          .then(function (responseJson) {
            localStorage.setItem('accessToken', responseJson.data.accessToken);
            store.dispatch({
              type: 'SET_USER',
              user: responseJson.data.user
            });
          })
          .catch(function () {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
          });
      });
  }
  return next(action);
};
