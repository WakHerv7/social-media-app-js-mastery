import { Models } from "appwrite";
import PostStats from "./PostStats";
import { formatDateString } from "../../../@/lib/utils";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="w-full flex-start">
      <div className="w-64 border border-slate-700 rounded-lg">
        <div className="w-full mb-2">
          <img
            src={post?.imageUrl}
            alt="post imagee"
            className="object-cover"
          />
        </div>

        <div className="px-5 pb-10 lg-px-7">
          <PostStats post={post} userId={post?.likes?.accountId} />
          <p className="text-ellipsis truncate small-medium text-slate-300">
            {post?.caption}
          </p>
          <div className="flex-start">
            <small className="text-slate-600">
              {formatDateString(post?.$createdAt)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
