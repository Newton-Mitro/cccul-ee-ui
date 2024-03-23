import logo from 'assets/brand/my_logo.png';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-auto border-t bg-surface text-center text-onSurface">
      <div className=" flex flex-col items-center justify-center p-3 py-10">
        <NavLink
          to="#"
          className="mb-4 flex flex-col items-center justify-center"
        >
          <img className="h-16" src={logo} alt="header logo" />
          {/* <h6 className="block text-2xl font-semibold">Dhaka Credit</h6> */}
          <p className="text-xl">{process.env.REACT_APP_COMPANY_NAME}</p>
          <p className="text-sm">{process.env.REACT_APP_COMPANY_ADDRESS}</p>
          <p className="text-sm">
            © {new Date().getFullYear()} Dhaka Credit. All Rights Reserved.
          </p>
        </NavLink>

        <p className="text-sm font-bold">Powered by</p>
        <div className=""></div>
        <p>
          Developed by <strong>DC Quantum Labs</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
