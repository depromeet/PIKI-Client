type PostFcmTokenRequestT = {
  token: string;
  deviceId: string;
};

type DeleteFcmTokenRequestT = {
  deviceId: string;
};

export const postFcmToken = async (body: PostFcmTokenRequestT, accessToken: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/fcm/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('FCM 토큰 등록 실패');
  }
};

export const deleteFcmToken = async (body: DeleteFcmTokenRequestT, accessToken: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/fcm/tokens`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('FCM 토큰 삭제 실패');
  }
};
