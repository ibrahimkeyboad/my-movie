import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

import { icons } from "~/constants/icons";
import { images } from "~/constants/images";

function TabIcon({ title, icon, focused }) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="mt-4 flex min-h-16 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="ml-2 text-base font-semibold text-secondary">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="mt-4 size-full items-center justify-center rounded-full">
      <Image source={icon} tintColor="#a8b5db" className="size-5" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 10,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Search" icon={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Saved" icon={icons.save} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" icon={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
