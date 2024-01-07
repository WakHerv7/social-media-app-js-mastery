import {
  createPost,
  createUserAccount,
  getRecentPosts,
  signInUserAccount,
  signOutUserAccount
} from '@/appwrite/api';
import { INewPost, INewUser } from '@/types';
import {
  useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';

export function useCreateUserAccountMutation() {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  })
}

export function useSignInAccountMutation() {
  return useMutation({
    mutationFn: (user: {
      email: string;
      password: string;
    }) => signInUserAccount(user)
  })
}

export function useSignOutAccountMutation() {
  return useMutation({
    mutationFn: signOutUserAccount
  })
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}

export function useGetRecentPosts() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts
  })
}