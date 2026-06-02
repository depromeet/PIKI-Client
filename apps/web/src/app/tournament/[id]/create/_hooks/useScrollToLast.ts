import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useScrollToLast = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scrollToLast = searchParams.get('scrollToLast') === 'true';

  const handleScrolled = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('scrollToLast');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return { scrollToLast, onScrolled: handleScrolled };
};
