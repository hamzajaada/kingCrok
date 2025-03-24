import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon,
  HomeIcon,
  UsersIcon,
  DocumentCurrencyEuroIcon,
  QueueListIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import logo from "../asset/images/logo.png";
import clsx from "clsx";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: HomeIcon },
  { name: "Marques", href: "/dashboard/brands", icon: QueueListIcon },
  {
    name: "Commandes",
    href: "/dashboard/orders",
    icon: DocumentCurrencyEuroIcon,
  },
  {
    name: "Produits",
    href: "/dashboard/products",
    icon: BuildingStorefrontIcon,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  return (
    <Transition.Root show={sidebarOpen} as="div">
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as="div"
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-gray-900/80"
        />
        <div className="fixed inset-0 flex">
          <Transition.Child
            as="div"
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative mr-16 flex w-full max-w-xs flex-1"
          >
            <Dialog.Panel className="relative flex flex-col bg-gray-900 px-6 pb-2 w-full max-w-xs">
              <button
                className="absolute left-full top-0 m-4 p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
              <LogoSection />
              <NavItems location={location} />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const LogoSection = () => (
  <div className="flex justify-center h-24 my-8 bg-white rounded-md items-center ">
    <img src={logo} alt="Logo" className="w-16 lg:w-20 h-16 lg:h-20" />
  </div>
);

const NavItems = ({ location }) => (
  <nav className="flex flex-1 flex-col mt-5">
    <ul className="flex flex-1 flex-col gap-y-4">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className={clsx(
              "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold",
              location.pathname === item.href
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon className="h-6 w-6" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const ProfileSection = () => (
  <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gray-900 px-6">
    <LogoSection />
    <NavItems location={useLocation()} />
    <div className="-mx-6 mt-auto"></div>
  </div>
);

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ProfileSection />
      <div className="sticky top-0 z-40 flex items-center bg-gray-800 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          className="-m-2.5 p-1.5 text-gray-400 bg-gray-100 rounded-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6 " />
        </button>
        <div className="flex-1 text-sm font-semibold text-white ml-6">
          Dashboard
        </div>
      </div>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
