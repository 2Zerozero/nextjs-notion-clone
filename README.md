# NextJS 로 노션 클론코딩

## 문제발생

1. convex 와 clerk 사용할 때 에러 발생

---

<img src=upload/Error01.png>

---

해당 오류는 convex-provider.tsx 파일에 ‘use client’ 를 추가하지 않아서 발생하는 코드이다.

로직 작성하고 컴퓨터를 새로 설치하는 바람에 개발 환경 세팅을 덜해서 발생하는줄 알아서 하루정도 고생했다..

Provider를 만드는 이유는 클라이언트 컴포넌트를 서버 컴포넌트에서 사용하는 것이라고 알게되었다.

---
