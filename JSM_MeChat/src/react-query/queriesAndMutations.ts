import {
  createUserAccount,
  signInUserAccount,
  signOutUserAccount
} from '@/appwrite/api';
import { INewUser } from '@/types';
import {
  useMutation,
} from '@tanstack/react-query';

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