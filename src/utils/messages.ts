// typings for messages between background and content script

export enum MessageTypes {}

export type SendingMessage = {
  type: Message;
  payload?: { [key: string]: any };
};

export type Message = keyof typeof MessageTypes;
export type Response = SendingMessage["payload"];

// sending messages

export const sendMessageToContentScript = async (
  message: Message,
  payload?: SendingMessage["payload"]
): Promise<any> => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return chrome.tabs.sendMessage(tabs[0].id!, {
    type: message,
    payload: payload || {},
  });
};

export const sendMessageFromContentScript = async (
  message: Message,
  payload?: SendingMessage["payload"]
): Promise<any> => {
  return chrome.runtime.sendMessage({ type: message, payload: payload || {} });
};

// receiving messages

type ReceivingMessageFuncAsync = (
  message?: SendingMessage,
  sender?: chrome.runtime.MessageSender,
  sendResponse?: (response?: any) => void
) => Promise<void>;

type ReceivingMessageFuncSync = (
  message?: SendingMessage,
  sender?: chrome.runtime.MessageSender,
  sendResponse?: (response?: any) => void
) => void;

/**
 *
 * @desc to avoid error, you must send a response in the callback function.
 */
export const addMessageListenerAsync = (
  receivingMessage: Message,
  func: ReceivingMessageFuncAsync
) => {
  const messageCallback = (
    message: SendingMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.type === receivingMessage) {
      func(message, sender, sendResponse).then(() => true);
      return true;
    }
    return true;
  };
  chrome.runtime.onMessage.addListener(messageCallback);

  return messageCallback;
};

export const addMessageListenerSync = (
  receivingMessage: Message,
  func: ReceivingMessageFuncSync
) => {
  const messageCallback = (
    message: SendingMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.type === receivingMessage) {
      func(message, sender, sendResponse);
    }
  };
  chrome.runtime.onMessage.addListener(messageCallback);

  return messageCallback;
};

export const removeMessageListenerAsync = (
  callback: ReceivingMessageFuncAsync
) => {
  console.log("removing message listener");
  chrome.runtime.onMessage.removeListener(callback);
};

export const removeMessageListenerSync = (
  callback: ReceivingMessageFuncSync
) => {
  console.log("removing message listener");
  chrome.runtime.onMessage.removeListener(callback);
};
