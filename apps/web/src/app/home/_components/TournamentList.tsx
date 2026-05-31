'use client';

import TournamentCard from '@/components/common/tournament-card';
import type { UserT } from '@/components/common/user-profile-group/userProfile.const';
import { TOURNAMENT_STATUS } from '@/consts/tournament';

import { useGetTournamentList } from '../_hooks/useGetTournamentList';

// TODO: 백엔드가 정식 프사 처리 도입 시 imageUrl 반영
const toUsers = (imageUrls: string[]): UserT[] =>
  imageUrls.map((_, index) => ({
    id: index,
    profileType: index % 2 === 0 ? 'blue' : 'yellow',
  }));

function TorunamentList() {
  const { tournamentListData } = useGetTournamentList([
    TOURNAMENT_STATUS.PENDING,
    TOURNAMENT_STATUS.IN_PROGRESS,
  ]);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="heading-2 text-black">진행 중인 토너먼트</h2>

      {tournamentListData.map(tournament => (
        <TournamentCard
          key={tournament.tournamentId}
          state={tournament.status}
          name={tournament.name}
          date={tournament.createdAt.slice(0, 10).replaceAll('-', '/')}
          users={toUsers(tournament.participantProfileImages)}
        />
      ))}
    </section>
  );
}

export default TorunamentList;
