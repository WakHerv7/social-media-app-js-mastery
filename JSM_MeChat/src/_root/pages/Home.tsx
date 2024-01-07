import { useGetRecentPosts } from "@/react-query/queriesAndMutations";
import Loader from "../../../@/components/shared/Loader";
import { Models } from "appwrite";
import PostCard from '../../../@/components/shared/PostCard';
import { Link } from "react-router-dom";
import { formatDateString, multiFormatDateString } from "../../../@/lib/utils";

const Home = () => {
  const {data: recentPosts, isPending: isLoading, isError: errorLoading} = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Home Feed
          </h2>
          {isLoading && !recentPosts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {recentPosts?.documents.map((post: Models.Document) => (
                <div key={post.$id} className="post-card">
                  <div className="flex-between">
                    <div className="flex items-center gap-3">
                      <Link to={`/profile/$creator.$id`}>
                        <img
                          src={post.creator.imageUrl || `/assets/icons/profile-placeholder.svg`}
                          alt="profile photo"
                          className="rounded-full w-12 lg:h-14"
                        />
                      </Link>
                      
                      <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                        <div className="flex-center gap-2 text-light-3">
                          <p className="subtle-semibold lg:small-regular">{multiFormatDateString(post.$createdAt)}</p>
                          -
                          <p className="subtle-semibold lg:small-regular">{post.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;