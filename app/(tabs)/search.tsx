import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import MovieCard from "~/components/MovieCard";
import SearchBar from "~/components/SearchBar";
import { icons } from "~/constants/icons";
import { images } from "~/constants/images";
import { fetchMovies } from "~/services/api";
import { useFetch } from "~/services/useFetch";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const {
    data: movies,
    error,
    loading,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 w-full flex-1"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ marginBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="mt-10 w-full flex-row items-center justify-center">
              <Image source={icons.logo} className="h-10 w-12" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onSearchText={(text) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="my-3 px-5 text-red-500">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold text-white">
                Search Result for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? `No movies found for "${searchQuery}"`
                  : "Search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
