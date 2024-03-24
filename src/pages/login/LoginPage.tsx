import Loading from 'common/components/Loading';
import MyPasswordInput from 'common/components/MyPasswordInput';
import MyTextInput from 'common/components/MyTextInput';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import useCommand from 'common/hooks/useCommand';
import { useLocalStorage } from 'common/hooks/useStorage';
import CryptoJS from 'crypto-js';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLoginViewInputState } from './Validation/validateLoginViewInputState';
import useLoginInputState from './hooks/useLoginInputState';
import { LoginRequestModel } from './model/LoginRequestModel';
import { AuthUserModel } from './model/data/AuthUserModel';
import { IAuthUserModel } from './model/data/IAuthUserModel';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [lastRoute] = useLocalStorage('lastRoute', '/home');

  const { storeAuthUserData } =
    useContext<AuthUserContextType>(AuthUserContext);

  const { loginInputState, setLoginInputState, updateLoginInputState } =
    useLoginInputState();

  const {
    loading: userLoginResponseDataLoading,
    headers: userLoginResponseHeaders,
    data: userLoginResponseData,
    setData: setUserLoginResponseData,
    message: userLoginResponseMessage,
    status: userLoginResponseStatus,
    setStatus: setUserLoginResponseStatus,
    executeCommand: executePostCommand,
  } = useCommand<any>();

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasErrors = '';

    let fieldName: keyof typeof loginInputState;
    for (fieldName in loginInputState) {
      updateLoginInputState(fieldName, loginInputState[fieldName]);
      hasErrors =
        hasErrors +
        validateLoginViewInputState(fieldName, loginInputState[fieldName]);
    }
    if (hasErrors.length === 0) {
      const encryptPassword = CryptoJS.MD5(loginInputState.password);
      const loginRequestModel = new LoginRequestModel();
      loginRequestModel.UserName = loginInputState.UserName;
      loginRequestModel.Email = loginInputState.UserName;
      loginRequestModel.Password = encryptPassword.toString();
      loginRequestModel.RequestFrom = 'Web';
      executePostCommand(
        process.env.REACT_APP_BASE_URL + '/Auth_V2/UserLogin',

        JSON.stringify(loginRequestModel),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  };

  const passwordRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userLoginResponseData) {
      const authUserModel: IAuthUserModel = new AuthUserModel();
      authUserModel.UserId = userLoginResponseData[0]?.userid;
      authUserModel.UserName = userLoginResponseData[0]?.UserName;
      authUserModel.UserPicture = userLoginResponseData[0]?.UserPicture;
      authUserModel.Email = userLoginResponseData[0]?.loginemail;
      authUserModel.Address = userLoginResponseData[0]?.Address;
      authUserModel.RegMobile = userLoginResponseData[0]?.RegMobile;
      authUserModel.RoleId = userLoginResponseData[0]?.RoleId;
      authUserModel.RoleName = userLoginResponseData[0]?.RoleName;
      authUserModel.PersonId = userLoginResponseData[0]?.personid;
      authUserModel.EmployeeCode = userLoginResponseData[0]?.EmployeeCode;

      storeAuthUserData(authUserModel);
      localStorage.setItem('token', userLoginResponseHeaders?.token);
      navigate('auth/home');
      // window.location.reload();
    }

    return () => {
      setUserLoginResponseData(null);
    };
  }, [userLoginResponseData]);

  return (
    <div className="">
      <Loading isLoading={userLoginResponseDataLoading} />
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
                id="UserName"
                fullWidth={true}
                label="Email/Mobile Number"
                name="UserName"
                value={loginInputState.UserName}
                leftIcon={<i className="fa-solid fa-circle-user"></i>}
                autoFocus={true}
                error={loginInputState.errors?.UserName}
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
                error={loginInputState.errors?.password}
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
