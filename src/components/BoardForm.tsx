"use client";

import { useCallback } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must have at least 2 characters." })
    .max(50, { message: "Title cannot have more than 50 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must have at least 2 characters." })
    .max(255, { message: "Description cannot have more than 255 characters." }),
  cover: z
    .any()
    .refine((file) => file !== null, { message: "Cover is required." })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Cover must be of type *.jpeg, *.jpg, *.png",
    }),
  images: z
    .array(
      z.object({
        file: z
          .any()
          .refine((file) => file !== null, { message: "Image is required." })
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
            message: "Image must be of type *.jpeg, *.jpg, *.png",
          }),
        name: z
          .string()
          .min(2, { message: "Name must have at least 2 characters." })
          .max(100, { message: "Name cannot have more than 100 characters." }),
      }),
    )
    .nonempty({ message: "Board must have at least one card." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function BoardForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      cover: null,
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((acceptedFile) => {
        return append({
          file: acceptedFile,
          name: "",
        });
      });
    },
    [append],
  );
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/jpg": [],
        "image/png": [],
      },
    });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="container mx-auto w-[600px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create a new board</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter a title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        type="text"
                        placeholder="Enter a description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Collapsible>
                <span className="mb-2 flex items-center justify-between">
                  <p
                    className={cn(
                      "flex items-center space-x-2 text-sm font-semibold",
                      form.formState.errors.cover && "text-red-500",
                    )}
                  >
                    Cover Image
                  </p>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </span>
                <CollapsibleContent>
                  <FormField
                    control={form.control}
                    name="cover"
                    // value is intentionally not used to prevent the component from being uncontrolled
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files && e.target.files[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {ACCEPTED_IMAGE_TYPES.includes(
                    form.getValues("cover")?.type,
                  ) && (
                    <div className="my-8 flex justify-center">
                      <div>
                        <FormLabel htmlFor="cover">Preview</FormLabel>
                        <div className="relative h-48 w-48">
                          <Image
                            src={URL.createObjectURL(form.getValues("cover"))}
                            alt="cover image"
                            className="rounded-md shadow-md"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <span className="mb-2 flex items-center justify-between">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      form.formState.errors.images && "text-red-500",
                    )}
                  >
                    Cards ({form.getValues("images").length})
                  </p>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </span>

                <CollapsibleContent>
                  <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                      <div>
                        <div
                          {...getRootProps({
                            className: cn(
                              "mb-4 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border p-3",
                              isDragAccept && "border-green-500",
                              isDragReject && "border-red-500",
                            ),
                          })}
                        >
                          <div className="mb-2 mt-2 flex items-center gap-x-3">
                            <label
                              htmlFor="images"
                              className={`cursor-pointer text-center text-sm text-[#7E8DA0]`}
                            >
                              <p className="mb-2">
                                Drag some files here, or click to select files
                              </p>
                              <em
                                className={
                                  isDragReject ? "text-red-500" : undefined
                                }
                              >
                                Accepted file types: *.jpeg, *.jpg, *.png
                              </em>
                              <input {...getInputProps()} />
                            </label>
                          </div>
                        </div>
                        {form.getValues("images").length === 0 && (
                          <FormMessage />
                        )}
                      </div>
                    )}
                  />
                  {fields.map((field, index) => {
                    return (
                      <div
                        key={field.id}
                        className="relative mb-8 rounded-md border p-2"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative h-48 w-48">
                            <Image
                              src={URL.createObjectURL(
                                form.getValues(`images.${index}.file`),
                              )}
                              alt={form.getValues(`images.${index}.file.name`)}
                              fill
                            />
                          </div>
                          <div className="w-[50%]">
                            <FormField
                              control={form.control}
                              name={`images.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="absolute right-2 top-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <X />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
