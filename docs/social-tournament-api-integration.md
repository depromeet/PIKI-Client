# 소셜 토너먼트 API 연동 계획 (#157)

> #139 / #140 UI 작업 PR 이 dev 머지된 이후, mock 으로 강제 분기해둔 초대·참여·공유 플로우를 실제 API 로 교체한다.
> 이 문서는 **api docs(`/v3/api-docs`) 대비 미적용 endpoint** 와 **각 endpoint 구체 명세 + 클라이언트 적용 위치**를 정리한다.

브랜치: `feat/157-social-tournament-api-integration`
선행 PR: #139 (친구 초대/공유 UI), #140 (초대 코드 입력/참여자 입장 UI)

---

## 0. 공통 응답 래퍼

모든 응답은 `ApiResponseBody` 로 래핑됨.

```json
{
  "data": { /* 실제 응답 */ },
  "detail": "정상적으로 처리되었습니다.",
  "pageResponse": { "nextCursor": null, "hasNext": false }
}
```

- 클라이언트는 axios 인터셉터에서 `.data.data` 를 풀어 사용
- 실패 시 `data: null`, `detail`/`code` 에 사유

---

## 1. 미적용 endpoint 전체 리스트

### Tournament — 소셜 / 공유 / 그룹 결과
| 메서드 | endpoint | 인증 | 비고 |
|---|---|---|---|
| GET  | `/api/v1/tournaments/{id}/invite-preview?inviteCode=XXX` | 불필요 | 코드 검증 + 미리보기 |
| POST | `/api/v1/tournaments/{id}/join` | JWT (GUEST/MEMBER) | 회원 참여 |
| POST | `/api/v1/tournaments/{id}/join/guest` | 불필요 | 비회원 게스트 계정 생성 + 참여 |
| POST | `/api/v1/tournaments/{id}/play-link` | JWT (소유자) | 플레이 링크 생성 (만료 14일 고정) |
| GET  | `/api/v1/tournaments/{id}/play-link-info` | 불필요 | 플레이 링크 정보 |
| POST | `/api/v1/tournaments/{sourceId}/from-play-link` | JWT | 플레이 링크로 복제 토너먼트 생성 |
| GET  | `/api/v1/tournaments/{id}/group-result` | JWT | 그룹 결과 조회 |

### User
| 메서드 | endpoint | 인증 | 비고 |
|---|---|---|---|
| GET   | `/api/v1/users/me` | JWT | 코드에서 직접 호출 중. `ENDPOINTS` 상수 누락 |
| PATCH | `/api/v1/users/me` | JWT (GUEST 포함) | 닉네임 수정 |
| GET   | `/api/v1/users/nickname/check?nickname=XXX` | JWT | 닉네임 중복 체크 (최대 10자) |

### Notification
| 메서드 | endpoint | 인증 | 비고 |
|---|---|---|---|
| GET | `/api/v1/notifications/subscribe` | JWT | SSE 실시간 알림 스트림 |

---

## 2. 각 endpoint 상세 + 클라이언트 적용

### 2.1 GET `/tournaments/{id}/invite-preview`

#### 명세
- query: `inviteCode?: string` — 코드 입력 경로에서만 전달, 직접 링크 진입은 생략
- 응답
  ```json
  {
    "tournamentId": 1,
    "tournamentName": "내 토너먼트",
    "itemCount": 8,
    "participantCount": 2
  }
  ```
- 실패: 만료된 초대 → 400, 코드 불일치 → 400

#### 적용 위치
- `apps/web/src/app/home/_components/invite-code-dialog/InviteCodeDialog.tsx`
- 현재: `verifyInviteCode(code)` 로컬 mock
- 변경: 코드만으로는 토너먼트를 못 찾으므로 **초대 링크에 tournamentId 가 함께 들어와야 함** (예: `piki.today/invite/{tournamentId}?code=ABC123`)
  - 디자인상 코드 6자만 입력하는 UX 라 백엔드/디자인과 한 번 합의 필요
  - 임시 대안: 본인 토너먼트 리스트에서 `inviteCode` 매칭으로 우회

#### 신규 작업
- `apps/web/src/app/tournament/join/_apis/getInvitePreview.ts`
- `useGetInvitePreview` 훅
- 응답 타입 `GetInvitePreviewResponseT` → `src/types/tournament.ts` 또는 `_types/tournament.ts`
- 현재 `mocks/tournamentPreview.ts` 삭제

---

### 2.2 POST `/tournaments/{id}/join`

