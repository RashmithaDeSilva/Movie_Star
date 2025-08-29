import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { Link } from 'expo-router';
import { images } from '@/constants/images';


const TrendingMovies = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${ movie_id }`} asChild>
        <TouchableOpacity className='w-32 relative pl-5'>
            <Image 
                source={{ uri: poster_url }}
                className='w-28 h-48 rounded-lg'
                resizeMode='cover'
            />

            <View className='absolute bottom-10 -left-1.5 px-2 py-1 rounded-full'>
                <MaskedView maskElement={
                    <Text className='font-bold text-white text-6xl'>{ index + 1 }</Text>
                }>
                    <Image 
                        source={ images.rankingGradient } 
                        className='size-14'
                        resizeMode='cover'
                    />
                </MaskedView>
            </View>

            <Text className='text-sm font-bold text-white mt-2' numberOfLines={2}>{ title }</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingMovies