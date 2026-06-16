'use client';

import TrophyIconFill from '@/assets/icons/fill/trophy.svg';
import BottomTabBar from '@/components/bottom-tab-bar';
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

function TournamentHistoryContent() {
  const { tournamentListData } = useGetTournamentList();

  if (tournamentListData.length === 0) {
    return (
      <>
        <main className="flex flex-1 flex-col items-center justify-center gap-3 pb-24">
          <TrophyIconFill width={32} height={32} className="text-gray-200" />
          <p className="body-1-semibold text-text-neutral-tertiary">
            아직 진행한 토너먼트가 없어요
          </p>
        </main>
        <div className="fixed bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          <BottomTabBar />
        </div>
      </>
    );
  }

  return (
    <main className="hide-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto pb-24">
      {tournamentListData.map(tournament => (
        <TournamentCard
          key={tournament.tournamentId}
          tournamentId={tournament.tournamentId}
          status={tournament.status}
          name={tournament.name}
          date={tournament.createdAt.slice(0, 10).replaceAll('-', '/')}
          users={toUsers(tournament.participantProfileImages)}
          participantCount={tournament.participantProfileImages.length}
        />
      ))}
    </main>
  );
}

export default TournamentHistoryContent;
