import { View, Image, TextInput, TextInputProps } from 'react-native';
import React, { forwardRef } from 'react';
import { icons } from '@/constants/icons';


interface Props extends TextInputProps {
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = forwardRef<TextInput, Props>(
  ({ placeholder, value='', onPress, onChangeText, ...rest }, ref) => {
    return (
      <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-3 border border-ratingBox'>
        <Image 
          source={ icons.search }
          className='size-5'
          resizeMode='contain'
          tintColor='#AB8BFF'
        />
        <TextInput 
          ref={ref} 
          onPress={ onPress }
          placeholder={ placeholder }
          placeholderTextColor='#AB8BFF'
          value={ value }
          onChangeText={ onChangeText }
          className='flex-1 ml-2 text-white'
          {...rest} 
        />
      </View>
    );
  }
);


export default SearchBar;