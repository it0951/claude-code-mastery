# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙
- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

개발자 웹 이력서 프로젝트. 순수 HTML/CSS/JavaScript와 Tailwind CSS만 사용하며, 외부 프레임워크(React 등) 없이 개발한다.

## 프로젝트 구조

```
resume/
├── index.html       # 메인 진입점, 모든 섹션 포함
├── style.css        # Tailwind 외 커스텀 스타일 (애니메이션 등)
├── script.js        # 인터랙션 로직 (스크롤, 타이핑, 메뉴)
└── assets/images/   # 프로필 사진 등 정적 이미지
```

## 기술 스택 규칙

- **Tailwind CSS**: CDN 방식 사용 (`<script src="https://cdn.tailwindcss.com">`)
- **JavaScript**: Vanilla JS만 사용, 외부 라이브러리 금지
- **폰트**: Google Fonts CDN
- **아이콘**: 필요 시 SVG 인라인 또는 간단한 CDN (Heroicons 등)

## 개발 방법

별도 빌드 도구 없음. 브라우저에서 `resume/index.html`을 직접 열어 확인한다.

```bash
# Live Server (VS Code 확장) 사용 권장
# 또는 브라우저에서 직접 파일 열기
open resume/index.html
```

## 섹션 구성 순서

`index.html` 내 섹션 순서: Hero → About → Skills → Experience → Projects → Education → Contact

## 디자인 원칙

- 색상 2~3가지로 통일 (Tailwind 색상 팔레트 활용)
- 다크 모드: Tailwind `dark:` 클래스 + `localStorage`로 상태 유지
- 반응형: 모바일 우선(mobile-first) 설계
