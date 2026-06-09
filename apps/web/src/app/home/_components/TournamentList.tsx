'use client';

import TournamentCard from '@/components/tournament-card';
import type { UserT } from '@/components/user-profile-group/userProfile.const';
import { useGetTournamentList } from '@/hooks/useGetTournamentList';

// TODO: 백엔드가 정식 프사 처리 도입 시 imageUrl 반영
const toUsers = (imageUrls: string[]): UserT[] =>
  imageUrls.map((_, index) => ({
    id: index,
    profileType: index % 2 === 0 ? 'blue' : 'yellow',
  }));

function TorunamentList() {
  const { tournamentListData } = useGetTournamentList();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="heading-2 text-black">진행 중인 토너먼트</h2>

      {tournamentListData.map(tournament => (
        <TournamentCard
          key={tournament.tournamentId}
          tournamentId={tournament.tournamentId}
          status={tournament.status}
          name={tournament.name}
          date={tournament.createdAt.slice(0, 10).replaceAll('-', '/')}
          users={toUsers(tournament.participantProfileImages)}
        />
      ))}
    </section>
  );
}

export default TorunamentList;
