import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import MovieCard from "~/components/MovieCard";
import SearchBar from "~/components/SearchBar";
import { icons } from "~/constants/icons";
import { images } from "~/constants/images";
import { fetchMovies } from "~/services/api";
import { useFetch } from "~/services/useFetch";

function Home() {
  const router = useRouter();
  const {
    data: movies,
    error,
    loading,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mb-5 mt-8 h-10 w-12" />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <View className="mt-5 flex-1">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movie"
            />
            <>
              <Text className="mb-3 mt-5 text-lg font-bold text-white">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Home;
