/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {View, Text} from 'react-native';
import ReactNativeRecoilPersist, {ReactNativeRecoilPersistGate} from '../src';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <View
          style={{
            backgroundColor: 'red',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Hello</Text>
        </View>
      </ReactNativeRecoilPersistGate>
    </View>
  );
};

export default App;
