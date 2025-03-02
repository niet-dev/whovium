import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createBoardFormSchema = z.object({
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

export type CreateBoardFormValues = z.infer<typeof createBoardFormSchema>;