#### 명세
- body
  ```ts
  type JoinTournamentRequest = {
    inviteCode?: string | null; // pattern: [A-Z]{3}\d{3}
  };
  ```
- 응답 데이터: `null`
- JWT 필요 (GUEST/MEMBER 모두 허용)
- 실패: 만료/이미 참여 → 409, 코드 불일치 → 400

#### 적용 위치
- `apps/web/src/app/tournament/join/_components/InviteClient.tsx`
- 현재: `getMe` → identityType 분기 후 `getTournamentList` 첫 ID 로 라우팅 (mock)
- 변경: identityType 분기 후 `join` 호출 → 응답은 `null` 이라 후속 라우팅은 `/tournament/{tournamentId}/create` 로 (path 의 tournamentId 그대로 사용)

#### 신규 작업
- `apps/web/src/app/tournament/join/_apis/postJoin.ts`
- `usePostJoin` (mutation)

---

### 2.3 POST `/tournaments/{id}/join/guest`

#### 명세
- body
  ```ts
  type JoinTournamentAsGuestRequest = {
    inviteCode?: string | null;
    nickname: string; // maxLength: 10, required
  };
  ```
- 응답
  ```json
  {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "userId": "uuid",
    "nickname": "멋진친구",
    "profileImage": "https://...",
    "tournamentId": 1
  }
  ```
- 인증 불필요, 응답으로 토큰 쌍 발급

#### 적용 위치
- `apps/web/src/app/tournament/join/[id]/_components/JoinPreviewClient.tsx`
- 현재: `getTournamentList` 첫 ID 로 라우팅 (mock) + `setJoinWelcome` sessionStorage
- 변경: `/join/guest` 호출 → 토큰 저장(쿠키 기반이면 자동, 아니면 axios client 갱신) → `/tournament/{tournamentId}/create`

#### 신규 작업
- `apps/web/src/app/tournament/join/_apis/postJoinGuest.ts`
- `usePostJoinGuest` (mutation)
- 토큰 저장 처리 — 현재 `auth/guest` 응답이 HttpOnly 쿠키로 내려옴. `/join/guest` 도 동일하게 쿠키 기반이면 별도 클라 작업 없음. 응답 body 의 `accessToken` 사용이 fallback 인지 확인 필요.

---

### 2.4 GET `/users/nickname/check`

#### 명세
- query: `nickname: string` (required, maxLength 10)
- 응답: `{ available: boolean }`
- 본인의 현재 닉네임은 자동 통과 (서버에서 처리)

#### 적용 위치
- `apps/web/src/app/tournament/join/[id]/_components/JoinPreviewClient.tsx`
- 닉네임 input `onBlur` 또는 디바운스 후 호출 → 결과에 따라 헬퍼/CTA 비활성

#### 신규 작업
- `apps/web/src/apis/getNicknameCheck.ts`
- `useGetNicknameCheck(debouncedNickname)` 훅 (옵션: `enabled` 로 debounce 결과 활용)

---

### 2.5 PATCH `/users/me`

#### 명세
- body: `{ nickname: string }` (현재는 nickname 만)
- 응답: 수정된 `UserT`
- GUEST 도 호출 가능

#### 적용 위치
- **분담 정리 필요**
  - `join/guest` 가 닉네임을 받음 → 게스트 계정 신규 생성 시점에 닉네임 확정
  - `PATCH /users/me` → 이미 게스트/회원 인 사용자의 닉네임 변경 (마이페이지 등)
- 현재 PR 범위에서는 `JoinPreviewClient` 의 닉네임 수정은 `join/guest` body 로 전달하면 됨
- `PATCH /users/me` 는 별도 마이페이지 PR 로 분리해도 OK

#### 신규 작업 (별도 PR 가능)
- `apps/web/src/apis/patchMe.ts`
- `usePatchMe` (mutation)
- 성공 시 `['me']` 쿼리 invalidate

---

### 2.6 POST `/tournaments/{id}/play-link`

#### 명세
- body 없음
- 응답: `string` (ISO datetime, `playLinkExpiresAt`)
- 소유자(`isOwner`) 만 호출, 만료 14일 고정, 이미 있으면 갱신
- 실패: COMPLETED 아님 → 409

#### 적용 위치
- `apps/web/src/app/tournament/[id]/result/_components/plate-share-dialog/PlateShareDialog.tsx`
- 현재: `plateUrl` 더미 (`https://piki.today/tournament/{id}/plate`)
- 변경: 다이얼로그 오픈 시 또는 `플레이 링크 보내기` 클릭 시 호출 → URL 생성 → share API 전달
  - URL 형식: 디자인/백엔드 합의 필요 (예: `piki.today/play/{tournamentId}` — sourceTournamentId 기반)

