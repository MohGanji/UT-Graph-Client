import { store } from '../../../Store/';

export default async function refreshToken () {
  let refreshTokenVar = localStorage.getItem('Var');
  fetch('/api/v1/auth/refreshToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refreshTokenVar })
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
    });
}
