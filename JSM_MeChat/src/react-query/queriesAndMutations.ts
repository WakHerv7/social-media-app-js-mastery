import {
  createPost,
  createUserAccount,
  deleteSavedPost,
  getCurrentUser,
  getRecentPosts,
  likePost,
  savePost,
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


export function useLikePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({postId, likesArray}: {postId: string, likesArray: string[]}) => {
      return likePost(postId, likesArray);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export function useSavePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({postId, userId}: {postId: string, userId: string}) => {
      return savePost(postId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export function useDeleteSavePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedRecordId: string) => {
      return deleteSavedPost(savedRecordId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      }),
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })
}