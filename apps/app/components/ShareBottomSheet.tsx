import type { InitialProps } from 'expo-share-extension';
import { close, openHostApp } from 'expo-share-extension';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ShareBottomSheet(props: InitialProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** 공유된 형식에 따라 url / text 중 들어온 값을 사용 (이미지/파일은 path 문자열) */
  const sharedValue =
    props.url ?? props.text ?? props.images?.[0] ?? props.videos?.[0] ?? props.files?.[0] ?? '';

  const handleOpenApp = () => {
    openHostApp(`create?value=${encodeURIComponent(sharedValue)}`);
    close();
  };

  if (isLoading)
    return (
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.title}>위시템을 담고 있어요</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/share-bottom-sheet/basket.png')}
            style={styles.image}
          />

          <LoadingDots />
        </View>
      </View>
    );

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />

      <Text style={styles.title}>위시 저장 완료!</Text>

      <View style={styles.productContainer}>
        <Image
          source={require('@/assets/images/share-bottom-sheet/basket.png')}
          style={styles.productImage}
        />
        <View style={styles.dots}>
          <Text style={styles.productName}>댕기 명주실 북어</Text>
          <Text style={styles.productPrice}>52,000원</Text>
        </View>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>위시 보러가기</Text>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
