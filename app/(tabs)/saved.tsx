import { Text, View, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';


const Saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col'>
        <Image 
          source={ icons.save }
          className='size-10'
          tintColor={ '#fff' }
        />
        <Text className='text-gray-500 text-base mt-2'>Saved</Text>
      </View>
    </View>
  )
}

export default Saved
