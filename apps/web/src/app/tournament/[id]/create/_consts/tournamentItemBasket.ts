import img01 from '../_assets/img01.png';
import img02 from '../_assets/img02.png';
import img03 from '../_assets/img03.png';
import img04 from '../_assets/img04.png';
import img05 from '../_assets/img05.png';
import img06 from '../_assets/img06.png';

export const ITEMS_PER_BASKET = 8;
export const BASKET_COUNT = 4;

export const EMPTY_BASKET_IMAGES = [img01, img02, img03, img04, img05, img06];

/** 아이템 개수에 따른 활성 장바구니 수 (최대 BASKET_COUNT) */
export const getActiveBasketCount = (itemCount: number) => {
  if (itemCount === 0) return 1;

  const filledBaskets = Math.ceil(itemCount / ITEMS_PER_BASKET);
  const isLastBasketFull = itemCount % ITEMS_PER_BASKET === 0;

  if (isLastBasketFull) return Math.min(BASKET_COUNT, filledBaskets + 1);

  return Math.min(BASKET_COUNT, filledBaskets);
};
