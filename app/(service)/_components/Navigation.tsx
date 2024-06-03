"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false); // 사이드바 가로 길이가 늘어나거나 줄어들때 사용
  const sidebarRef = useRef<ElementRef<"aside">>(null); // 사이드바 가로 길이를 변경할때 사용
  const navbarRef = useRef<ElementRef<"div">>(null); // 사이드바 접었다 펼때 사용되는 네비게이션 바 버튼에 사용
  const [isResetting, setIsResetting] = useState(false); // 사이드바 접었다 다시 펼쳐서 원래 모양으로 돌릴 때 사용
  const [isCollapsed, setIsCollapsed] = useState(false); // 사이드바가 접힌 상태인지 체크

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <div
          role="button"
          className={cn(
            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600",
            isMobile && "opacity-100",
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>
          <p>Action</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover:opacity-100"></div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "w-[calc(100% - 240px)] absolute left-60 top-0 z-[99999]",
          isResetting && "transition-all ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
