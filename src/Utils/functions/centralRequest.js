export default function centralRequest (url, data) {
  // alert(url);
  console.log(data);
  fetch(url, data).then(function (response) {
    return Promise.resolve(response);
  });
}
