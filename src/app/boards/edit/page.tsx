"use client";

import dynamic from "next/dynamic";

const ImageEditor = dynamic(() => import("@/components/ImageEditor"), {
  ssr: false,
});

export default function Page() {
  return <ImageEditor />;
}
