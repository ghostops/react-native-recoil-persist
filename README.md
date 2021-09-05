# 💾 react-native-recoil-persist

Module inspired by [recoil-persist](https://www.npmjs.com/package/recoil-persist) used to persist asynchronous Recoil state in react-native. The main difference from `recoil-persist` is that this package includes a `ReactNativeRecoilPersistGate` blocking the rest of the App from rendering until the store has been loaded from AsyncStorage and parsed.

### Depends on `@react-native-community/async-storage`

## Install

`npm install react-native-recoil-persist`

or

`yarn add react-native-recoil-persist`

## Usage

### Usage in app root

Add the `ReactNativeRecoilPersistGate` as the first component inside of the `RecoilRoot`, wrapping the rest of your app.

```javascript
import React from "react";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import { RecoilRoot } from "recoil";

export const AppRoot = () => {
  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <RestOfYourApp />
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
};
```

### Usage in Atoms

```javascript
import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom } from "recoil";

const testAtom = atom({
  default: "I am a test",
  key: "test",
  // Add this effect to the atom to persist it
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
```

## Functionality

`import ReactNativeRecoilPersist from 'react-native-recoil-persist'`
A singleton of `ReactNativeRecoilPersist` that you can start using with the default configuration.

`import { ReactNativeRecoilPersist } from 'react-native-recoil-persist'`
Exports the raw `ReactNativeRecoilPersist` class, which you can configure as a singleton yourself.

`import { ReactNativeRecoilPersistGate } from 'react-native-recoil-persist'`
The Persist Gate component that you need to render after the `RecoilRoot` in the tree.

`import { defaultLocalStorageKey } from 'react-native-recoil-persist'`
An export of the default local storage key used.

`import { defaultStorageInterface } from 'react-native-recoil-persist'`
An export of the default storage functions used. Look at this if you want to configure your own singleton and use something other than AsyncStorage.

## Run example app

```shell
git clone git@github.com:ghostops/react-native-recoil-persist.git

cd react-native-recoil-persist
yarn install

cd example
yarn install

yarn ios
# or
yarn android
```
