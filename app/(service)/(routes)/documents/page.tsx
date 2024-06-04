"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
  const { user } = useUser();
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
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a document
      </Button>
    </div>
  );
};

export default DocumentsPage;
