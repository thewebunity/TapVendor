import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {PencilSquareIcon} from 'react-native-heroicons/solid';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [Data, setData] = useState({});
  const [Trans, setTrans] = useState([]);
  const [Amount, setAmount] = useState(0);
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('uid').then(value => {
      firestore()
        .collection('Vendor')
        .where('uid', '==', value)
        .onSnapshot(documentSnapshot => {
          documentSnapshot.docs.map(value => {
            setData(value.data());
          });
        });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('uid').then(value => {
      firestore()
        .collection('Transactions')
        .where('uid', '==', value)
        .onSnapshot(documentSnapshot => {
          const Transaction = [];
          documentSnapshot.docs.map(value => {
            Transaction.push(value.data());
          });
          setTrans(Transaction);
        });
    });
  }, []);

  const AddMoney = () => {
    var options = {
      description: 'Tap Tea A new Good Morning',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_KQtkA3kEQtgqwA',
      amount: Amount * 100,
      name: 'Tap Tea',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        Alert.alert('Wallet Loaded Successfully');
        AsyncStorage.getItem('uid').then(async value => {
          const postReference = firestore().doc(`Users/${value}`);
          firestore()
            .runTransaction(async transaction => {
              const postSnapshot = await transaction.get(postReference);
              if (!postSnapshot.exists) {
                throw 'Post does not exist!';
              }
              transaction.update(postReference, {
                wallet_balance:
                  parseInt(postSnapshot.data().wallet_balance) +
                  parseInt(Amount),
              });
            })
            .then(() => {
              firestore()
                .collection('Transactions')
                .add({
                  Amount: Amount,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  uid: value,
                  txn_id: 'txn' + Math.floor(Math.random() * 1000000000),
                  type: 'credit',
                  desc: 'Add Money',
                });
            });
        });
      })
      .catch(error => {
        Alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <>
      <View className="flex-1">
        <View
          className="flex-row items-center px-4 py-3 bg-light shadow-2xl self-center mt-2 rounded-md"
          style={{width: '95%'}}>
          <Image
            source={{uri: Data.profile_img}}
            className="w-24 h-24 rounded-full"
            resizeMode="contain"
          />
          <View className="ml-8 flex-1">
            <TouchableOpacity className="absolute top-0 right-0">
              <PencilSquareIcon color={'#008847'} size={24} />
            </TouchableOpacity>
            <Text className="text-lg text-gray font-SemiBold">{Data.name}</Text>
            <Text className="text-sm text-gray font-SemiBold my-1">
              {Data.Mobile}
            </Text>
          </View>
        </View>

        <View
          className=" px-4 py-3 bg-light shadow-2xl self-center mt-2 rounded-md "
          style={{width: '95%'}}>
          <View>
            <Text className="text-sm font-SemiBold">Your Balance</Text>
            <Text className="text-4xl  font-SemiBold mt-5">
              ₹ {Data.wallet_balance}
            </Text>
            <TouchableOpacity
              className=" bg-secondary  px-4 py-2 rounded-md mt-3 w-2/6 "
              onPress={() => setmodalVisible(true)}>
              <Text className="text-xs font-SemiBold text-light text-center">
                Add Money
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-5">
            <Text className="text-sm font-SemiBold text-gray ">
              Recent Transaction :
            </Text>
            <FlatList
              data={Trans}
              renderItem={({item, index}) => {
                return (
                  <View
                    className="flex-row justify-between items-center bg-light shadow-2xl  py-4 rounded-md  self-center mt-2"
                    style={{width: '95%'}}>
                    <View className="flex-1">
                      <Text className="text-sm text-gray font-SemiBold">
                        Trans. id : {item.txn_id}
                      </Text>
                      <Text className="text-xs text-gray font-SemiBold">
                        {item.desc}
                      </Text>
                    </View>
                    <Text className="text-xl text-gray font-SemiBold">
                      {item.type == 'debit' ? '-' : '+'}₹ {item.Amount}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-xl text-gray font-SemiBold">
              Enter Amount
            </Text>
            <TextInput
              placeholder="Enter Amount"
              className="border px-4 py-3 rounded-md my-4"
              value={Amount}
              onChangeText={setAmount}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              className=" bg-secondary  px-4 py-4 rounded-md mt-3 w-2/6 "
              onPress={AddMoney}>
              <Text className="text-xs font-SemiBold text-light text-center">
                Add Money
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
