# NextJS 로 노션 클론코딩

## 직접 겪은 문제점

<h3>convex 와 clerk 사용할 때 에러 발생</h3>

---

<img src=upload/Error01.png>

---

해당 오류는 convex-provider.tsx 파일에 ‘use client’ 를 추가하지 않아서 발생하는 코드이다.

로직 작성하고 컴퓨터를 새로 설치하는 바람에 개발 환경 세팅을 덜해서 발생하는줄 알아서 하루정도 고생했다..

Provider를 만드는 이유는 클라이언트 컴포넌트를 서버 컴포넌트에서 사용하는 것이라고 알게되었다.

---

<h3>config.mjs, config.js 차이점</h3>

ES6 모듈 (ECMAScript Modules) - .mjs

- 파일 확장자: ES6 모듈은 일반적으로 .mjs 확장자를 사용.
- 모듈 시스템: ES6 모듈 시스템을 사용.
- import와 export 키워드: 모듈에서 함수, 객체, 또는 원시 값을 가져오거나 내보내기 위해 import와 export 키워드를 사용.
- 호이스팅: import 문은 파일 상단에 위치해야 하며, 호이스팅(hoisting)이 발생.
- 엄격 모드: 모든 ES6 모듈은 자동으로 strict mode로 실행.
- 비동기 처리: 모듈을 비동기적으로 로드할 수 있다.
- 브라우저 및 Node.js: 최신 브라우저와 Node.js(버전 12 이상)에서 기본적으로 지원된다. Node.js에서는 package.json 파일에 "type": "module"을 설정하여 .js 파일을 ES6 모듈로 사용할 수도 있다.

CommonJS 모듈 - .js

- 파일 확장자: 일반적으로 .js 확장자를 사용.
- 모듈 시스템: CommonJS 모듈 시스템을 사용.
- require와 module.exports 키워드: 모듈에서 함수, 객체, 또는 원시 값을 가져오거나 내보내기 위해 require와 module.exports 키워드를 사용.
- 동기 처리: require는 동기적으로 모듈을 로드.
- 호이스팅 없음: require 문은 코드 내 어디에나 위치할 수 있다.
- Node.js 중심: Node.js 환경에서 기본적으로 사용되는 모듈 시스템이다. 브라우저에서는 기본적으로 지원하지 않으며, 브라우저에서 사용하려면 번들러(예: Webpack, Browserify)가 필요하다.

---

<img src=upload/Error02.png>

---

```
next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;


```

모듈로 변경하고는 mjs 로 사용하여 ReferenceError 가 발생했었다.

<h3>BlockNote</h3>
강의에서 설치하는 버전과 현재 버전이 달라 라이브러리의 문법이 달라져 고생했다.

라이브러리의 버전을 강의와 같은 버전으로 내리니 Next.js 에서 오류가 발생하고

모든 패키지 버전을 강의와 똑같이 다운그레이드하니 또 Next.js 에서 문제가 발생해 결국 공식문서와 구글링을 통하여 해결하였는데, 해결하고나니 이게 3일 정도 걸릴 일인가 싶기도하고.. Ha..

기존 코드

```

"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({
  onChange,
  initialContent,
  editable,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

```

공식 문서와 스택오버플로우 등 검색을 통해 수정한 코드

```

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

```
