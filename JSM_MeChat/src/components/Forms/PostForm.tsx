import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../../../@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"

import { PostValidationSchema } from "../../../@/lib/validation"
import { Textarea } from "../ui/textarea"

import FileUploader from "../../../@/components/shared/FileUploader";

const PostForm = ({ post }) => {
    // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidationSchema>>({
    resolver: zodResolver(PostValidationSchema),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(", "): "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PostValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-5xl gap-9">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => ( 
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader
                  mediaUrl={post?.imageUrl}
                  fieldOnChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (seperated by ",")</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Js, React, Nextjs" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-4">
            <Button type="button" className="shad-button_dark_4">Cancel</Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap p-3">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm