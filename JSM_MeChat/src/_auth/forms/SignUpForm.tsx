import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../@/components/ui/button';
import { SignUpValidationSchema } from '../../../@/lib/validation/index';
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
import { Input } from "../../../@/components/ui/input"
import Loader from '../../../@/components/shared/Loader';
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccountMutation, useSignInAccountMutation } from '@/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

export default function SignUpForm() {
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccountMutation();
  const { mutateAsync: signInUser, isPending: isSigningIn } = useSignInAccountMutation();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidationSchema>>({
    resolver: zodResolver(SignUpValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return (
        toast({
          title: "Oops!! Something went wrong.",
        })
      );
    }

    const session = await signInUser({
      email: values.email,
      password: values.password,
    });

    // check if the session was successfully created
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
        title: "Login Failed. Please check you credentials and try again"
      })
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img
          src="/assets/images/logo.svg"
          alt='logo'
          className=''
        />

        <h2 className='h3-bold md:h2-bold sm:pt-5 md:pt-12'>
          Create an account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use MeChat, enter your details
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 w-2/3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className='shad-input' {...field} />
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
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='shad-button_primary p-3'>
          {isCreatingUser ? (
            <div className='flex gap-2'>
              <Loader /> Creating Account
            </div>
          ) : isSigningIn ? (
            <div className='flex gap-2'>
              <Loader /> Signing In
            </div>
          ) : "Submit"}
        </Button>

        <p className='text-small-regular text-light-2 text-center mt-2'>Already have an account?
         <Link to="/sign-in" className='text-primary-500 text-small-semibold ml-1'>Sign In</Link>
        </p>
      </form>
    </Form>
  )
}
