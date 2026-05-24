# Tournament Migration Plan (#89)

> pre-launch 브랜치의 **토너먼트 진행 / 결과(영수증)** 화면을 현재 dev 컨벤션에 맞춰 마이그레이션합니다.
> 단순 복사 아닌 **공통 컴포넌트·디렉터리 구조·컨벤션·디자인 토큰**에 맞춘 리팩토링이 목표입니다.

브랜치: `feat/89-tournament-migration`
기준 브랜치: `feat/87-flow-integration` (머지 후 dev → feat/89로 이동)

---

## 1. 마이그레이션 대상 (pre-launch)

### 페이지
- `app/tournament/loading/page.tsx` — 대진표 만드는 중 (로딩)
- `app/tournament/page.tsx` — 매칭 진행 화면
- `app/tournament/result/page.tsx` — 결과 영수증
- `app/tournament/layout.tsx`, `result/layout.tsx`, `loading/layout.tsx`

### 컴포넌트 (`components/tournament/*`)
- `RoundBadge.tsx`, `TournamentQuestion.tsx`, `VsSection.tsx`
- `ProductCard.tsx`, `FinalProductCard.tsx`
- `loading/_components/FloatingProducts.tsx`, `LoadingBar.tsx`
- `result/_components/ReceiptDrawMachine.tsx`, `TournamentResultPageClient.tsx`

### 비즈니스 로직
- `hooks/useTournament.ts` — 8강 고정 대진 로직, 라운드 진행, 결과 누적
- `types/tournament.ts` — `Match` 타입
- `consts/tournament.tsx` — 라운드 라벨 등
- `utils/resultStorage.ts`, `utils/pikiResultStorage.ts` — localStorage 결과 저장

---

## 2. 컨벤션 차이 (정리 대상)

### 디렉터리 구조
| 항목 | pre-launch | dev 컨벤션 |
|---|---|---|
| 페이지 전용 컴포넌트 | `src/components/tournament/` (전역) | `app/{page}/_components/` 또는 `components/` |
| 페이지 전용 hook | `src/hooks/useTournament.ts` (전역) | `app/{page}/hooks/` |
| 페이지 전용 consts | `src/consts/tournament.tsx` (전역) | `app/{page}/consts/` |
| 페이지 전용 types | `src/types/tournament.ts` (전역) | `app/{page}/types/` |

**조치**: 토너먼트 진행/결과에서만 쓰이는 코드는 모두 해당 페이지 폴더 하위로 이동.

### 네이밍
- 타입: pre-launch는 `Match` → dev 컨벤션은 **T suffix** (`MatchT`)
- 핸들러: 외부 prop = `on-`, 내부 = `handle-` (이미 일부 적용되어 있음, 일관성 확인)

### 스타일링
| 항목 | pre-launch | dev |
|---|---|---|
| 배경색 | `bg-[#F5F7F8]`, `bg-[#F4F4F6]` 하드코딩 | `bg-bg-layer-basement` 토큰 |
| 텍스트/아이콘 색 | 하드코딩 hex (`#171719` 등) | `text-text-neutral-primary` 등 시맨틱 토큰 |
| 타이포 | inline px | 유틸 클래스 (`heading-1-bold`, `body-2-medium` 등) |

### 컴포넌트 재사용
- pre-launch의 `ProductCard` ↔ dev의 [`WishCard`](apps/web/src/components/common/WishCard.tsx) — 시각 유사. **합칠지 분리할지 결정 필요** (토너먼트는 더 큰 사이즈/다른 비율일 수 있음 → 별도 유지가 안전)
- `RoundBadge` ↔ dev의 [`StateChip`](apps/web/src/components/common/StateChip/StateChip.tsx) — cva 기반 칩. **StateChip variants 확장으로 흡수 가능 여부 검토**
- `TournamentQuestion` (헤더 텍스트) — 공통화할 만큼 재사용 없음. 페이지 내부에 둠.

### 결과 저장 util
- `utils/resultStorage.ts`, `utils/pikiResultStorage.ts` 두 개 존재 — **중복 정리 필요**
- localStorage prefix는 dev 컨벤션상 `piki:` 강제 (memory: project_service_name)

---

## 3. 프리런칭 대비 변경 포인트 (디자인 시안 기준)

> 첨부 시안에 있는 화면들

### 신규/변경
- **8강 라운드 진입 안내**: `Pick!` 버튼 + "4강 진입!" 모달 ("8강이 끝났어요 이제 4강을 시작할게요") — pre-launch에 없을 가능성. **Figma 시안에서 확정 후 추가**
- **결승전 카운트다운**: 큰 원형 타이머 ("결승까지 왔어요!" / "3" 카운트) — pre-launch의 결승 진입 UX 점검 후 보강
- **결과 화면 토스트**: "보관함에 결과를 저장했어요. 확인하기" — dev의 `SuccessToast`로 통합 가능
- **결과 카드 액션**: "이미지 공유" / "플레이 링크 공유" — pre-launch 구현 확인 후 보강

