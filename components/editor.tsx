"use client";

import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { headers } from "next/headers";
import axios from "axios";

interface EditorProps {
  onChange: (value: any) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.imageUrl;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  const handleChange = () => {
    onChange(JSON.stringify(editor.document));
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        editable={editable}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};
