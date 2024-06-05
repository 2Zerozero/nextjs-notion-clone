"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "test" });

    toast.promise(promise, {
      loading: "Create a new document...",
      success: "Mew Document Created!",
      error: "Failed to create a new document...",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        className="dark:hidden"
        src="/document.png"
        height="300"
        width="300"
        alt="document-image"
      />
      <Image
        className="hidden dark:block"
        src="/document-dark.png"
        height="300"
        width="300"
        alt="document-image"
      />
      <h2 className="text-lg font-medium">
        Welcom to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a document
      </Button>
    </div>
  );
};

export default DocumentsPage;
