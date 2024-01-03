import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from '../../../@/components/ui/button';
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccountMutation } from "@/react-query/queriesAndMutations";

export default function Topbar() {
  const {user} = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signOutUser, isSuccess } = useSignOutAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate])

  return (
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
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOutUser()}>
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
            />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || `/assets/icons/profile-placeholder.svg`}
              alt="user avatar"
              className="w-8 h-8 rounded-se-full"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}