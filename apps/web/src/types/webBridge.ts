import type { CLIENT_TYPE } from '@/consts/webBridge';

/** 접속할 수 있는 클라이언트 환경 */
export type ClientTypeT = (typeof CLIENT_TYPE)[keyof typeof CLIENT_TYPE];
