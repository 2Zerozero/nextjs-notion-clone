import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(), // 문자열, 문서의 제목
    userId: v.string(), // 문자열, 문서를 생성한 사용자의 ID
    isArchived: v.boolean(), // 불리언, 문서가 보관되었는지 여부
    parentDocument: v.optional(v.id("documents")), // 선택적 ID, 다른 문서에 종속된 문서를 가리킴
    content: v.optional(v.string()), // 선택적 문자열, 문서 내용
    coverImage: v.optional(v.string()), // 선택적 문자열, 문서의 커버 이미지 URL
    icon: v.optional(v.string()), // 선택적 문자열, 문서의 아이콘
    isPublished: v.boolean(), // 불리언, 문서의 공개 여부
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});

// .index("by_user", ["userId"]) : userId 필드를 기반으로 한 인덱스 생성 => 사용자별 문서 검색이 용이해짐
// .index("by_user_parent", ["userId", "parentDocument"]) : userId 와 parentDocument 필드를 기반으로 한 복합 인덱스 => 사용자별로 특정 부모 문서에 종속된 무서들을 효율적으로 검색 가능

/* 
  schema (스키마)
   데이터베이스의 구조와 제약조건에 관해 전반적인 명세를 기술한 것 
*/
