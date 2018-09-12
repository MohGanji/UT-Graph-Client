import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function handleErrors (response) {
  if (response.hasOwnProperty('errors')) {
    response.errors.forEach(err => {
      toast.error(err.msg);
    });
  }
  return response;
}
