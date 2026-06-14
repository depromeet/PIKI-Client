import Link from 'next/link';

type NotificationItemProps = {
  profileImage?: string;
  message: string;
  time: string;
  href: string | null;
};

function NotificationItem({ profileImage, message, time, href }: NotificationItemProps) {
  const innerContent = (
    <>
      <div className="size-8 shrink-0 overflow-hidden rounded-full bg-blue-200">
        {profileImage && <img src={profileImage} alt="" className="size-full object-cover" />}
      </div>
      <div className="flex flex-col gap-1">
        <p className="body-1-semibold text-text-neutral-secondary">{message}</p>
        <span className="caption-1-regular text-text-neutral-tertiary">{time}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <li>
        <Link href={href} className="flex items-center gap-3 py-5">
          {innerContent}
        </Link>
      </li>
    );
  }

  return <li className="flex items-center gap-3 py-5">{innerContent}</li>;
}

export default NotificationItem;
