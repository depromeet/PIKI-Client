import Link from 'next/link';

function DesignSystemPage() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-y-auto p-4">
      <h1 className="mb-10 text-2xl font-bold">Design System</h1>
      <LinkItem href="/design-system/color">Color</LinkItem>
      <LinkItem href="/design-system/typography">Typography</LinkItem>
      <LinkItem href="/design-system/image">Image / Skeleton UI</LinkItem>
      <LinkItem href="/design-system/button">Button</LinkItem>
      <LinkItem href="/design-system/input">Input</LinkItem>
      <LinkItem href="/design-system/toast">Toast</LinkItem>
      <LinkItem href="/design-system/icon">Icons</LinkItem>
    </div>
  );
}

export default DesignSystemPage;

const LinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="w-full rounded-md bg-black py-4 text-center text-white">
      {children}
    </Link>
  );
};
