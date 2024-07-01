"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
            <Button
              className="rounded-full text-xs text-muted-foreground opacity-0 group-hover/icon:opacity-100"
              onClick={() => {}}
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </IconPicker>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
