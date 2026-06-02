import type { TournamentParticipantT } from '@/app/tournament/[id]/_common/_types/tournamentResponse';
import type { UserT } from '@/components/common/user-profile-group/userProfile.const';

export type MockParticipantT = {
  user: UserT;
  itemCount: number;
};

export const MOCK_PARTICIPANTS: MockParticipantT[] = [
  { user: { id: 'me', name: '나', profileType: 'blue' }, itemCount: 2 },
  { user: { id: 2, name: '지친 루피', profileType: 'yellow' }, itemCount: 2 },
  { user: { id: 3, name: '키티', profileType: 'blue' }, itemCount: 1 },
  { user: { id: 4, name: '행복한 토끼', profileType: 'yellow' }, itemCount: 2 },
  { user: { id: 5, name: '강쥐', profileType: 'blue' }, itemCount: 1 },
];

/** API 응답 머지용 — 친구 여부 판단을 위해 임시로 주입 */
export const MOCK_TOURNAMENT_PARTICIPANTS: TournamentParticipantT[] = MOCK_PARTICIPANTS.map(p => ({
  userId: String(p.user.id),
  nickname: p.user.name ?? '익명',
  profileImage: '',
}));
