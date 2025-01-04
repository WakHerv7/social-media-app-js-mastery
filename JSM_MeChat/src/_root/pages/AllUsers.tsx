import PageHeader from "../../../@/components/shared/PageHeader";
import { useUserContext } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsers } from "@/react-query/queriesAndMutations";
import Loader from "../../../@/components/shared/Loader";
import { Models } from "appwrite";
import { Button } from "../../../@/components/ui/button";

const AllUsers = () => {
  const navigate = useNavigate();
  const appContext = useUserContext();

  if (!appContext?.checkAuthUser()) navigate("/sign-in");

  const allUsersInformation = useGetAllUsers();

  if (allUsersInformation?.isPending) return <Loader />;

  return (
    <div className="common-container">
      <PageHeader title="All Users" />

      <div className="bg-dark-3 rounded-lg flex-between w-full px-4 py-3">
        <span className="small-regular">No pending follow requests.</span>
        <p className="subtle-semibold text-primary-500">Manage</p>
      </div>
      <div className="w-full px-6">
        <span className="tiny-medium">People you might know.</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {allUsersInformation?.data?.documents?.map(
          (user: Models.Document) =>
            user?.$id !== appContext.user?.id && (
              <Link
                key={user.$id}
                to={`/profile/${user.$id}`}
                className="flex flex-col items-center justify-center rounded-md border border-primary-500 w-44"
              >
                <div className="w-full h-20 bg-dark-4 relative">
                  <div className="absolute top-8 left-10">
                    <img
                      src={user?.imageUrl}
                      alt="user avatar"
                      className="h-24 w-24 rounded-full"
                    />
                  </div>
                </div>
                <div className="px-3 pt-20 pb-6 flex-start flex-col">
                  <h1 className="base-semibold text-primary-500">
                    {user.name}
                  </h1>
                  <p className="tiny-medium text-gray-400">{user?.bio}</p>

                  <div className="w-full mt-6">
                    <Button
                      type="button"
                      className="border border-primary-500 rounded-md"
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default AllUsers;
