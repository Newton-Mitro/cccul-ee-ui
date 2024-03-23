import MyButton from 'global_shared/components/MyButton';
import { useContext } from 'react';

import logo from 'assets/brand/my_logo.png';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import { useNavigate } from 'react-router';

function Header() {
  const { authUser, clearAuthUserData } = useContext(
    AuthUserContext
  ) as AuthUserContextType;
  const navigate = useNavigate();
  return (
    <section
      className={`sticky top-0 z-20 w-full border-b bg-transparent py-5 transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between">
        <div>
          <img className="w-34 h-10" src={logo} alt="" />
        </div>
        <div>
          <MyButton
            disabled={false}
            type="button"
            label="Logout"
            styleClass="px-4 py-2 rounded bg-primary font-semibold text-onPrimary hover:bg-primaryVariant"
            name={''}
            onClick={() => {
              clearAuthUserData();
              navigate('/');
              localStorage.setItem('isLogin', '');
              document.title = 'icoopERP | Dhaka Credit';
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Header;
