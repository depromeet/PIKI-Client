import type { ConfigContext, ExpoConfig } from 'expo/config';

const LOCAL_GOOGLE_SERVICES_INFO_PLIST = './GoogleService-Info.plist';
const LOCAL_GOOGLE_SERVICES_JSON = './google-services.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, slug } = config;

  if (!name || !slug) throw new Error('app.json에 name과 slug가 필요합니다.');

  return {
    ...config,
    name,
    slug,
    ios: {
      ...config.ios,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_INFO_PLIST ?? LOCAL_GOOGLE_SERVICES_INFO_PLIST,
    },
    android: {
      ...config.android,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? LOCAL_GOOGLE_SERVICES_JSON,
    },
  };
};
