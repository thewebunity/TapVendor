import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation}) => {
  const [Mobile, setMobile] = useState('');
  const [Loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  async function signInWithPhoneNumber(phoneNumber) {
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setLoading(false);
  }

  function onAuthStateChanged(user) {
    if (user) {
      AsyncStorage.setItem('uid', user.uid).then(async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        firestore()
          .collection('Vendor')
          .doc(user.uid)
          .set({
            uid: user.uid,
            Mobile: Mobile,
            token: token,
            wwallet_balance: 0,
          })
          .then(() => {
            navigation.navigate('BottomStack');
          });
      });
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const Login = async () => {
    setLoading(true);
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
    setLoading(false);
  };

  if (!confirm) {
    return (
      <View style={{flex: 1}}>
        <Image
          source={require('../assets/images/login.jpg')}
          style={{
            width: '100%',
            height: '50%',
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
        <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          <Text className="text-dark text-center text-sm font-Medium">
            Sign in to your Account
          </Text>
          <View style={{marginVertical: 15}}>
            <Text className="text-sm font-Medium text-dark">Mobile Number</Text>
            <TextInput
              className="py-3 my-4  border px-4 rounded-lg"
              placeholder="Enter your Mobile Number"
              value={Mobile}
              onChangeText={setMobile}
              keyboardType="number-pad"
            />
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              className="bg-secondary w-2/5 self-center py-4 px-4  rounded-full"
              onPress={() => signInWithPhoneNumber(`+91 ${Mobile}`)}>
              <Text className="text-light text-center text-sm font-Medium">
                Send OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1}}>
        <Image
          source={require('../assets/images/login.jpg')}
          style={{
            width: '100%',
            height: '50%',
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
        <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          <Text className="text-dark text-center text-sm font-Medium">
            Sign in to your Account
          </Text>
          <View style={{marginVertical: 15}}>
            <Text className="text-sm font-Medium text-dark text-center mt-4">
              OTP
            </Text>
            <TextInput
              className="py-3 my-4  border px-4 rounded-lg"
              placeholder="Enter 6 digit Otp"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              className="bg-secondary w-2/5 self-center py-4 px-4  rounded-full"
              onPress={() => Login(code)}>
              <Text className="text-light text-center text-sm font-Medium">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
