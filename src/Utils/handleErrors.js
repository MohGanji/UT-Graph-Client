import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function handleErrors(response) {
  toast("handleErrors called!");
  var a = response;
  console.log(a);
  console.log("qweqrr");
  if (a.hasOwnProperty('errors')) {
    // for (let i = 0; i < a.errors.length; i++) {
    //   toast(a.errors[i].location + "." + a.errors[i].param + " : " + a.errors[i].msg);
    //   console.log(a.errors.length);
    // }
    alert("salam");
  }

  return response;
}