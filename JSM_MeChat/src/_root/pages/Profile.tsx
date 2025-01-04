import { useUserContext } from "@/context/AuthContext";
import { useGetUserByID } from "@/react-query/queriesAndMutations";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams<{ id: string }>();
  const navigate = useNavigate();

  const signedInUser = useUserContext();

  if (!signedInUser.checkAuthUser()) navigate("/sign-in");

  // do nothing if there is no userId to fetch
  if (!param.id) return;

  const userProfileDetails = useGetUserByID(param.id);

  return <section className="common-container"></section>;
};

export default Profile;
