import {View, Image} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const checkUser = async () => {
    const uid = await AsyncStorage.getItem('uid');
    if (uid == null) {
      navigation.navigate('Onboarding');
    } else {
      navigation.navigate('BottomStack');
    }
  };
  setTimeout(() => {
    checkUser();
  }, 2000);

  return (
    <View className="flex-1">
      <Image
        source={require('../assets/images/splash.png')}
        style={{width: '100%', height: '100%', resizeMode: 'cover'}}
      />
    </View>
  );
};

export default Splash;
