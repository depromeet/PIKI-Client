# 프로젝트 명세서 (spec.md)

## 1. 사용자 역할 (User Roles)

- **멤버 (Member):** SNS(소셜) 로그인을 완료한 정식 사용자. 계정 정보와 데이터가 영구적으로 보존되며, 보관함(`/archive`)을 포함한 서비스의 모든 기능을 제한 없이 이용할 수 있다.
- **게스트 (Guest):** SNS 로그인 없이 서비스를 이용하는 임시 사용자. 토너먼트 참여 및 권한 검증을 위해 **일회성(임시) 토큰**을 발급받아 활동한다. 브라우저 세션이 만료되거나 쿠키/로컬 스토리지가 삭제되면 이전 기록에 접근할 수 없다.

## 2. 페이지 접근 권한 및 구조 (Routes & Access Control)

### 2.1 비인증 / 퍼블릭 영역 (Public / Unauthenticated)

게스트/멤버 토큰 등 아무런 인증 정보가 없는 사용자도 제한 없이 접근할 수 있는 페이지입니다.

- `/` : 메인 페이지
- `/login` : 로그인 페이지

### 2.2 멤버 및 게스트 공통 영역 (Member & Guest)

최소 게스트 토큰 또는 멤버 토큰을 보유한 사용자가 접근 가능한 페이지입니다. (인증 정보가 없다면 접근 시점에 임시 게스트 토큰이 발급되거나 적절한 처리가 이루어집니다.)

### 2.2 공통 / 퍼블릭 영역 (Everyone)

멤버와 게스트 권한을 가진 모든 사용자가 접근 가능한 페이지입니다.

- `/home` : 메인 홈
- `/tournament/join` : 홈에서 토너먼트 초대 코드를 입력해 토너먼트에 합류하는 화면
- `/tournament/join/[id]` : 초대 링크를 통해 접속하여 토너먼트에 합류하는 화면 (닉네임 입력)

### 2.3 보관함 및 위시리스트 영역 (Member Only)

로그인한 멤버만 접근할 수 있는 영역입니다.

- `/archive` : 보관함 메인 (토너먼트 기록 및 위시 저장 내역 확인)
  - `?type=tournament` : 토너먼트 기록 필터링
  - `?type=wish` : 위시 저장 내역 필터링
- `/archive/wish/[id]` : 위시리스트 아이템 수정 페이지

### 2.4 토너먼트 영역 (Authorized Guest or Member)

해당 토너먼트에 권한이 부여된 (게스트 또는 멤버)만 접근 가능한 하위 경로입니다.

- `/tournament/[id]/create` : 토너먼트 준비 페이지
- `/tournament/[id]/create/by-wish` : 위시리스트에서 토너먼트 후보 담기
- `/tournament/[id]/item/[itemId]` : 토너먼트 후보 수정
- `/tournament/[id]/loading` : 토너먼트 준비에서 진행으로 넘어가는 로딩 페이지
- `/tournament/[id]/match` : 토너먼트 진행 과정 페이지
- `/tournament/[id]/result` : 토너먼트 결과 페이지

## 3. 인증 및 인가 전략 (Auth & Authorization Strategy)

접속 환경(Web/App)에 따라 인증 토큰 구조를 다르게 처리하며, 권한 검증은 미들웨어(또는 서버 단)에서 수행한다.

- **환경 식별:**
  - 요청 헤더의 `X-Client-Type`을 통해 웹(Web)과 앱(App) 접속 환경을 구분한다.
- **인증 (Authentication) 및 토큰 처리:**
  - **웹 (Web) 환경:**
    - 로그인 및 토큰 발급 시 JWT(`access_token`, `refresh_token`)를 `HttpOnly` 쿠키로 내려준다. (멤버와 게스트 동일)
  - **앱 (App) 환경:**
    - 로그인 및 토큰 발급 시 JWT(`access_token`, `refresh_token`)를 **응답 바디(Response Body)**로 내려준다.
    - 앱 환경에서는 이후 모든 API 요청 시 `Authorization: Bearer <token>` 헤더를 이용해서 토큰을 전송한다.
    - _사유:_ 앱 네이티브 단에서의 토큰 활용 및 웹뷰(Webview) 통신 시 원활한 토큰 전달과 관리를 위함.
