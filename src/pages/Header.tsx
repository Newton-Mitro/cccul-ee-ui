import MyButton from 'global_shared/components/MyButton';
import { useContext } from 'react';

import logo from 'assets/brand/my_logo.png';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

function Header() {
  const { authUser, clearAuthUserData } = useContext(
    AuthUserContext
  ) as AuthUserContextType;
  const navigate = useNavigate();

  return (
    <section
      className={`sticky top-0 z-20 w-full border-b bg-white py-5 transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between">
        <div>
          <img className="w-34 h-10" src={logo} alt="" />
        </div>
        <div className="flex items-center gap-6">
          {authUser?.RoleName.includes('HR') && (
            <ul className="flex gap-6">
              <li>
                <NavLink
                  to="/auth/home"
                  className={`active:font-bold active:ring-deep-orange-700`}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/auth/exams"
                  className={`active:font-bold active:ring-deep-orange-700`}
                >
                  Exams
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/question-sections"
                  className={`active:font-bold active:ring-deep-orange-700`}
                >
                  Question Sections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/questions"
                  className={`active:font-bold active:ring-deep-orange-700`}
                >
                  Questions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/result"
                  className={`active:font-bold active:ring-deep-orange-700`}
                >
                  Result
                </NavLink>
              </li>
            </ul>
          )}

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
