import { ROUTES } from '@/consts/route';

export const isValidLoginRedirectPath = (
  path: string | null | undefined
): path is string => !!path && path.startsWith('/') && !path.startsWith('//');

export const getLoginRedirectPath = (path: string | null | undefined): string => {
  if (isValidLoginRedirectPath(path)) return path;
  return ROUTES.HOME;
};

export const getLoginPath = (redirectPath: string | null | undefined): string => {
  if (!isValidLoginRedirectPath(redirectPath)) return ROUTES.LOGIN;

  const searchParams = new URLSearchParams({ redirect: redirectPath });
  return `${ROUTES.LOGIN}?${searchParams.toString()}`;
};
