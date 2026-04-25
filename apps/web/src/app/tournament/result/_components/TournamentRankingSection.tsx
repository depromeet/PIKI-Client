import Image from 'next/image';
import Link from 'next/link';

import bronzeMedalImage from '@/assets/images/tournament/medal-bronze.svg';
import silverMedalImage from '@/assets/images/tournament/medal-silver.svg';

type RankingItemT = {
  medalImage: typeof silverMedalImage;
  medalLabel: string;
  name: string;
  price: string;
};

const rankingItems: RankingItemT[] = [
  {
    medalImage: silverMedalImage,
    medalLabel: '2등 메달',
    name: '다이슨 온트랙 노이즈 캔슬링 헤드폰',
    price: '699,000원',
  },
  {
    medalImage: bronzeMedalImage,
    medalLabel: '3등 메달',
    name: '유닉스 미니 고데기',
    price: '42,000원',
  },
];

function TournamentRankingSection() {
  return (
    <section className="flex flex-col gap-[19px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] leading-snug font-bold tracking-[-0.506px] text-[#171719]">토너먼트 순위</h2>
        <Link className="text-[12px] leading-[20px] font-medium tracking-[-0.1504px] text-[#737373]" href="#">
          대진표 보기
        </Link>
      </div>
      <div className="flex flex-col gap-[12px]">
        {rankingItems.map(rankingItem => (
          <article className="rounded-[14px] bg-[#f9fafb] px-[16px] py-[16px]" key={rankingItem.name}>
            <div className="flex items-center gap-[12px]">
              <Image alt={rankingItem.medalLabel} height={26} src={rankingItem.medalImage} width={27} />
              <div className="flex flex-col justify-center">
                <p className="text-[14px] leading-[20px] font-semibold tracking-[-0.1504px] text-[#1a1a1a]">
                  {rankingItem.name}
                </p>
                <p className="text-[12px] leading-[20px] font-semibold tracking-[-0.1504px] text-[#787878]">
                  {rankingItem.price}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TournamentRankingSection;
