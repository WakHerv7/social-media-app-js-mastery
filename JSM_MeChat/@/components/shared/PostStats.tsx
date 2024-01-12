import React, { useEffect, useState } from "react";
import {
  useDeleteSavePostMutation,
  useGetCurrentUser,
  useLikePostMutation,
  useSavePostMutation
} from "@/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { checkIsLiked } from "../../../@/lib/utils";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likePostArray = post.likes.map((user: Models.Document) => user.$id);
  
  const { mutate: likePost, isPending: isLikingPost } = useLikePostMutation();
  const { mutate: savePost, isPending: isSavingPost } = useSavePostMutation();
  const { mutate: deletePost } = useDeleteSavePostMutation();
  
  const { data: currentUser } = useGetCurrentUser();
  
  const [isLike, setIsLike] = useState(likePostArray);
  const [isSave, setIsSave] = useState(false);
  
  const hasSaved = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);

  useEffect(() => {
    setIsSave(!!hasSaved);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikeArray: string[] = [...isLike || []];

    const hasLiked = newLikeArray.includes(userId);

    if (hasLiked) {
      newLikeArray = newLikeArray.filter((id) => id !== userId);
    } else {
      newLikeArray.push(userId);
    }

    setIsLike(newLikeArray);
    likePost({ postId: post.$id, likesArray: newLikeArray})
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (hasSaved) {
      setIsSave(false);
      deletePost(hasSaved.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSave(true);
    }
  };

  return (
    <div className="flex-between mt-3">
      <div className="flex gap-2">
        {isLikingPost ? <Loader /> : <img
          src={`${checkIsLiked(likePostArray, userId) ? `/assets/icons/liked.svg` : `/assets/icons/like.svg`}`}
          alt="like"
          width={16}
          height={16}
          onClick={handleLikePost}
        />}
        <p className="small-medium lg:base-regular cursor-pointer">{isLike.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost ? <Loader /> : <img
          src={isSave ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="like"
          width={16}
          height={16}
          onClick={handleSavePost}
          className="cursor-pointer"
        />}
      </div>
    </div>
  )
}

export default PostStats;