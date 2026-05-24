'use client';

import { useGetTournamentList } from '../_hooks/useGetTournamentList';

function TorunamentList() {
  const { data } = useGetTournamentList(['IN_PROGRESS']);

  return (
    <div>
      <h1>진행 중인 토너먼트</h1>
      {data.map(tournament => (
        <div key={tournament.tournamentId}>
          <h3>{tournament.name}</h3>
          <p>{tournament.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TorunamentList;
