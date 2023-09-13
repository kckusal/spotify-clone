"use client";

import { AuthModal } from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import { UploadModal } from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  products: ProductWithPrice[];
}

export const ModalProvider: React.FC<Props> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />

      <SubscribeModal products={products} />
    </>
  );
};
