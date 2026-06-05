import type { InitialProps as ShareExtensionProps } from 'expo-share-extension';
import { close } from 'expo-share-extension';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { postWishLinkFromShare } from '@/utils/postWishLinkFromShare';

export default function ShareBottomSheet({ url }: ShareExtensionProps) {
  const [sheetStatus, setSheetStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!url) {
      setErrorMessage('공유된 링크를 찾을 수 없어요');
      setSheetStatus('error');
      return;
    }

    let isMounted = true;

    const registerWish = async () => {
      const result = await postWishLinkFromShare(url);

      if (!isMounted) return;

      if (result.ok) {
        setSheetStatus('success');
        close();
        return;
      }

      setErrorMessage(result.message);
      setSheetStatus('error');
    };

    void registerWish();

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (sheetStatus === 'loading')
    return (
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text allowFontScaling={false} style={styles.title}>
          위시템을 담고 있어요
        </Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/share-bottom-sheet/basket.png')}
            style={styles.image}
          />

          <LoadingDots />
        </View>
      </View>
    );

  // TODO: 에러 ui 스타일 변경 필요
  if (sheetStatus === 'error')
    return (
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text allowFontScaling={false} style={styles.title}>
          위시 담기에 실패했어요
        </Text>

        <Text allowFontScaling={false} style={styles.errorMessage}>
          {errorMessage}
        </Text>

        <Pressable style={styles.button} onPress={() => close()}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            닫기
          </Text>
        </Pressable>
      </View>
    );

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />

      <Text allowFontScaling={false} style={styles.title}>
        위시 저장 완료!
      </Text>

      <View style={styles.productContainer}>
        <Image
          source={require('@/assets/images/share-bottom-sheet/basket.png')}
          style={styles.productImage}
        />
        <View style={styles.dots}>
          <Text allowFontScaling={false} style={styles.productName}>
            댕기 명주실 북어
          </Text>
          <Text allowFontScaling={false} style={styles.productPrice}>
            52,000원
          </Text>
        </View>
      </View>

      {/** TODO: 위시 보러가기 버튼 클릭 시 위시 페이지로 이동 */}
      <Pressable style={styles.button}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          위시 보러가기
        </Text>
      </Pressable>
    </View>
  );
}

const DOT_COUNT = 3;
const DOT_INTERVAL_MS = 400;

function LoadingDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(previousIndex => (previousIndex + 1) % DOT_COUNT);
    }, DOT_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.dots}>
      {Array(DOT_COUNT)
        .fill(0)
        .map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              {
                backgroundColor: dotIndex === activeIndex ? '#191B1F' : '#F4F4F6',
              },
            ]}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  handle: {
    height: 4,
    width: 36,
    backgroundColor: '#D9D9D9',
    borderRadius: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: 12,
    fontSize: 16,
    color: '#686F7E',
    textAlign: 'center',
  },
  image: {
    width: 145,
    height: 105,
    marginTop: 52,
    marginBottom: 45,
  },
  imageContainer: {
    position: 'relative',
  },
  dots: {
    position: 'absolute',
    top: 114,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F4F4F6',
  },

  productContainer: {
    borderColor: '#DCDEE2',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#686F7E',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3037',
  },
  button: {
    width: '100%',
    height: 54,
    backgroundColor: '#191B1F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
