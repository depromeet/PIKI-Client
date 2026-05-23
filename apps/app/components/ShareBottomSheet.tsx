import { Pressable, Text, View } from 'react-native';

// if ShareExtension is your root component, url is available as an initial prop
export default function ShareExtension({ url }: { url: string }) {
  console.log(url);

  return (
    <View
      style={{
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          height: 4,
          width: 36,
          backgroundColor: '#d9d9d9',
          borderRadius: '24px',
          marginBottom: 20,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>위시템을 담고 있어요</Text>
      <Text>{url}</Text>
      <Pressable
        style={{
          width: '100%',
          height: 44,
          backgroundColor: '#191B1F',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>위시 보러가기</Text>
      </Pressable>
    </View>
  );
}
