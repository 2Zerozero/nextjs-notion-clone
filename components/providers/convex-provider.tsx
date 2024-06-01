import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!); // convex 서버와의 통신 관리

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

/*
  ClerkProvider
  사용자 인증 및 보완에 관련된 기능을 애플리케이션 전체에 제공해주는 컴포넌트

  ConvexProviderWithClerk
  convex 와 clerk 를 연동할 때 사용하는 컴포넌트
  * clinet : convex client 를 설정
  * useAuth : clerk 에서 제공하는 인증 절차를 convex 에 전달
  * 환경변수에 붙은 ! : 타입스크립트 컴파일러에게 해당 값이 null 혹은 undefined 가 아닌 반드시 어떤 값으로 가정하라고 사용
*/
