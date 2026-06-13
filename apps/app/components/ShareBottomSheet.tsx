import type { InitialProps as ShareExtensionProps } from 'expo-share-extension';
import { close, openHostApp } from 'expo-share-extension';
import { type ReactNode, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { postWishLinkFromShare } from '@/utils/postWishLinkFromShare';

export default function ShareBottomSheet(props: ShareExtensionProps) {
  return (
    <SafeAreaProvider>
      <ShareBottomSheetContent {...props} />
    </SafeAreaProvider>
  );
}

function ShareBottomSheetContent({ url }: ShareExtensionProps) {
  const [sheetStatus, setSheetStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const handleOpenWishlist = () => {
    /** openHostApp path 규칙: `/{path}?{query}` — `web=...`만 넘기면 `/web=...` 라우트로 해석됨 */
    openHostApp(`/?web=${encodeURIComponent('/archive?tab=wish')}`);
  };

  useEffect(() => {
    if (!url) {
      setSheetStatus('error');
      return;
    }

    let isMounted = true;

    const registerWish = async () => {
      const result = await postWishLinkFromShare(url);

      if (!isMounted) return;

      if (result.ok) {
        setSheetStatus('success');
        return;
      }

      setSheetStatus('error');
    };

    void registerWish();

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (sheetStatus === 'loading')
    return (
      <SheetContainer>
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
      </SheetContainer>
    );

  if (sheetStatus === 'error')
    return (
      <SheetContainer onDimPress={() => close()}>
        <View style={styles.handle} />

        <Text allowFontScaling={false} style={styles.title}>
          위시템을 저장하지 못했어요
        </Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/share-bottom-sheet/basket.png')}
            style={styles.image}
          />

          <Image
            source={require('@/assets/images/share-bottom-sheet/warning.png')}
            style={styles.icon}
          />
        </View>

        <Pressable style={styles.button} onPress={() => close()}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            확인
          </Text>
        </Pressable>
      </SheetContainer>
    );

  return (
    <SheetContainer onDimPress={() => close()}>
      <View style={styles.handle} />

      <Text allowFontScaling={false} style={styles.title}>
        위시템을 저장했어요
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/share-bottom-sheet/basket.png')}
          style={styles.image}
        />

        <Image
          source={require('@/assets/images/share-bottom-sheet/icon-success.png')}
          style={styles.icon}
        />
      </View>

      <Pressable style={styles.button} onPress={handleOpenWishlist}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          위시템 보러가기
        </Text>
      </Pressable>
    </SheetContainer>
  );
}

type SheetContainerProps = {
  children: ReactNode;
  onDimPress?: () => void;
};

function SheetContainer({ children, onDimPress }: SheetContainerProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      {onDimPress && <Pressable style={StyleSheet.absoluteFill} onPress={onDimPress} />}
      <View style={[styles.sheet, { paddingBottom: bottom }]}>{children}</View>
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
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
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

  button: {
    width: '100%',
    height: 54,
    backgroundColor: '#191B1F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  icon: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 93,
    left: 49,
  },
});
