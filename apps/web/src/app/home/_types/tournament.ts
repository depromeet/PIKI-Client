export type PostCreateTournamentRequestT = {
  name: string;
  /** 초대 마감까지 남은 분 단위 시간 (1~1440). 미지정 시 서버 기본값 사용. */
  inviteDurationMinutes?: number;
};

export type PostCreateTournamentResponseT = {
  tournamentId: number;
};
