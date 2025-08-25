import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';


// {
//     "adult": boolian,
//     "backdrop_path": string,
//     "genre_ids": [],
//     "id": number,
//     "original_language": string,
//     "original_title": string,
//     "overview": string,
//     "popularity": number,
//     "poster_path": string",
//     "release_date": string,
//     "title": string,
//     "video": boolian,
//     "vote_average": number,
//     "vote_count": number
// }

interface movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    release_date: string;
}

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: movie) => {
  return (
    <Link href={`/movies/${ id }`} asChild>
        <TouchableOpacity className='w-[30%]'>
            {/* Poster */}
            <Image 
                source={{
                    uri: poster_path ? 
                        `https://image.tmdb.org/t/p/w500${ poster_path }` :
                        `https://placehold.co/600x400/1a1a1a/ffffff.png`
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
            />

            {/* Movie name */}
            <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{ title }</Text>
            
            {/* Release year */}
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium'>{ release_date?.split('-')[0] }</Text>
                <Text className='text-xs font-medium text-light-300 uppercase'>Movie</Text>
            </View>

            {/* Vote stars */}
            {/* <View className='flex-row justify-start items-center gap-x-1 mt-2 mb-5'>
                <Image source={ icons.star } className='size-4' />
                <Text className='text-xs text-white font-bold uppercase'>{ Math.round(vote_average / 2) }</Text>
            </View> */}
            <View className="flex-row justify-start items-center gap-x-1 mt-2 mb-5">
                { Array.from({ length: Math.round(vote_average / 2) }).map((_, index) => (
                    <Image
                        key={ index }
                        source={ icons.star }
                        className="size-4"
                        resizeMode="contain"
                    />
                )) }
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard;