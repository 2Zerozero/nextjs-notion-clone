"use client";

import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";

interface EditorProps {
  onChange: (value: any) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
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
