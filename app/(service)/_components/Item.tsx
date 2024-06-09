"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ItemProps는 이 컴포넌트가 받을 수 있는 여러 프로퍼티들을 정의
interface ItemProps {
  label: string; // 아이템의 라벨 (표시될 텍스트)
  onClick: () => void; // 아이템 클릭 시 실행될 함수
  icon: LucideIcon; // 아이템에 표시될 아이콘
  id?: Id<"documents">; // 아이템의 고유 식별자 (선택적)
  documentIcon?: string; // 문서와 관련된 아이콘 (선택적)
  active?: boolean; // 아이템이 활성화 상태인지 여부 (선택적
  expanded?: boolean; // 아이템이 확장되었는지 여부 (선택적)
  isSearch?: boolean; // 검색과 관련된 아이템인지 여부 (선택적)
  level?: number; // 아이템의 계층 레벨 (선택적, 기본값 0)
  onExpand?: () => void; // 아이템 확장 시 실행될 함수 (선택적)
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  // 문서 생성
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
      }
      // router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New Document Created!!!",
      error: "Failed to create a new document...",
    });
  };

  // 이벤트 전파 방지
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "bg-primaty/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      )}

      {documentIcon ? (
        <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {/* 검색 */}
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      )}

      {/* 생성 */}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onCreate}
            className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600 "
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

/*
  !! (이중 논리 NOT 연산자)
  !! 는 논리 NOT 연산자를 두 번 사용하여 값을 불리언 타입으로 변환.
*/
