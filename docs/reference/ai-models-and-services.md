# 대표 AI 모델·서비스 참고 자료

> **용도:** ToolMatch(툴매치) 추천 로직·툴 카드·포지셔닝 맵 작성 시 기준이 되는 “대표 AI 모델·서비스” 정리.  
> **갱신:** 수동 큐레이션. PRD 7.2에 따라 “최근 업데이트 날짜”를 노출해 신뢰를 강화한다.

---

## 1. 분류 체계 (PRD 기준)


| category    | 설명                             | 대상 사용자     |
| ----------- | ------------------------------ | ---------- |
| **builder** | 노코드/로우코드·앱 빌더. 프롬프트로 데모·MVP 제작 | 비개발자, 창업자  |
| **IDE**     | 코드베이스 인식·에디터/터미널 통합 코딩 도구      | 개발자, 솔로·팀  |
| **agent**   | 병렬 에이전트·작업 분산·리뷰 큐 중심          | 테크리드, 팀    |
| **chat**    | 범용 챗·문서/기획/리서치·설계 보조           | PM, 기획, 전략 |


---

## 2. Builder (앱/데모 빌더)

### 2.1 Lovable (구 GPT Engineer)


| 항목      | 내용                                                                                                                                                                                                   |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **한 줄** | 대화형으로 앱 생성, Supabase·인증·원클릭 배포까지. 비개발자 MVP에 최적.                                                                                                                                                      |
| **제공**  | Lovable (lovable.dev)                                                                                                                                                                                |
| **스택**  | React, Tailwind, Supabase. GitHub 양방향 동기화·코드 소유.                                                                                                                                                     |
| **가격**  | 무료 티어 + 크레딧 기반 유료 (대략 $20~25/월 수준)                                                                                                                                                                   |
| **강점**  | 10분 내 데모, 노코드 “바이브 코딩”, 코드 내보내기·소유권                                                                                                                                                                  |
| **한계**  | 복잡한 기능에서 품질 저하, 크레딧 소진 이슈, 스택 고정                                                                                                                                                                     |
| **참고**  | [vibecoding.app 비교](https://vibecoding.app/blog/best-ai-app-builders), [Flatlogic Lovable vs Bolt vs Replit](https://flatlogic.com/blog/lovable-vs-bolt-vs-replit-which-ai-app-coding-tool-is-best/) |


### 2.2 Bolt.new (StackBlitz)


| 항목      | 내용                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| **한 줄** | 브라우저만으로 풀스택 앱 생성. 프롬프트→실제 코드·실시간 미리보기.                                                                       |
| **제공**  | StackBlitz (bolt.new)                                                                                        |
| **특징**  | WebContainers 기반, 로컬/터미널 불필요. Figma·GitHub 임포트.                                                              |
| **가격**  | 무료(1M 토큰/월), Pro $25/월, Teams $30/멤버                                                                         |
| **강점**  | 속도 빠름, 풀 코드 내보내기, 프로토타이핑에 적합                                                                                 |
| **한계**  | 토큰 비용 급증 가능, 복잡한 비즈니스 로직은 보완 필요                                                                              |
| **참고**  | [bolt.new pricing](https://bolt.new/pricing), [Bolt.new review](https://vibecoding.app/blog/bolt-new-review) |


### 2.3 Replit (Replit Agent)


| 항목      | 내용                                                                     |
| ------- | ---------------------------------------------------------------------- |
| **한 줄** | 클라우드 IDE + AI 에이전트. 자가 디버깅, 다언어·풀스택 개발.                                |
| **제공**  | Replit (replit.com)                                                    |
| **특징**  | PostgreSQL 내장, 실시간 협업, Python/Node/Go 등. 에이전트가 코드 수정·실행·디버깅.           |
| **가격**  | 무료 티어 + 유료 (약 $20~25/월)                                                |
| **강점**  | 개발자 친화적, 복잡한 SaaS·멀티파일 제어에 유리                                          |
| **한계**  | 비개발자에게는 진입 장벽 높음                                                       |
| **참고**  | [Replit vs Lovable](https://designrevision.com/blog/replit-vs-lovable) |


---

## 3. IDE (코딩 보조·에디터 통합)

### 3.1 Cursor


| 항목      | 내용                                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **한 줄** | VS Code 포크. 코드베이스 전반 인식 + 인라인 편집·에이전트.                                                                                                                              |
| **제공**  | Cursor (cursor.com)                                                                                                                                                 |
| **가격**  | 유료 $20/월 수준. 무료 제한 있음.                                                                                                                                              |
| **강점**  | Tab 오토완료, 레포 검색·명령 실행 에이전트, 리팩터링·탐색에 강함                                                                                                                             |
| **한계**  | 에이전트 루프·불안정 편집 리포팅, 컨텍스트 관리 불만 일부                                                                                                                                   |
| **참고**  | [Toolpod AI Coding Tools](https://toolpod.dev/blog/comparing-ai-coding-tools-2024), [Cursor vs Copilot vs Windsurf](https://toolpod.dev/ai-coding-tools-comparison) |


### 3.2 Claude Code (Claude for terminal / Claude Code)


| 항목      | 내용                                                                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **한 줄** | 터미널 기반. 파일 편집·명령 실행·장문 컨텍스트 추론.                                                                                                          |
| **제공**  | Anthropic (claude.ai 등)                                                                                                                  |
| **가격**  | Claude Pro $20/월 등.                                                                                                                      |
| **강점**  | SWE-bench 77.2% 수준, 레거시 코드·복잡한 다단계 작업, “덜 봐줘도 됨”                                                                                         |
| **한계**  | CLI 워크플로 학습 필요, 위험 작업 시 권한·가드레일 필수, 안정성 이슈 리포팅                                                                                           |
| **참고**  | [Toolstac 4 Major AI Coding Tools](https://toolstac.com/compare/cursor/claude-code/ai-coding-assistants/ai-coding-assistants-comparison) |


### 3.3 GitHub Copilot


| 항목      | 내용                                                                                  |
| ------- | ----------------------------------------------------------------------------------- |
| **한 줄** | 인라인·멀티라인 제안. 다양한 언어·IDE(VS Code, JetBrains, Vim, Xcode).                            |
| **제공**  | GitHub (github.com/copilot)                                                         |
| **가격**  | $10/월. 무료 2,000 completions/월.                                                      |
| **강점**  | 업계 표준, 가성비·다중 모델, 초보자 접근 용이                                                         |
| **한계**  | 코드베이스 깊은 이해 부족                                                                      |
| **참고**  | [AI Tool VS Best AI for Coding 2025](https://aitoolvs.com/best-ai-for-coding-2025/) |


### 3.4 Windsurf (Codeium)


| 항목      | 내용                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **한 줄** | AI 네이티브 IDE. Cascade 에이전트·멀티파일 리팩터·채팅·라이브 프리뷰.                                                                                       |
| **제공**  | Codeium (windsurfai.org)                                                                                                             |
| **가격**  | 무료 + Pro 약 $10/월                                                                                                                     |
| **강점**  | 에이전트형 워크플로, 자연어 명령, 터미널·클립보드·브라우징 컨텍스트                                                                                               |
| **한계**  | Cursor 대비 인지도·에코시스템 작음                                                                                                               |
| **참고**  | [Windsurf Docs](https://docs.codeium.com/windsurf/getting-started), [Windsurf Review](https://autonomous.ai/ourblog/windsurf-review) |


---

## 4. Agent (병렬 에이전트·오케스트레이션)

### 4.1 Codex (OpenAI 앱)


| 항목      | 내용                                                                                                                                                                                                               |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **한 줄** | 클라우드 자율 코딩 에이전트. 샌드박스에서 다파일 편집·테스트·PR 제출.                                                                                                                                                                        |
| **제공**  | OpenAI (Codex 앱)                                                                                                                                                                                                 |
| **특징**  | 비동기·병렬 작업. 워크트리(격리 브랜치) 내장.                                                                                                                                                                                      |
| **강점**  | 워크트리로 에이전트 격리, 병렬 워크플로, 장기 엔지니어링 태스크                                                                                                                                                                             |
| **한계**  | 사람 리뷰/머지 절차 필요, 출시 단계·제약에 따른 가용성                                                                                                                                                                                 |
| **참고**  | [Codex vs Antigravity](https://www.keywordsai.co/market-map/compare/google-antigravity-vs-openai-codex), [Codex vs Cursor vs Antigravity](https://www.wpthemelabs.com/codex-vs-cursor-vs-antigravity-comparison) |


### 4.2 Google Antigravity


| 항목      | 내용                                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **한 줄** | 에이전트 퍼스트 IDE. 에디터·터미널·브라우저를 넘나드는 자율 에이전트.                                                                                                                          |
| **제공**  | Google (antigravityai.org 등)                                                                                                                                       |
| **특징**  | Agent Manager로 다중 에이전트 조율, 브라우저 인 더 루프 테스트, 아티팩트 타임라인(플랜·diff·스크린샷). SWE-bench Verified 76.2%. Gemini 3 Pro·Claude 등 다중 모델.                                        |
| **강점**  | 병렬 프로젝트/에이전트 실행, “에이전트 룰” 투자 시 효과 큼                                                                                                                                |
| **한계**  | 자율성으로 인한 안전 우려, 권한 설정 중요, 프리뷰 단계 거친 부분·인시던트 리포팅                                                                                                                    |
| **참고**  | [Antigravity IDE Guide](https://www.antigravity-ide.org/), [Antigravity vs Codex](https://www.keywordsai.co/market-map/compare/google-antigravity-vs-openai-codex) |


---

## 5. Chat (범용 챗·기획·리서치)

### 5.1 ChatGPT (OpenAI)


| 항목      | 내용                                                                                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **한 줄** | PRD·아키텍처 스케치·초안·브레인스토밍·일반 문제 해결.                                                                                                                               |
| **제공**  | OpenAI (chat.openai.com)                                                                                                                                       |
| **모델**  | GPT-4.5 등. 128K 컨텍스트. 웹 검색·DALL·E 3 이미지 생성.                                                                                                                    |
| **가격**  | 무료 / Plus $20/월 / Pro $200/월                                                                                                                                   |
| **강점**  | 생태계·통합 기능, 창의적 각도, 올라운더                                                                                                                                        |
| **한계**  | 환각 가능—중요 사실 검증 필요. 검색/요약 조작 가능성.                                                                                                                               |
| **참고**  | [ChatGPT vs Claude vs Gemini](https://www.datastudios.org/post/chatgpt-vs-claude-vs-google-gemini-full-report-and-comparison-of-models-capabilities-plans-and) |


### 5.2 Claude (Anthropic)


| 항목      | 내용                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------------------- |
| **한 줄** | 장문 컨텍스트·글쓰기·구조화된 사고. 코드 품질·윤리 추론에 강함.                                                                 |
| **제공**  | Anthropic (claude.ai)                                                                                 |
| **모델**  | Claude 4 Opus/Sonnet 등. 200K~1M 토큰 컨텍스트.                                                              |
| **가격**  | 무료 / Pro $20/월 / Max $100~200/월                                                                       |
| **강점**  | 장문 추론, 글쓰기·분석 품질, 환각 상대적으로 적음                                                                         |
| **한계**  | 챗 도구로서 IDE처럼 레포 직접 실행은 아님. 에이전트 기능은 제품/티어별 상이.                                                        |
| **참고**  | [Claude vs ChatGPT vs Gemini](https://www.perfectstorm.org/articles/claude-chatgpt-gemini-comparison) |


### 5.3 Gemini (Google)


| 항목      | 내용                                                                                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **한 줄** | 리서치·Workspace 연동. Deep Research·Gmail/Drive/Chat 연동.                                                                                                                       |
| **제공**  | Google (gemini.google.com)                                                                                                                                                 |
| **모델**  | Gemini 2.5 Pro 등. 1M+ 토큰. 실시간 웹·멀티모달.                                                                                                                                      |
| **가격**  | 무료 / AI Pro $19.99/월 / Ultra $249.99/월                                                                                                                                     |
| **강점**  | Deep Research, Google 생태계, 무료 티어 넉넉, 최신 정보 활용                                                                                                                              |
| **한계**  | 코딩 도움은 리뷰 기준 들쭉날쭉, 컨텍스트/처리 이슈 리포팅                                                                                                                                          |
| **참고**  | [DataStudios ChatGPT vs Claude vs Gemini](https://www.datastudios.org/post/chatgpt-vs-claude-vs-google-gemini-full-report-and-comparison-of-models-capabilities-plans-and) |


---

## 6. 툴 데이터 구조 매핑 (PRD 7.1)

아래 필드는 MVP 툴 카드·추천 로직에 사용한다.


| PRD 필드                | 이 문서에서 채우는 방법                          |
| --------------------- | ---------------------------------------- |
| name                  | 위 각 서비스 이름 (예: Lovable, Cursor)          |
| category              | builder / IDE / agent / chat             |
| best_for              | 각 툴의 “한 줄” 또는 “강점” 기반 1문장               |
| praised_keywords[]    | 리뷰 수집 문서에서 추출한 “자주 칭찬” 키워드              |
| criticized_keywords[] | 리뷰 수집 문서에서 추출한 “자주 불만” 키워드              |
| how_to_start[]        | “이렇게 시작하세요” 3단계 안내 (비개발자·초심자 기준, 각 단계 1~2줄) |
| positioning (x, y)    | **Post-MVP.** 2×2 맵용 정성 좌표 (MVP에서는 미사용)  |
| persona_fit           | P(주도) / A(보조) — 서베이 규칙표와 연동             |
| references[]          | 위 “참고” 링크 + 공식 문서·커뮤니티 링크               |


---

## 7. 문서 이력


| 버전  | 날짜      | 변경 요약                                                                       |
| --- | ------- | --------------------------------------------------------------------------- |
| 0.1 | 2026-02 | PRD·draft·기존 HTML 샘플 기준 최초 정리. Builder/IDE/Agent/Chat 분류 및 대표 서비스·참고 링크 반영. |
| 0.2 | 2026-02 | PRD v0.2 반영 — how_to_start[] 필드 추가, positioning (x, y) Post-MVP로 변경. |


