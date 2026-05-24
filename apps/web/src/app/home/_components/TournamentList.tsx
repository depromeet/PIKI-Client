'use client';

import TournamentCard from '@/components/common/tournament-card';
import { TOURNAMENT_STATUS } from '@/consts/tournament';
import { MOCK_USERS } from '@/mocks/users';

import { useGetTournamentList } from '../_hooks/useGetTournamentList';

function TorunamentList() {
  const { data } = useGetTournamentList([TOURNAMENT_STATUS.PENDING, TOURNAMENT_STATUS.IN_PROGRESS]);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="heading-2 text-black">진행 중인 토너먼트</h2>

      {data.map(tournament => (
        <TournamentCard
          key={tournament.tournamentId}
          state="adding" // TODO: 상태에 따라 변경
          name={tournament.name}
          date={tournament.createdAt}
          users={MOCK_USERS} // TODO: 유저 목록에 따라 변경
        />
      ))}
    </section>
  );
}

export default TorunamentList;
