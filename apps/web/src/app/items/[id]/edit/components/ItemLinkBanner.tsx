import { ChevronForwardIconFill, LinkIconFill } from '@/assets/icons';

type ItemLinkBannerProps = {
  href: string;
  label: string;
};

function ItemLinkBanner({ href, label }: ItemLinkBannerProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center gap-4 rounded-xl bg-gray-50 px-4 py-3 transition-colors active:bg-gray-100"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bg-layer-default">
        <LinkIconFill className="size-6 text-icon-neutral-primary" />
      </span>
      <span className="flex-1 truncate body-2-semibold text-text-neutral-secondary">{label}</span>
      <ChevronForwardIconFill className="size-6 shrink-0 text-icon-neutral-secondary" />
    </a>
  );
}

export default ItemLinkBanner;
