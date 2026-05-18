import PhotoIconFill from '@/assets/icons/fill/photo.svg';

export function LgErrorFallback() {
  return (
    <div className="flex flex-col items-center gap-3">
      <PhotoIconFill width={48} height={48} aria-hidden />
      <p className="heading-2 text-gray-300">이미지가 비어 있어요</p>
      <button className="body-2-medium text-gray-600 underline underline-offset-2">
        직접 가져오기
      </button>
    </div>
  );
}
