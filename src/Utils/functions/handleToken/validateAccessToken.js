import { store } from '../../../Store';

export default function validateAccessToken (accessToken) {
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
    });
}
