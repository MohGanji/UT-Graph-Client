import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function handleErrors(response) {
<<<<<<< HEAD
  // toast("handleErrors called!");
  // var a = response;
  // console.log(a);
  // console.log("qweqrr");
  // if (a.hasOwnProperty('errors')) {
  //   // for (let i = 0; i < a.errors.length; i++) {
  //   //   toast(a.errors[i].location + "." + a.errors[i].param + " : " + a.errors[i].msg);
  //   //   console.log(a.errors.length);
  //   // }
  //   alert("salam");
  // }

=======
  toast("تابع هندل ارور صدا شد");
  if (response.hasOwnProperty('errors')) {
    response.errors.forEach(err => {
      toast(err.msg);
    })
  }
>>>>>>> d90e926cd7a2ff138cf8d17337be5f6719dc27a7
  return response;
}