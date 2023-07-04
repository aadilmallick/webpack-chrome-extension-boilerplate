/**********************************************
 *                                           *
 *            Typing                          *
 *                                           *
 **********************************************/

interface LocalStorage {}

interface SyncStorage {}

export type SyncStorageKeys = (keyof SyncStorage)[];
export type LocalStorageKeys = (keyof LocalStorage)[];

export const defaultSyncOptions: Required<SyncStorage> = {};
export const defaultLocalOptions: Required<LocalStorage> = {};

/**********************************************
 *                                           *
 *            Setting data                        *
 *                                           *
 **********************************************/

export function storeSync(obj: SyncStorage): Promise<void> {
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

function storeLocal(obj: LocalStorage): Promise<void> {
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
 *           getting Local                  *
 *                                           *
 **********************************************/

function getLocal(keys: LocalStorageKeys): Promise<LocalStorage> {
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

export function getSync(keys: SyncStorageKeys): Promise<SyncStorage> {
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
 *            clearing Local                       *
 *                                           *
 **********************************************/

/**
 *
 * @returns Promise<void>
 * @description Clears all Local from local storage
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

function clearLocal(keys: LocalStorageKeys): Promise<void> {
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
