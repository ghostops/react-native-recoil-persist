import AsyncStorage from "@react-native-async-storage/async-storage";
import { AtomEffect, DefaultValue } from "recoil";

interface StorageInterface {
  getItem: (localStorageKey: string) => Promise<string | null>;
  mergeItem: (localStorageKey: string, state: any) => Promise<void>;
}

export const defaultStorageInterface: StorageInterface = {
  getItem: AsyncStorage.getItem,
  mergeItem: AsyncStorage.mergeItem,
};

export const defaultLocalStorageKey: string =
  "asyncRecoilPersistStorageReactNative";

export class ReactNativeRecoilPersist {
  private cachedState: Record<string, any> = {};

  constructor(
    private storageHandlers: StorageInterface = defaultStorageInterface,
    private key: string = defaultLocalStorageKey
  ) {}

  public init = async () => {
    const localCache = await this.storageHandlers.getItem(this.key);

    if (!localCache) {
      return;
    }

    const parsedState = this.parseState(localCache);

    if (Object.keys(parsedState).length) {
      this.cachedState = parsedState;
    }
  };

  private parseState = (state: string) => {
    if (state === undefined) {
      return {};
    }
    try {
      return JSON.parse(state);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  private setState = async (state: any): Promise<void> => {
    try {
      await this.storageHandlers.mergeItem(this.key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };

  private updateState = (key: string, newValue: any) => {
    if (
      newValue !== null &&
      newValue !== undefined &&
      newValue instanceof DefaultValue &&
      this.cachedState.hasOwnProperty(key)
    ) {
      delete this.cachedState[key];
    } else {
      this.cachedState[key] = newValue;
    }

    this.setState(this.cachedState);
  };

  public persistAtom: AtomEffect<any> = ({ onSet, node, trigger, setSelf }) => {
    if (trigger === "get") {
      if (this.cachedState.hasOwnProperty(node.key)) {
        setSelf(this.cachedState[node.key]);
      }
    }

    onSet(async (newValue) => {
      this.updateState(node.key, newValue);
    });
  };
}
