type FormatPriceOptions = {
  withSuffix?: boolean;
};

const formatPrice = (raw: string, { withSuffix = true }: FormatPriceOptions = {}) => {
  const digits = raw.replace(/[^\d]/g, '');
  if (digits.length === 0) return '';
  const withComma = Number(digits).toLocaleString('ko-KR');
  return withSuffix ? `${withComma}원` : withComma;
};

export default formatPrice;
