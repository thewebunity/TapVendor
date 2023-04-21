import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('uid').then(value => {
      firestore()
        .collection('Orders')
        .where('vendor_id', '==', value)
        .onSnapshot(documentSnapshot => {
          let Arr = [];
          documentSnapshot.docs.map(value => {
            Arr.push(value.data());
          });
          setData(Arr);
        });
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Data}
        renderItem={({item, index}) => {
          return (
            <View
              className="flex-row  items-center bg-light shadow-2xl px-4 py-4 rounded-md  self-center mt-2"
              style={{width: '95%'}}>
              <Image
                source={{uri: item.product_image}}
                className="w-20 h-20 rounded-full"
                resizeMode="cover"
              />
              <View className="ml-5 flex-1">
                <Text className="text-sm text-light font-SemiBold absolute top-0 right-0 bg-black px-2 rounded-md">
                  {item.Order_status}
                </Text>
                <Text className="text-lg text-gray font-SemiBold">
                  {item.product_name}
                </Text>
                <Text className="text-sm text-gray font-SemiBold">
                  ₹ {item.Price}
                </Text>
                <Text className="text-xs text-gray font-SemiBold">
                  {item.vendor_name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
