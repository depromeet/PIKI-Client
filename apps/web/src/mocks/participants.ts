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
