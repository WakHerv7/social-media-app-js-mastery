import { useState } from "react";
import {
  useGetPostsMutation,
  useSearchPostsMutation,
} from "@/react-query/queriesAndMutations";
import { Input } from "../../../@/components/ui/input";
import GridPost from "../../../@/components/shared/GridPost";
import SearchPostResults from "../../../@/components/shared/SearchPostResults";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const posts = useGetPostsMutation();
  const searchPostsResult = useSearchPostsMutation(searchTerm);

  const showAllPosts =
    !searchTerm &&
    posts?.data?.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold e-full text-left">Search posts</h2>
        <div className="flex p-2 bg-dark-4 w-full rounded-xl">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="mr-2"
          />
          <Input
            type="text"
            placeholder="Search"
            className="shad-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex mt-10 justify-between itens-center w-full">
          <h3 className="text-light-2 small-medium lg:base-regular">
            Popular posts
          </h3>
          <div className="flex gap-2">
            <p className="text-light-4 bg-dark-4 px-3 py-1 rounded-xl">All</p>
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-1">
          {searchPostsResult?.data?.documents?.length! > 0 ? (
            <SearchPostResults />
          ) : showAllPosts ? (
            posts?.data?.pages.map((item, index) => (
              <GridPost key={`post-${index}`} post={item?.documents} />
            ))
          ) : (
            <p className="text-light-4 mt-10 text-center w-full">
              End of Posts
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
