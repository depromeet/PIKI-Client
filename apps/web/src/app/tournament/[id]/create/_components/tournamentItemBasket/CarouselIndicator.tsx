import { cn } from '@/utils/cn';

type CarouselIndicatorProps = {
  totalCount: number;
  currentIndex: number;
  onSelect: (index: number) => void;
};

function CarouselIndicator({ totalCount, currentIndex, onSelect }: CarouselIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalCount }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i + 1}번째 장바구니`}
          onClick={() => onSelect(i)}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            i === currentIndex ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'
          )}
        />
      ))}
    </div>
  );
}

export default CarouselIndicator;
