import axios from 'axios';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useUpdateCommand = <T>() => {
  const navigate = useNavigate();
  const errorToastMessage = (error: any) => toast.error(error);
  const { clearAuthUserData } =
    useContext<AuthUserContextType>(AuthUserContext);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const executeUpdateCommand = (url: string, body: any, options: any) => {
    setLoading(true);
    axios
      .put(url, body, options)
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);

        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data.errors) {
              setError(error.response.data.errors);
            } else {
              errorToastMessage(error.response?.statusText);
              if (error.response?.statusText === 'Unauthorized') {
                clearAuthUserData();
                navigate('/');
              }
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

  return {
    loading,
    data,
    setData,
    error,
    setError,
    executeUpdateCommand,
  };
};

export default useUpdateCommand;
