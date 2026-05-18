import ProductImageSection from './_components/ProductImageSection';
import SkeletonSection from './_components/SkeletonSection';

function ImageDocsPage() {
  return (
    <div className="mx-auto flex max-w-[min(100%,960px)] flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-[28px] leading-[1.334] font-bold tracking-[-0.78px] text-black sm:text-[36px] sm:tracking-[-0.972px]">
          Image / Skeleton UI
        </h1>
      </header>
      <ProductImageSection />
      <SkeletonSection />
    </div>
  );
}

export default ImageDocsPage;
