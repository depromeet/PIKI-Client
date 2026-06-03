export type TournamentPreviewT = {
  name: string;
  itemCount: number;
  participantCount: number;
};

/**
 * 초대 참여 화면 프리뷰 (mock).
 * API 연동 후 `getTournamentPreview(id)` 응답으로 교체.
 */
export const MOCK_TOURNAMENT_PREVIEW: TournamentPreviewT = {
  name: '봄 아우터 고르기',
  itemCount: 3,
  participantCount: 4,
};
