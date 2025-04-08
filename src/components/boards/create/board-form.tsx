"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Crop, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import type {
  FilerobotImageEditorConfig,
  getCurrentImgDataFunction,
} from "react-filerobot-image-editor";
import { useFieldArray, useForm } from "react-hook-form";

import { createBoard } from "@/lib/data";
import {
  ACCEPTED_IMAGE_TYPES,
  createBoardFormSchema as formSchema,
  type CreateBoardFormValues as FormValues,
} from "@/lib/schema";
import { EditorImage, EditorImageWithIndex } from "@/lib/types";
import { base64ImageToFile, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ImageEditor = dynamic(
  () => import("@/components/boards/create/image-editor"),
  {
    ssr: false,
  },
);

type ImgDataFunctionReturnTypes = ReturnType<getCurrentImgDataFunction>;
type SavedImageData = ImgDataFunctionReturnTypes["imageData"];

export default function BoardForm({ userId }: { userId: number }) {
  const [editorImage, setEditorImage] = useState<
    EditorImage | EditorImageWithIndex
  >({} as EditorImageWithIndex);
  const [coverPreviewShown, setCoverPreviewShown] = useState(false);
  const [coverPreviewURL, setCoverPreviewURL] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const editedImageRef = useRef<null | getCurrentImgDataFunction>(null);

  const imageEditorConfig: FilerobotImageEditorConfig = {
    source: editorImage?.file ? URL.createObjectURL(editorImage.file) : "",
    getCurrentImgDataFnRef: editedImageRef,
    savingPixelRatio: 1,
    previewPixelRatio: 1,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      cover: undefined,
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
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

  async function onSubmit(values: FormValues) {
    const boardId = await createBoard(values, userId);
    redirect(`/boards/${boardId}`);
  }

  function handleImageCropSave(data: SavedImageData) {
    if (
      data.fullName === undefined ||
      data.mimeType === undefined ||
      data.imageBase64 === undefined
    ) {
      throw new Error("One or more required elements is undefined.");
    }
    const { fullName, mimeType, imageBase64 } = data;
    const imageFile = base64ImageToFile(imageBase64, fullName, mimeType);

    if ("index" in editorImage) {
      form.setValue(`images.${editorImage.index}.file`, imageFile);
    } else {
      form.setValue("cover", imageFile);
      setCoverPreviewURL(URL.createObjectURL(imageFile));
    }

    setDialogOpen(false);
  }

  function onCoverImageChange() {
    if (ACCEPTED_IMAGE_TYPES.includes(form.getValues("cover")?.type)) {
      setCoverPreviewURL(URL.createObjectURL(form.getValues("cover")));
      setCoverPreviewShown(true);
    } else {
      setCoverPreviewShown(false);
    }
  }

  return (
    <div className="relative container mx-auto max-w-lg px-4 py-16">
      <Card className="bg-fill inset-ring-stroke-weak border-none inset-ring-2">
        <CardHeader>
          <CardTitle className="text-text-strong text-center">
            Create a new board
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
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
                        className="bg-background/80 border-stroke-weak"
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
                        placeholder="Enter a description..."
                        className="bg-background/80 border-stroke-weak"
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
                      form.formState.errors.cover && "text-error",
                    )}
                  >
                    Cover Image
                  </p>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </span>
                <CollapsibleContent>
                  <FormField
                    control={form.control}
                    name="cover"
                    render={({
                      // value is intentionally not used to prevent the component from being uncontrolled
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      field: { value, onChange, ...fieldProps },
                    }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files && e.target.files[0]);
                              onCoverImageChange();
                            }}
                            className="bg-background/80 border-stroke-weak"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {coverPreviewShown && (
                    <div className="my-6 flex justify-center py-4">
                      <div className="bg-background/80 border-stroke-weak flex flex-col space-y-4 rounded-md border px-6 py-4 shadow-md">
                        <div>
                          <FormLabel htmlFor="cover">Cover</FormLabel>
                          <div className="relative size-40 rounded-md">
                            <Image
                              src={coverPreviewURL}
                              alt="cover image"
                              className="rounded-md object-cover"
                              fill
                            />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditorImage({ file: form.getValues("cover") });
                              setDialogOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <Crop />
                          </Button>
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
                      form.formState.errors.images && "text-error",
                    )}
                  >
                    Cards ({form.getValues("images").length})
                  </p>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                    >
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
                              "border-stroke-weak bg-background/80 my-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border p-3",
                              isDragAccept && "border-primary",
                              isDragReject && "border-error",
                            ),
                          })}
                        >
                          <div className="mt-2 mb-2 flex items-center gap-x-3">
                            <label
                              htmlFor="images"
                              className={`text-text-weak cursor-pointer text-center text-sm`}
                            >
                              <p className="mb-2">
                                Drag some files here, or click to select files
                              </p>
                              <em
                                className={
                                  isDragReject ? "text-error" : undefined
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
                        className="bg-background/80 relative mb-8 rounded-md border p-6 shadow-md"
                      >
                        <div className="flex items-center space-x-8">
                          <div className="relative size-40 rounded-md">
                            <Image
                              src={URL.createObjectURL(
                                form.getValues(`images.${index}.file`),
                              )}
                              alt={`Card image ${index}`}
                              fill
                              className="rounded-md object-cover"
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
                          <div className="absolute top-2 right-2">
                            <div className="flex flex-row-reverse">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="text-error hover:text-error/90 hover:bg-error/5 cursor-pointer"
                              >
                                <X />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditorImage({ index, file: field.file });
                                  setDialogOpen(true);
                                }}
                                className="cursor-pointer"
                              >
                                <Crop />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop</DialogTitle>
            <DialogDescription>
              Click and drag to crop the image. When you are done, click save.
            </DialogDescription>
          </DialogHeader>
          <ImageEditor config={imageEditorConfig} />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (editedImageRef.current !== null) {
                  handleImageCropSave(editedImageRef.current({}).imageData);
                }
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