#### 신규 작업
- `apps/web/src/app/tournament/[id]/result/_apis/postPlayLink.ts`
- `usePostPlayLink(tournamentId)` (mutation)

---

### 2.7 GET `/tournaments/{id}/play-link-info`

#### 명세
- 인증 불필요
- 응답
  ```json
  {
    "sourceTournamentId": 1,
    "tournamentName": "내 토너먼트",
    "itemCount": 8,
    "playLinkExpiresAt": "2026-06-09T22:00:00"
  }
  ```
- 실패: 만료/없음 → 404

#### 적용 위치
- 친구가 플레이 링크로 진입한 화면에서 사용
- 현재 PR 범위 외 (별도 진입점 화면 필요)

#### 신규 작업 (후속)
- 라우트 추가: `apps/web/src/app/play/[id]/page.tsx` 또는 `/tournament/play/[id]` (백엔드 URL 컨벤션과 합의)
- `getPlayLinkInfo.ts` + `useGetPlayLinkInfo` 훅
- 진입 화면: 토너먼트 정보 표시 + `토너먼트 시작하기` → `/tournaments/{sourceId}/from-play-link` 호출

---

### 2.8 POST `/tournaments/{sourceTournamentId}/from-play-link`

#### 명세
- body 없음
- 응답: `number` (새로 생성된 tournamentId)
- 응답 토너먼트는 PENDING 상태로 아이템 복사 완료, 바로 시작 가능

#### 적용 위치
- 2.7 의 후속 — 친구가 `토너먼트 시작하기` 클릭 시
- 응답 tournamentId 로 `/tournament/{newId}/create` 라우팅 (아이템 이미 차있으므로 곧바로 진행 가능)

#### 신규 작업 (후속)
- `apps/web/src/app/play/[id]/_apis/postFromPlayLink.ts`
- `usePostFromPlayLink(sourceTournamentId)` (mutation)

---

### 2.9 GET `/tournaments/{id}/group-result`

#### 명세
- JWT 필요
- 응답
  ```json
  {
    "items": [
      {
        "rank": 1,
        "itemId": 10,
        "name": "...",
        "price": 129000,
        "currency": "KRW",
        "imageUrl": "https://...",
        "chosenBy": [
          { "userId": "...", "nickname": "...", "profileImage": "..." }
        ]
      }
    ]
  }
  ```
- 원본 + 플레이 링크 복제본 모두 합쳐서 비교

#### 적용 위치
- `apps/web/src/app/tournament/[id]/result/_components/ResultClient.tsx`
- 조건: `tournamentData.completed.hasGroupResult === true` (참여자 2명 이상)
- 진입점: 결과 화면 상단/하단에 `친구 토너먼트 결과 보기` 버튼 노출 (디자인 합의 필요)

#### 신규 작업
- `apps/web/src/app/tournament/[id]/result/_apis/getGroupResult.ts`
- `useGetGroupResult(tournamentId)` 훅 (조건부 enabled)
- 그룹 결과 화면 컴포넌트 — 디자인 시안 필요

---

### 2.10 GET `/notifications/subscribe` (SSE)

#### 명세
- `text/event-stream` 으로 응답 (ApiResponseBody 래퍼 없음)
- 이벤트
  - `connect`: 구독 직후 1회 (`data="connected"`)
  - `notification`: `NotificationSsePayload` JSON
    ```ts
    type NotificationSsePayload = {
      id: number;
      type: 'TOURNAMENT_JOINED' | 'TOURNAMENT_ITEM_ADDED' | 'ITEM_PARSING_COMPLETED' | 'ITEM_PARSING_FAILED';
      title: string;
      body: string;
      refId: number; // 딥링크 분기용
    };
    ```
  - 15초 간격 하트비트
- 30분 후 타임아웃 → 클라 재연결 필요

#### 적용 위치 (검토)
- `apps/web/src/components/Providers.tsx` 또는 전역 layout
- 인증 유저 확인 후 EventSource 연결 → 이벤트별로 `queryClient.invalidateQueries(['tournament', refId])` 등 처리
- 30초 polling 과 중복 가능 → polling 정책 함께 합의

#### 신규 작업 (후속, 별도 PR 권장)
- `apps/web/src/hooks/useNotificationStream.ts`
- 재연결 로직 (지수 백오프), 탭 visibility 처리
- `queryClient` 기반 캐시 무효화

