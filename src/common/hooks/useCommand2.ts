import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

const useCommand2 = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [headers, setHeaders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);

  const executeCommand = (
    url: string,
    body?: any,
    options?: AxiosRequestConfig<object | null> | undefined
  ) => {
    setLoading(true);
    axios
      .post(url, body, options)
      .then((response) => {
        setStatus(response.status);
        setData(response.data);
      })
      .catch((exception) => {
        setMessage(exception.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    setData,
    message,
    status,
    setStatus,
    setMessage,
    headers,
    loading,
    error,
    setError,
    executeCommand,
  };
};

export default useCommand2;