### 검증
- 8강 고정 (memory: project_prelaunch_constraints) — 그대로 유지
- 더미 7개 시딩 + 사용자 1개만 등록, 사용자 1번 시드 — mock 데이터 정책 일치 확인

---

## 4. 작업 단계

### Phase 1 — 사전 분석
- [ ] pre-launch 대상 파일을 모두 읽고 컨벤션 격차 매핑 정리
- [ ] dev 공통 컴포넌트(`Button`, `Dialog`, `Drawer`, `Toast`, `StateChip`, `TournamentCard` 등) 재사용 가능성 표 작성
- [ ] Figma 시안 노드 ID 정리 (대진표 로딩 / 매칭 / 4강 진입 모달 / 결승 카운트 / 결과 영수증)

### Phase 2 — 토너먼트 진행 (`/tournament`)
- [ ] `app/tournament/page.tsx`를 dev 컨벤션 폴더 구조로 이식
  - `_components/`, `hooks/`, `consts/`, `types/` 하위 배치
- [ ] `useTournament` hook 마이그레이션
  - 타입 T suffix 적용 (`MatchT`, `MatchPairT` 등)
  - mock 의존성을 dev의 mock 구조(`apps/web/src/mocks/`)와 통합
- [ ] `RoundBadge`를 `StateChip`으로 흡수 검토 → 가능 시 통합, 불가 시 페이지 컴포넌트로 이동
- [ ] `VsSection`, `ProductCard`, `FinalProductCard`, `TournamentQuestion` 이식 + 디자인 토큰 적용
- [ ] 배경/색상/타이포 토큰화

### Phase 3 — 대진표 로딩 (`/tournament/loading`)
- [ ] `FloatingProducts`, `LoadingBar` 이식 + 디자인 토큰 적용
- [ ] `/tournament/create` "시작하기" → `/tournament/loading` 라우팅 연결
- [ ] 로딩 종료 → `/tournament` 매칭 화면 라우팅

### Phase 4 — 4강 진입 / 결승 카운트다운 (신규)
- [ ] Figma 시안 확인 후 8강 종료 시 "4강 진입!" 모달/오버레이 구현 (`Drawer`/`Dialog` 재사용)
- [ ] 결승 진입 시 카운트다운 화면 구현 (3초 카운트)
- [ ] `useTournament`에 라운드 전환 콜백 hook 추가

### Phase 5 — 결과 화면 (`/tournament/result`)
- [ ] `ReceiptDrawMachine`, `TournamentResultPageClient` 이식
- [ ] 결승 종료 → `/tournament/result` 라우팅
- [ ] 메달 에셋(`medal-1.svg`, `medal-2.svg`, `medal-bronze.svg`, `medal-silver.svg`) 정리 — 폴더 컨벤션 맞춤
- [ ] "결과 저장" 토스트를 `SuccessToast`로 교체
- [ ] "홈으로 가기" / "결과 저장하기" 버튼 → 라우팅 연결 (저장 시 `piki:` prefix localStorage)
- [ ] `resultStorage`와 `pikiResultStorage` 중복 정리, `piki:` prefix 컨벤션 확인

### Phase 6 — 마무리
- [ ] pre-launch 잔재 파일(전역 `components/tournament/*`, `hooks/`, `consts/`, `types/` 등) 제거 확인
- [ ] `pnpm lint && pnpm check-types && pnpm build` 통과
- [ ] 전체 flow QA (토너먼트 생성 → 시작 → 8강 → 4강 진입 → 결승 카운트 → 결과 → 보관함 저장)
- [ ] PR 분리 검토 (Phase 2~3 / Phase 4 / Phase 5 단위로 쪼개기 가능)

---

## 5. 위험/주의

- **`useTournament` 로직 회귀**: 8강 고정 시드 로직이 깨지면 전체 flow가 망가짐. 마이그레이션 전후 시나리오 비교 테스트 필요.
- **이미지 에셋**: pre-launch의 메달/리시트 PNG·SVG를 위치 이동할 때 import 경로 누락 주의.
- **localStorage prefix**: pre-launch는 `piki:` 적용 안 됐을 가능성. 마이그레이션 시 prefix 통일.
- **PR 크기**: 6단계 한 PR은 리뷰가 어려움. **Phase 2~3 / 4 / 5로 PR 분리** 권장.

---

## 6. 참고

- Figma 시안: (이슈 본문에 노드 ID 첨부)
- pre-launch 브랜치: `pre-launch`
- 관련 메모리:
  - `project_prelaunch_constraints` — 풀 mock, 8강 고정, 사용자 1번 시드
  - `project_service_name` — `piki` / localStorage prefix `piki:`
  - `project_conventions` — 네이밍, function 컴포넌트, T suffix 등
