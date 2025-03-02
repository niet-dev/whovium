import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function base64ImageToFile(
  base64String: string,
  fileName: string,
  type: string,
) {
  const withoutHeader = base64String.replace(
    /^data:image\/[a-zA-Z]+;base64,/,
    "",
  );
  const buf = Buffer.from(withoutHeader, "base64");
  return new File([buf], fileName, { type });
}
