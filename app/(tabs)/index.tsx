import { Link } from 'expo-router';
import { View, Text } from 'react-native';

const index = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-dark-200 text-5xl font-bold">Hello zahara world</Text>
      <Link href="/movie/sonic-3" className="text-dark-200 text-3xl font-bold">
        Go to Movie Detail
      </Link>
    </View>
  );
};

export default index;
