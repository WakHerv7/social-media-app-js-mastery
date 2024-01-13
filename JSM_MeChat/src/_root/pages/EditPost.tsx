import PostForm from "@/components/Forms/PostForm";
import Loader from "../../../@/components/shared/Loader";
import { useGetPostsByIdMutation } from "@/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const { data: post } = useGetPostsByIdMutation(id || "");

  if (!post) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add photos"
          />
          <h3 className="h3-bold md:h2-bold text-left w-full">
            Edit Post
          </h3>
        </div>
        <PostForm post={post} action="Update" />
      </div>
    </div>
  )
}

export default EditPost;