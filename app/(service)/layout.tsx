"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import { SearchCommand } from "@/components/search-command";

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // 로딩 상태인 경우 스피너를 랜더링
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // 인증되지 않은 사용자인 경우 홈페이지로 이동
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-full dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default ServiceLayout;