---

## 3. mock / 임시 코드 정리 체크리스트

API 연동 완료 시 일괄 제거 또는 정리:

- [ ] `apps/web/src/mocks/participants.ts`
- [ ] `apps/web/src/mocks/tournamentPreview.ts`
- [ ] `apps/web/src/mocks/deposit.ts` (`MOCK_DEPOSIT_DURATION_MS = 60_000`)
- [ ] `apps/web/src/app/tournament/[id]/create/_apis/getTournament.ts` 의 `withMockParticipants` 헬퍼
- [ ] `apps/web/src/app/tournament/join/_utils/verifyInviteCode.ts` (정답 `111111` 하드코딩, 형식 패턴 등 전체)
- [ ] `apps/web/src/app/tournament/join/_utils/joinSession.ts` 의 `markAsParticipant` / `isParticipantOf` / `PARTICIPANT_KEY` (서버 `isOwner` 로 대체)
- [ ] `consumeJoinWelcomeFor` / `consumeJoinConfirmFor` (참여 직후 다이얼로그 노출용) — 유지 여부 결정
- [ ] 친구 초대 URL 더미 `https://piki.today/invite/temp` (`MOCK_INVITE_URL` 위치)
- [ ] 플레이 링크 URL 더미 `https://piki.today/tournament/{id}/plate`

---

## 4. UI 누락 / 시안 대비 미구현 (#139 / #140 작업 잔여)

- [ ] **친구 초대 다이얼로그 만료 시간 동적 표시** — `tournamentData.pending.inviteExpiresAt`
- [ ] **친구 초대 '변경' 버튼** — 만료 시간 변경 다이얼로그 (정책: 30분 기본 / 최대 24시간, `inviteDurationMinutes` 파라미터)
- [ ] **친구 초대 인원 정책 점검** — 안내 텍스트 `최대 7명까지 초대할 수 있어요` ↔ 정책(최대 8명) 일치 여부 확인
- [ ] **결과 공유 다이얼로그 만료 시간 표시** — `playLinkExpiresAt`. 서버 정책상 14일 고정이라 '변경' 버튼 디자인 재확인 필요
- [ ] **이미지 공유** — 영수증 하단 `이미지 공유` placeholder (Web Share API file 또는 html2canvas)
- [ ] **빈 슬롯 SVG (담기 종료 후)** — `EmptyBasketSlot.tsx` 디자이너 SVG 적용

---

## 5. 의존성 / 합의 필요 사항

- **초대 링크 URL 구조** — 코드만으로는 토너먼트 못 찾으므로 `piki.today/invite/{tournamentId}?code=XXX` 형태 합의 필요. UX 상 코드 입력 다이얼로그가 별도로 있으니, **링크 진입** vs **수동 코드 입력** 두 경로의 URL 정책 정리 필요.
- **플레이 링크 URL 구조** — `piki.today/play/{sourceTournamentId}` 가 자연스러움. 디자인 + 백엔드 합의.
- **닉네임 발급 책임** — `join/guest` 는 닉네임을 받는데, 게스트 발급은 `auth/guest` 가 따로 함. 두 흐름 분담:
  - 비회원이 코드 입력 → 닉네임 페이지 → `join/guest` (계정 + 참여 동시)
  - 일반 회원 가입 → `auth/guest` (자동 닉네임) → 이후 `PATCH /users/me` 로 수정
- **SSE vs polling** — 현재 30초 polling 적용 중. SSE 도입 시 polling 제거 가능. 정책 합의.
- **그룹 결과 화면 디자인** — Figma 에 시안 있는지 확인 필요.

---

## 6. 작업 순서 제안

1. **타입 + ENDPOINTS 상수 정리** (consts/api.ts 누락 endpoint 추가, 타입 정의 일괄)
2. **`invite-preview` + 회원 join** (가장 짧은 흐름, sessionStorage 패턴 살아있어 영향 적음)
3. **`join/guest`** (토큰 처리 함께)
4. **`nickname/check`** (닉네임 페이지에 인라인)
5. **`isOwner` 분기 교체** (`isParticipantOf` 제거)
6. **`play-link` 생성/공유** (`PlateShareDialog` 연동)
7. **mock / 임시 코드 정리** (한 번에 청소)
8. **(별도 PR)** `play-link-info` + `from-play-link` 진입 흐름
9. **(별도 PR)** `group-result` 화면
10. **(별도 PR)** SSE 도입 검토
