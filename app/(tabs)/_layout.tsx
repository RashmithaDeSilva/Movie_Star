import { Text, ImageBackground, Image, View } from 'react-native';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';


const TabIcon = ({ focused, icon, title }: any) => {
    if(focused) {
       return (
            <ImageBackground 
                source={ images.highlight }
                className='flex flex-row flex-1 min-w-[115px] 
                    min-h-20 mt-6 justify-center items-center rounded-full overflow-hidden'
            >
                <Image source={ icon } tintColor="#151312" className='size-5' />
                <Text className='text-secondary text-base font-semibold ml-2'>{ title }</Text>
            </ImageBackground>
        ) 
    }

    return (
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={ icon } tintColor="#A8B5DB" className='size-5'/>
        </View>
    )
}

const _Layout = () => {
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#0F0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 40,
                height: 60,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0F0D23',
            },
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={ focused }
                        icon={ icons.home }
                        title="Home"
                    />
                ),
            }}
        />
        <Tabs.Screen 
            name='search'
            options={{
                title: 'Search',
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={ focused }
                        icon={ icons.search }
                        title="Search"
                    />
                ),
            }}
        />
        <Tabs.Screen 
            name='saved'
            options={{
                title: 'Saved',
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={ focused }
                        icon={ icons.save }
                        title="Saved"
                    />
                ),
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={ focused }
                        icon={ icons.person }
                        title="Profile"
                    />
                ),
            }}
        />
    </Tabs>
  )
}

export default _Layout