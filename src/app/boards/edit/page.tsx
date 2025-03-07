"use client";

import dynamic from "next/dynamic";

const ImageEditor = dynamic(
  () => import("@/components/boards/create/image-editor"),
  {
    ssr: false,
  },
);

export default function Page() {
  return <ImageEditor />;
}
