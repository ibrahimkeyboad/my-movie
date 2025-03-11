import { Image, Text, TextInput, View } from "react-native";

import { icons } from "~/constants/icons";

type Props = {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onSearchText?: (text: string) => void;
};

export default function SearchBar({
  onPress,
  placeholder,
  value,
  onSearchText,
}: Props) {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />

      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onSearchText}
        placeholderTextColor="#a8b5db"
        className="ml-2 flex-1 text-white"
      />
    </View>
  );
}
