import { Button } from '../../../@/components/ui/button';
import { SignInValidationSchema } from '../../../@/lib/validation/index';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form"
import { useSignInAccountMutation } from '@/react-query/queriesAndMutations';

import { useNavigate } from 'react-router-dom';

import { Input } from "../../../@/components/ui/input"
import { Link } from 'react-router-dom';
import Loader from '../../../@/components/shared/Loader';
import { toast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';

export default function SignInForm() {
  const {mutateAsync: signInUser } = useSignInAccountMutation();
  const { checkAuthUser, isLoading } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidationSchema>>({
    resolver: zodResolver(SignInValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidationSchema>) {
    const session = await signInUser({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Failed to sign in. Try again",
      })
    }
    

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({
        title: "Login failed. Please try again"
      })
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img
          src="/assets/images/logo.svg"
          alt='logo'
        />

        <h2 className='h3-bold md:h2-bold sm:pt-5 md:pt-12'>
          Sign Into your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use MeChat, enter your details
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-2/3 first-letter:mt-4 gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className='shad-input'{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='shad-button_primary p-3'>
          {isLoading ? (
            <div className='flex-center w-full'>
              <Loader />
            </div>
          ) : "Submit"}
        </Button>

        <p className='text-small-regular text-light-2 text-center mt-2'>Don't have an account?
         <Link to="/sign-up" className='text-primary-500 text-small-semibold ml-1'>Sign Up</Link>
        </p>
      </form>
    </Form>
  )
}
