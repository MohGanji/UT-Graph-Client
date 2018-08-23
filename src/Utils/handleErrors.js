import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function handleErrors(response) {
  toast("handleErrors called!");
  if (response.hasOwnProperty('errors')) {
    response.errors.forEach(err => {
      toast(err.msg);
    })
  }
  return response;
}