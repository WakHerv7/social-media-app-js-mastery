import { useUserContext } from "@/context/AuthContext";
import { useGetUserByID } from "@/react-query/queriesAndMutations";
import { useNavigate, useParams } from "react-router-dom";
import { Edit3Icon } from "lucide-react";
import { formatDateString } from "../../../@/lib/utils";
import { Models } from "appwrite";
import PostCard from "../../../@/components/shared/PostCard";

const Profile = () => {
  const param = useParams<{ id: string }>();
  const navigate = useNavigate();

  const signedInUser = useUserContext();

  if (!signedInUser.checkAuthUser()) navigate("/sign-in");

  // do nothing if there is no userId to fetch
  if (!param.id) return;

  const userProfileDetails = useGetUserByID(param.id);

  return (
    <section className="profile-container">
      <div className="profile-header">
        <div className="w-24 h-24 rounded-full border border-primary-500">
          <img
            src={
              userProfileDetails.data?.imageUrl ||
              `/assets/icons/profile-placeholder.svg`
            }
            alt="profile photo"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="w-full flex-between">
            <span className="small-medium">
              @{userProfileDetails?.data?.username}
            </span>
            <Edit3Icon
              size={20}
              className="text-primary-500 hover:text-white transition-all cursor-pointer"
            />
          </div>
          <div className="w-full text-gray-300">
            {userProfileDetails?.data?.bio ? (
              <p className="small-medium font-thin p-3">
                {userProfileDetails?.data?.bio}
              </p>
            ) : (
              <p className="small-medium text-slate-700 font-thin italic p-3">
                Add your bio.
              </p>
            )}
            <p className="tiny-medium">
              Joined on{" "}
              {formatDateString(userProfileDetails?.data?.$createdAt!)}
            </p>
          </div>
          <div className="w-full flex-start mt-3 gap-1">
            <div className="bg-dark-4 px-4 py-2 flex-center tiny-medium rounded-md cursor-pointer">
              {userProfileDetails?.data?.posts.length} Posts
            </div>
            <div className="bg-dark-4 px-4 py-2 flex-center tiny-medium rounded-md cursor-pointer">
              {userProfileDetails?.data?.liked.length} Likes
            </div>
            <div
              className="bg-dark-4 px-4 py-2 flex-center tiny-medium rounded-md cursor-pointer"
              onClick={() => navigate("/saved")}
            >
              {userProfileDetails?.data?.save.length} Saves
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border border-slate-800 rounded-md" />
      <div className="profile-inner_container">
        {userProfileDetails?.data?.posts.map((post: Models.Document) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
