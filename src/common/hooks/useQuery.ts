import axios from 'axios';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useQuery = <T>() => {
  const navigate = useNavigate();
  const errorToastMessage = (error: any) => toast.error(error);
  const { clearAuthUserData } =
    useContext<AuthUserContextType>(AuthUserContext);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const executeQuery = (url: string, options: any) => {
    setLoading(true);
    axios
      .get(url, options)
      .then((response) => {
        console.log(response);

        setData(response.data);
      })
      .catch((error) => {
        console.log(error);

        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response?.statusText);
            errorToastMessage(error.response?.statusText);
            if (error.response?.statusText === 'Unauthorized') {
              clearAuthUserData();
              navigate('/');
            }
          } else {
            setError('Server is offline or Connection Refused');
          }
        } else {
          setError('Network Error');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, data, setData, error, setError, executeQuery };
};

export default useQuery;
