import * as SecureStore from 'expo-secure-store';

// 토큰 키를 상수로 관리하여 오타 방지
export const AUTH_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

type AuthKeyT = (typeof AUTH_KEYS)[keyof typeof AUTH_KEYS];

/**
 * SecureStore에 데이터 저장 (set)
 */
export const setSecureItem = async (key: AuthKeyT, value: string): Promise<boolean> => {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (error) {
    if (__DEV__) {
      console.error(`[SecureStore Set Error] key: ${key}`, error);
    }
    return false;
  }
};

/**
 * SecureStore에서 데이터 조회 (get)
 */
export const getSecureItem = async (key: AuthKeyT): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    if (__DEV__) {
      console.error(`[SecureStore Get Error] key: ${key}`, error);
    }
    return null;
  }
};

/**
 * SecureStore에서 데이터 삭제 (delete)
 */
export const deleteSecureItem = async (key: AuthKeyT): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    if (__DEV__) {
      console.error(`[SecureStore Delete Error] key: ${key}`, error);
    }
    return false;
  }
};

/**
 * 로그아웃 등 한 번에 모든 인증 토큰을 날려야 할 때 사용하는 유틸
 */
export const clearAuthTokens = async (): Promise<void> => {
  await Promise.all([
    deleteSecureItem(AUTH_KEYS.ACCESS_TOKEN),
    deleteSecureItem(AUTH_KEYS.REFRESH_TOKEN),
  ]);
};
