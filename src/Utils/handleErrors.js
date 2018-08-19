import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function handleErrors(response) {
  console.log("1233");
  // toast("Wow so easy123 !");
  if (response.statusText != "OK")
    toast(response.statusText);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}