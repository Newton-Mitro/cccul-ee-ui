import Loading from 'common/components/Loading';
import MyPasswordInput from 'common/components/MyPasswordInput';
import MyTextInput from 'common/components/MyTextInput';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import usePostCommand from 'common/hooks/usePostCommand';
import { useLocalStorage } from 'common/hooks/useStorage';
import { IAuthUserModel } from 'common/interfaces/IAuthUserModel';
import { AuthUserModel } from 'common/models/AuthUserModel';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialLoginInputState } from './constants/initialLoginInputState';
import useLoginInputState from './hooks/useLoginInputState';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [lastRoute] = useLocalStorage('lastRoute', '/home');

  const { storeAuthUserData } =
    useContext<AuthUserContextType>(AuthUserContext);

  const { loginInputState, setLoginInputState, updateLoginInputState } =
    useLoginInputState();

  const { data, loading, error, setError, executePostCommand } =
    usePostCommand<any>();

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    executePostCommand(
      process.env.REACT_APP_BASE_URL + '/api/auth/login',
      JSON.stringify(loginInputState),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  };

  const passwordRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setError(null);
    if (data?.data) {
      const authUserModel: IAuthUserModel = new AuthUserModel();
      authUserModel.user.id = data.data.user.id;
      authUserModel.user.name = data.data.user.name;
      authUserModel.user.email = data.data.user.email;
      authUserModel.user.role = data.data.user.role;
      authUserModel.user.photo = data.data.user.photo;
      authUserModel.access_token = data.data.access_token;
      setLoginInputState(initialLoginInputState);
      storeAuthUserData(authUserModel);
      navigate(lastRoute);
    }
  }, [
    data,
    lastRoute,
    loginInputState,
    navigate,
    storeAuthUserData,
    setLoginInputState,
    setError,
  ]);

  return (
    <div className="">
      <Loading isLoading={loading} />
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-4/12 space-y-6 text-onSurface dark:text-gray-200">
          <div className="flex w-full flex-col items-center justify-center">
            <img src={`https://cccul.com/logo.png`} alt="" className="w-36" />
            <h2 className="text-center text-3xl font-extrabold text-primary dark:text-gray-200">
              Employee Login
            </h2>
            <p className="text-center">Employee Evaluation Exam</p>
            <h3 className="text-center text-xs">
              Developed by DC Quantum Labs
            </h3>
          </div>
          <form
            className="flex flex-col justify-center gap-6"
            onSubmit={onSubmitHandler}
          >
            <div className="">
              <MyTextInput
                id="email"
                fullWidth={true}
                label="Email/Mobile Number"
                name="email"
                value={loginInputState.email}
                leftIcon={<i className="fa-solid fa-circle-user"></i>}
                autoFocus={true}
                error={error?.email}
                inputType="text"
                required={true}
                inputRef={emailRef}
                onChangeHandler={(event) => {
                  updateLoginInputState(event.target.name, event.target.value);
                }}
              />
            </div>
            <div className="relative w-full text-onSurface">
              <MyPasswordInput
                fullWidth={true}
                id="password"
                label="Password"
                name="password"
                value={loginInputState.password}
                required={true}
                ref={passwordRef}
                error={error?.password}
                leftIcon={<i className="fa-solid fa-key"></i>}
                onChangeHandler={(event) => {
                  updateLoginInputState(event.target.name, event.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="w-full rounded bg-primary px-6 py-3 font-bold uppercase text-onPrimary hover:bg-primaryVariant hover:shadow-md"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
