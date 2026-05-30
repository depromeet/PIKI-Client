import Image from 'next/image';

import ImageIconOutline from '@/assets/icons/outline/image.svg';

type WishCardProps = {
  name: string;
  price: number;
  imageUrl?: string;
};

function WishCard({ name, price, imageUrl }: WishCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white">
      {/* 이미지 */}
      <div className="relative flex h-[143px] items-center justify-center self-stretch bg-white">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-200">
            <ImageIconOutline width={40} height={40} />
          </div>
        )}
      </div>

      {/* 상품명 + 가격 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 self-stretch px-3 py-3">
        <p className="self-stretch text-center body-1-medium text-gray-600">{name}</p>
        <p className="heading-2 text-gray-950">{price.toLocaleString()}원</p>
      </div>
    </div>
  );
}

export default WishCard;
