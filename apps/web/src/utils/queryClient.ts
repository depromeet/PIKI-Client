import { QueryClient, environmentManager } from '@tanstack/react-query';

/** REF: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr */

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (environmentManager.isServer()) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();

  return browserQueryClient;
};
