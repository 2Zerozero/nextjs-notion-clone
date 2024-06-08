"use client";

import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Item from "./Item";
import { toast } from "sonner";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false); // 사이드바 가로 길이가 늘어나거나 줄어들때 사용
  const sidebarRef = useRef<ElementRef<"aside">>(null); // 사이드바 가로 길이를 변경할때 사용
  const navbarRef = useRef<ElementRef<"div">>(null); // 사이드바 접었다 펼때 사용되는 네비게이션 바 버튼에 사용
  const [isResetting, setIsResetting] = useState(false); // 사이드바 접었다 다시 펼쳐서 원래 모양으로 돌릴 때 사용
  const [isCollapsed, setIsCollapsed] = useState(isMobile); // 사이드바가 접힌 상태인지 체크

  // 사이드바 Document 생성 핸들러
  const handleCreate = () => {
    const promise = create({ title: "test" });

    toast.promise(promise, {
      loading: "Creating a new Document...",
      success: "New Document Created!!",
      error: "Failed to create a new document",
    });
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault(); // 브라우저가 기본적으로 제공하는 이벤트의 기본 행동 방지
    event.stopPropagation(); // 이벤트가 상위 요소로 전파는걸 방지

    isResizingRef.current = true; // 사이드바의 가로세로 길이 조정 여부 추적에 사용
    document.addEventListener("mousemove", handleMouseMove); // 마우스 움직임 추적
    document.addEventListener("mouseup", handleMouseUp); // 사용자가 마우스 버튼에서 손을 떼면 호출 => 사용자가 사이드바 크기 조정을 마칠때 일어나는 이벤트를 처리하기 위함
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return; // false 인 경우 함수 중단
    let newWidth = event.clientX; // 현재 x 좌표를 추적. 새로운 width 값을 결정하는데 사용

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false; // 사용자가 요소의 크기를 조절하고 있는지 확인 : 조절을 하지 않으면 false

    // 더 이상 필요하지 않는 이벤트 리스너를 제거함으로서 메모리 누수를 방지하고 성능 최적화
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      // 해당 요소가 존재한다면
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      // 사이드바가 접혔는 상태 값과 현재 width 값을 수정하고 있는 상태 값을 true
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

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
          onClick={collapse}
          role="button"
          className={cn(
            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        {/* 사이드바 유저 정보 및 환경설정 */}
        <div>
          <UserItem />
          <Item onClick={() => {}} label="Search" icon={Search} isSearch />
          <Item onClick={() => {}} label="Settings" icon={Settings} />
          <Item onClick={handleCreate} label="New Documnet" icon={PlusCircle} />
        </div>
        <div className="mt-4"></div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover:opacity-100"
        />
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
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
