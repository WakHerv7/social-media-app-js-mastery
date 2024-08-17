import { multiFormatDateString } from "../../../@/lib/utils";
import Loader from "../../../@/components/shared/Loader";
import { useGetPostsByIdMutation, useDeletePostMutation } from "@/react-query/queriesAndMutations";
import { Link, useParams } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../../../@/components/ui/button";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending: isGettingPost } = useGetPostsByIdMutation(id || '');
  const { mutateAsync: deletePost } = useDeletePostMutation();
  const { user } = useUserContext();

  return (
    <div className="post_details-container">
      {isGettingPost ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post image"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img
                  src={post?.creator.imageUrl || `/assets/icons/profile-placeholder.svg`}
                  alt="profile photo"
                  className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
                />
              
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">{post?.creator.name}</p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">{multiFormatDateString(post?.$createdAt)}</p>
                    -
                    <p className="subtle-semibold lg:small-regular">{post?.location}</p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-4">
                <Link to={`/edit-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && `hidden`}`}>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit post"
                    width={14}
                    height={14}
                  />
                </Link>
                <Button
                  variant="ghost"
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && `hidden`}`}
                  onClick={() => deletePost({
                    postId: post?.$id || "",
                    imageId: post?.imageId
                  })}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete post"
                    width={14}
                    height={14}
                   />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full">
              <div className="small-medium lg:base-medium">
                <p>{post?.caption}</p>
                <ul>
                  {post?.tags.map((tag: string) => (
                    <li key={tag} className="text-light-3">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails
