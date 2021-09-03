import React from 'react';
import ReactNativeRecoilPersist, {ReactNativeRecoilPersistGate} from '../src';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {atom, RecoilRoot, useRecoilState} from 'recoil';

const testAtom = atom({
  default: 'I am a test',
  key: 'test',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

const test2Atom = atom({
  default: 'I am also a test',
  key: 'test-key-number-two',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

const TestScreen = () => {
  const [test, setTest] = useRecoilState(testAtom);
  const [test2, setTest2] = useRecoilState(test2Atom);

  return (
    <View
      style={{
        backgroundColor: 'darkseagreen',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{marginBottom: 10}}>{test}</Text>
      <Text style={{marginBottom: 20}}>{test2}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'honeydew',
          padding: 10,
          marginBottom: 10,
        }}
        onPress={() => {
          setTest(`I am a test: ${Date.now()}`);
        }}>
        <Text>Set test value 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'honeydew',
          padding: 10,
          marginBottom: 10,
        }}
        onPress={() => {
          setTest2(`I am also a test: ${Date.now()}`);
        }}>
        <Text>Set test value 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'honeydew',
          padding: 10,
        }}
        onPress={async () => {
          const keys = await AsyncStorage.getAllKeys();

          keys.forEach(key => {
            AsyncStorage.getItem(key).then(console.log);
          });
        }}>
        <Text>Log AsyncStorage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default () => {
  return (
    <View style={{flex: 1, backgroundColor: 'orangered'}}>
      <RecoilRoot>
        <ReactNativeRecoilPersistGate
          store={ReactNativeRecoilPersist}
          fallback={
            <View
              style={{
                flex: 1,
                backgroundColor: 'khaki',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          }
          onInit={() => console.log('Store init')}>
          <TestScreen />
        </ReactNativeRecoilPersistGate>
      </RecoilRoot>
    </View>
  );
};
