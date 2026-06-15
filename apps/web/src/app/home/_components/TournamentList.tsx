'use client';

import TournamentCard from '@/components/tournament-card';
import type { UserT } from '@/components/user-profile-group/userProfile.const';
import { useGetTournamentList } from '@/hooks/useGetTournamentList';

// 비회원(GUEST)은 서버가 dicebear 자동 아바타를 내려주는데,
// 디자인상 비회원은 기본 SVG 프로필을 노출하므로 무시한다.
const isGeneratedAvatar = (url: string) => url.includes('api.dicebear.com');
const toUsers = (imageUrls: string[]): UserT[] =>
  imageUrls.map((url, index) => ({
    id: index,
    profileType: index % 2 === 0 ? 'blue' : 'yellow',
    ...(isGeneratedAvatar(url) ? {} : { imageUrl: url }),
  }));

function TorunamentList() {
  const { tournamentListData } = useGetTournamentList();

  if (tournamentListData.length === 0) return null;

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
