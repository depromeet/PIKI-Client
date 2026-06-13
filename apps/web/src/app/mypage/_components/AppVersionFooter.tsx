import { ShoppingBagIconFill } from '@/assets/icons';

import { APP_VERSION_LABEL } from '../_consts/mypage';

function AppVersionFooter() {
  return (
    <div className="flex h-5 items-center gap-2 pl-5">
      <ShoppingBagIconFill className="size-5 shrink-0 text-text-neutral-tertiary" aria-hidden />
      <p className="body-2-medium text-text-neutral-tertiary">{APP_VERSION_LABEL}</p>
    </div>
  );
}

export default AppVersionFooter;
