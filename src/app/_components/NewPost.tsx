import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { PostProps } from "../lib/types";

interface NewPostProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  createMutation:  UseMutationResult<PostProps, Error,  PostProps>;
}
type FormProps = {
    id: number,
    title: string,
    body: string;
}
const NewPost = ({ setIsVisible, createMutation}: NewPostProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log("Form", data);
    createMutation.mutate({
        ...data,
         id: Math.floor(Math.random() * 10000)
    }, {
        onSuccess: () =>  {
            reset();
            setIsVisible(false);
        }
    })
   
  }
  return (
    <div className="flex flex-col justify-center items-center z-30 mb-3">
      <div
        className="bg-gray-600 rounded-lg p-10 w-3xl"
        style={{ boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px` }}
      >
        <h2 className="text-3xl mb-4 text-center">Create Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              placeholder="Write your title"
              {...register("title", { required: "Title is required" })}
              className="border bg-gray-50 text-gray-700 w-full p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="body">Description</label>
            <input
              id="body"
              placeholder="Description"
              {...register("body", {required: "Description is required"})}
              className="border bg-gray-50 text-gray-700 w-full p-2"
            />
            {errors.body && (
                <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer px-3 py-2 rounded-lg"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
