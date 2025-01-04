import { useUserContext } from "@/context/AuthContext";
import { useGetAllUsers } from "@/react-query/queriesAndMutations";
import { Button } from "../ui/button";

const RightSidebar = () => {
  const { user } = useUserContext();
  const { data: allUsers } = useGetAllUsers();

  return (
    <aside className="px-6 py-10 max-w-[270px]">
      <h2 className="text-bold font-smibold text-left">Top Creators</h2>
      <div className="mt-6 flex flex-wrap gap-3 justify-start">
        {allUsers?.documents.map(
          (userData) =>
            userData.$id !== user.id && (
              <div
                key={userData.id}
                className="bg-dark-2 p-3 rounded-xl flex flex-col items-center"
              >
                <img
                  src={
                    userData.imageUrl || `/assets/icons/profile-placeholder.svg`
                  }
                  alt="user avatar"
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-sm">{userData.name}</p>
                <p className="text-xs text-light-3">@{userData.username}</p>
                <Button className="bg-primary-500 text-white text-[10px] px-4 h-7 rounded-md mt-2">
                  Follow
                </Button>
              </div>
            )
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
