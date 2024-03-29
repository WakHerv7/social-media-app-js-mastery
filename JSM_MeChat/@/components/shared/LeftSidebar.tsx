import React, { useEffect } from "react";
import { sidebarLinks } from "../../../src/constants";
import { useUserContext } from "../../../src/context/AuthContext";
import { useSignOutAccountMutation } from "../../../src/react-query/queriesAndMutations";
import { INavLink } from "../../../src/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function LeftSidebar() {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { mutateAsync: signOutUser, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate])

  return (
    <>
    <div className="flex flex-col min-h-full gap-11">
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
    </>
  )
}