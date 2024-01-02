import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoimg from "./../assets/logo-angel-journey.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Dropdown } from "./ui/dropdown";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const logoutUser = () => {
    Cookies.remove("access");
    navigate("/login");
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-primary-50 fixed top-0 left-0 w-full z-10 shadow-md">
      <nav
        className="mx-auto flex items-center justify-between gap-x-6 px-4 md:px-10 lg:px-16 py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-10 md:h-12 w-auto" src={logoimg} alt="" />
          </Link>
        </div>
        {Cookies.get("access") ? (
          <>
            <Dropdown
              trigger={
                <button className="w-10 h-10 rounded-full bg-slate-200"></button>
              }
              options={[
                <Link
                  to="/dashboard"
                  className="block p-2 hover:bg-primary-50 w-full text-left"
                >
                  Dashboard
                </Link>,
                <Link
                  to="/account-dashboard"
                  className="block p-2 hover:bg-primary-50 w-full text-left"
                >
                  My Account
                </Link>,
                <button
                  onClick={logoutUser}
                  className="block p-2 hover:bg-primary-50 w-full text-left"
                >
                  Logout
                </button>,
              ]}
            />
          </>
        ) : (
          <>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex flex-1 items-center justify-end gap-x-6">
              <Link
                to="/login"
                className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className=" bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex justify-between items-center gap-x-6">
            <Link to="/" className="-m-1.5 p-1.5">
              <img className="h-10 md:h-12 w-auto" src={logoimg} alt="" />
            </Link>
            <Link
              to="/signup"
              className=" bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
