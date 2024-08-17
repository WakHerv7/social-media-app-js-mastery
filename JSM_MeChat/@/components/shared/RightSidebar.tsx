import { useUserContext } from "@/context/AuthContext";
import { useGetAllUsers } from "@/react-query/queriesAndMutations";
import { Button } from "../ui/button";

const RightSidebar = () => {
  const { user } = useUserContext();
  const { data: allUsers } = useGetAllUsers();

  return (
    <div className="pt-10 px-10">
      <h2 className='text-bold font-thin text-left'>Top Creators</h2>
      <div className="flex flex-wrap gap-4 mt-6">
        {allUsers?.documents.map((userData) => (
          userData.$id !== user.id &&
          <div key={userData.id} className="flex flex-col w-[120px] gap-6 items-center  rounded-xl">
            <img
              src={userData.imageUrl || `/assets/icons/profile-placeholder.svg`}
              alt="user avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm">{userData.name}</p>
            <p className="text-xs text-light-3">@{userData.username}</p>
            <Button
              variant="ghost"
              className="shad-button_ghost bg-primary-500 text-white text-xs px-10 rounded-md"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightSidebar
