/**********************************************
 *                                           *
 *            Typing                          *
 *                                           *
 **********************************************/

interface LocalStorage {}

interface SyncStorage {}

type SyncStorageKeys = (keyof SyncStorage)[];
type LocalStorageKeys = (keyof LocalStorage)[];

const defaultOptions: SyncStorage = {};

/**********************************************
 *                                           *
 *            Setting data                        *
 *                                           *
 **********************************************/

export function storeOptions(obj: SyncStorage): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set(obj, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        throw new Error(chrome.runtime.lastError.message);
      }
      resolve();
    });
  });
}

function storeData(obj: LocalStorage): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(obj, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        throw new Error(chrome.runtime.lastError.message);
      }
      resolve();
    });
  });
}

/**********************************************
 *                                           *
 *           getting data                  *
 *                                           *
 **********************************************/

function getData(keys: LocalStorageKeys): Promise<LocalStorage> {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        throw new Error(chrome.runtime.lastError.message);
      }
      resolve(result);
    });
  });
}

export function getOptions(keys: SyncStorageKeys): Promise<SyncStorage> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (result: SyncStorage) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        throw new Error(chrome.runtime.lastError.message);
      }
      resolve(result);
    });
  });
}

/**********************************************
 *                                           *
 *            clearing data                       *
 *                                           *
 **********************************************/

/**
 *
 * @returns Promise<void>
 * @description Clears all data from local storage
 */
export function clearStorage(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.clear(() => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        throw new Error(chrome.runtime.lastError.message);
      }
      resolve();
    });
  });
}

function clearData(keys: LocalStorageKeys): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        throw new Error(chrome.runtime.lastError.message);
      }
      resolve();
    });
  });
}
