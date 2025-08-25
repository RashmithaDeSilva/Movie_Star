import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import useFatch from '@/hooks/useFatch';
import { fatchMovies } from '@/services/api';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { useIsFocused } from '@react-navigation/native';
import { updateSearchCount } from '@/services/appwrite';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  const { 
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refatch: moviesReload,
    reset: moviesClean
  } = useFatch(() => fatchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(
      async () => {
        if(searchQuery.trim()) {
          await moviesReload();
          if(movies?.length > 0 && movies?.[0]) await updateSearchCount(searchQuery,  movies[0]);
        } else {
          moviesClean();
        }
      },
      800
    );

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [isFocused]);
  
  return (
    <View className="flex-1 bg-primary">
      <Image 
        source={ images.bg }
        className="absolute w-full z-0"
      />
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={ false }
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        {/* Logo */}
        <Image 
          source={ icons.logo }
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        {/* Search bar */}
        <SearchBar 
          ref={ inputRef }
          placeholder='Search movies ...'
          value={ searchQuery }
          onChangeText={(text: string) => setSearchQuery(text)}
        />

        {
          moviesLoading && (
            <ActivityIndicator 
              size='large'
              color='#0000FF'
              className="mt-10 self-center"
            />
          )
        }

        {
          moviesError && (
            <Text className="text-lg text-red-500 font-bold mt-5 mb-3">Error: { moviesError?.message }</Text>
          )
        }

        {!moviesLoading && !moviesError && (
          <View>
            {/* Search term */}
            {
              searchQuery.trim() !== '' ? (
                <Text className='text-lg text-white font-bold mt-5 mb-3'>
                  Search Results for { '' }
                  <Text className='text-xl text-darkAccent'>{ searchQuery }</Text>
                </Text>
              ) : null
            }

            <FlatList 
              data={ movies }
              renderItem={({ item }) => (
                <MovieCard { ...item } />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={ 3 }
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={ false }
              ListEmptyComponent={
                (
                  <View className='mt-10 px-5 justify-center items-center flex'>
                    {
                      movies?.length <= 0 ? 
                        <Text className='text-center text-gray-500'>No movies found</Text> :
                        <Text className='text-center text-gray-500'>Search for a movie</Text>
                    }
                  </View>
                )
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Search;
