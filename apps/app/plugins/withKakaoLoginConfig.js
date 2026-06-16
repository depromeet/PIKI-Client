const { withAppDelegate, withInfoPlist } = require('@expo/config-plugins');

/**
 * @react-native-kakao/core 플러그인이 자동으로 추가하지 않는 iOS 설정을 보완:
 * 1. CFBundleURLTypes에 kakao{nativeAppKey} URL 스킴 추가 (카카오톡 인증 후 앱으로 복귀)
 * 2. AppDelegate.swift에 KakaoSDKAuth URL 핸들러 추가 (OAuth 코드 처리)
 */
const withKakaoLoginConfig = (config, { nativeAppKey }) => {
  const kakaoScheme = `kakao${nativeAppKey}`;

  config = withInfoPlist(config, config => {
    if (!config.modResults.CFBundleURLTypes) {
      config.modResults.CFBundleURLTypes = [];
    }

    const hasScheme = config.modResults.CFBundleURLTypes.some(entry =>
      entry.CFBundleURLSchemes?.includes(kakaoScheme)
    );

    if (!hasScheme) {
      config.modResults.CFBundleURLTypes.push({ CFBundleURLSchemes: [kakaoScheme] });
    }

    return config;
  });

  config = withAppDelegate(config, config => {
    let contents = config.modResults.contents;

    if (!contents.includes('import KakaoSDKAuth')) {
      contents = contents.replace('import Expo', 'import Expo\nimport KakaoSDKAuth');
    }

    if (!contents.includes('AuthApi.isKakaoTalkLoginUrl')) {
      contents = contents.replace(
        'return super.application(app, open: url, options: options) || RCTLinkingManager.application(app, open: url, options: options)',
        'if AuthApi.isKakaoTalkLoginUrl(url) {\n      return AuthController.handleOpenUrl(url: url)\n    }\n    return super.application(app, open: url, options: options) || RCTLinkingManager.application(app, open: url, options: options)'
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  return config;
};

module.exports = withKakaoLoginConfig;
