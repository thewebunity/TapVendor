import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Onboarding = ({navigation}) => {
  const Navigation = useNavigation();
  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);
  return (
    <>
      <View className="flex-1 ">
        <Image
          source={require('../assets/images/main.png')}
          style={{
            width: '100%',
            height: '65%',
            resizeMode: 'cover',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        />
        <View className="relative bottom-5">
          <TouchableOpacity
            className="bg-secondary w-2/5 self-center py-4 px-8  rounded-full"
            onPress={() => navigation.navigate('Login')}>
            <Text className="text-light text-center text-sm font-Medium ">
              Get Started
            </Text>
          </TouchableOpacity>

          <View className="relative top-8">
            <Text className="text-dark text-center text-sm font-Medium">
              or Sign in with
            </Text>

            <View className="flex-row justify-around mt-12">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/google.png')}
                  style={{width: 40, height: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/facebook.png')}
                  style={{width: 45, height: 45, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/twitter.png')}
                  style={{width: 45, height: 45, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <Text className="text-center mt-12 font-Medium text-dark">
              Made By Webunity ❤️
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
