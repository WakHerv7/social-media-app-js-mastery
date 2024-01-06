import { useEffect } from "react";

import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from '../../@/components/ui/button';
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccountMutation } from "@/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { sidebarLinks, bottombarLinks } from "@/constants";


function RootLayout() {
  const { pathname } = useLocation();
  const {user} = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signOutUser, isSuccess } = useSignOutAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate])

  return (
    <div className="md:flex">
      {/** Topbar Section */}
      <section className="topbar">
        <div className="flex-between py-4 px-5">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              width={130}
              height={325}
            />
          </Link>

          <div className="flex gap-4">
            <Button className="shad-button_ghost" onClick={() => signOutUser()}>
              <img
                src="/assets/icons/logout.svg"
                alt="logout"
              />
            </Button>
            <Link to={`/profile/${user.id}`}>
              <img
                src={user.imageUrl || `/assets/icons/profile-placeholder.svg`}
                alt="user avatar"
                className="w-8 h-8 rounded-full"
              />
            </Link>
          </div>
        </div>
      </section>

      {/** LeftSidebar Section only visible on medim devices */}
      <nav className="leftsidebar">
        <div className="flex flex-col min-h-full gap-9">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              width={130}
              height={325}
            />
          </Link>
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || `/assets/icons/profile-placeholder.svg`}
              alt="logo"
              width={56}
              height={56}
              className="rounded-full"
              />
            <div className="flex flex-col">
              <p className="body-bold">
                {user.name}
              </p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>

          <ul className="flex flex-col gap-6">
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;
              
              return (
                <li key={link.label} className={`leftsidebar-link group ${isActive && `bg-primary-500`}`}>
                  <NavLink to={link.route} className="flex gap-4 items-center p-4">
                    <img
                      src={link.imgURL}
                      alt="link image"
                      className={`group-hover:invert-white ${isActive && `invert-white`}`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <Button className="shad-button_ghost" onClick={() => signOutUser()}>
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
          />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>

      <section>
        <Outlet />
      </section>

      {/** Bottombar only visible on mobile devices */}
      <section className="bottom-bar">
        {bottombarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`${isActive && `bg-primary-500 rounded-[10px]`} flex-center flex-col gap-1 p-2 transition`}
            >
              <img
                src={link.imgURL}
                alt="link image"
                width={10}
                height={10}
                className={`${isActive && `invert-white`}`}
              />
              <p className="tiny-medium text-light-2">
                {link.label}
              </p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}

export default RootLayout;