import { useGetRecentPosts } from "@/react-query/queriesAndMutations";
import Loader from "../../../@/components/shared/Loader";
import { Models } from "appwrite";
import PageHeader from "../../../@/components/shared/PageHeader";
import { Link } from "react-router-dom";
import { multiFormatDateString } from "../../../@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "../../../@/components/shared/PostStats";

const Home = () => {
  const { data: recentPosts, isPending: isLoading } = useGetRecentPosts();
  const { user } = useUserContext();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <PageHeader title="Home" />
          {isLoading && !recentPosts ? (
            <Loader />
          ) : (
            <ul className="flex-center flex-col flex-1 gap-9 w-full">
              {recentPosts?.documents.map((post: Models.Document) => (
                <div key={post.$id} className="post-card w-80">
                  <div className="flex-between">
                    <div className="flex items-center gap-3">
                      <Link to={`/profile/${post?.creator.$id}`}>
                        <img
                          src={
                            post.creator.imageUrl ||
                            `/assets/icons/profile-placeholder.svg`
                          }
                          alt="profile photo"
                          className="rounded-full w-12 lg:h-14 lg:w-14"
                        />
                      </Link>

                      <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">
                          {post.creator.name}
                        </p>
                        <div className="flex-center gap-2 text-light-3">
                          <p className="subtle-semibold lg:small-regular">
                            {multiFormatDateString(post.$createdAt)}
                          </p>
                          -
                          <p className="subtle-semibold lg:small-regular">
                            {post.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/edit-post/${post.$id}`}
                      className={`${user.id !== post.creator.$id && "hidden"}`}
                    >
                      <img
                        src="/assets/icons/edit.svg"
                        alt="edit post"
                        width={14}
                        height={14}
                      />
                    </Link>
                  </div>

                  <Link to={`/posts/${post.$id}`}>
                    <div className="py-5 small-medium lg:base-medium">
                      <p>{post.caption}</p>
                      <ul>
                        {post.tags.map((tag: string) => (
                          <li key={tag} className="text-light-3">
                            #{tag}
                          </li>
                        ))}
                      </ul>
                      <div className="flex-center pt-3">
                        <img
                          src={
                            post.imageUrl ||
                            `/asset/icons/profile-placeholder.svg`
                          }
                          alt="creator"
                          className="w-full h-72 object-contain"
                        />
                      </div>
                    </div>
                  </Link>
                  <PostStats post={post} userId={user.id} />
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
