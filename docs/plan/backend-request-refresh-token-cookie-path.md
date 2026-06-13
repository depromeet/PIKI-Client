# [요청] refresh_token 쿠키 Path 변경

## 요청

`refresh_token` 쿠키 `Path`를 `/api/v1/auth` → `/` 로 변경 부탁드립니다.

## 이유

프론트는 페이지 진입 전 `proxy`(middleware)에서 access 만료 시 refresh로 세션을 복구하는 구조입니다.

근데 `refresh_token`이 `Path=/api/v1/auth`라서 `/archive`, `/home` 같은 **일반 페이지 요청에 쿠키가 안 실립니다.**

그래서 proxy가 refresh 가능 여부를 판단할 수 없고:

- `/archive` → refresh 있는데도 로그인으로 튕김
- `/home` → refresh 있는데 guest login으로 덮일 수 있음

proxy가 refresh API를 직접 호출해도, 페이지 요청 쿠키에 refresh_token이 없어서 백엔드까지 전달이 안 됩니다.

## 변경 후 기대 동작

- access 만료 + refresh 유효 → proxy에서 무음 refresh → 페이지 정상 진입
- refresh 없음/실패 → 기존 정책대로 로그인 or guest login

## 보안

`Path=/`로 바꿔도 `HttpOnly` + `Secure` + `SameSite` + refresh rotation 유지되면 일반적인 방식입니다. Path 제한만으로 refresh를 안전하게 막는 건 아니라서, SSR 선복구를 위해 Path 완화가 필요합니다.

## 프론트 상태

proxy refresh 로직은 이미 구현돼 있고, **쿠키 Path만 바뀌면 동작 가능**합니다.
