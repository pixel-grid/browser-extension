import IPreset from "@/Models/IPreset";
import { eventChannel } from "redux-saga";

export function sendMessage<T, Response>(
  message: T,
  callback: (response: Response) => void
) {
  if (window.chrome && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs.length > 0 ? tabs[0].id : undefined;
      if (activeTab !== undefined) {
        chrome.tabs.sendMessage(activeTab, message, callback);
      }
    });
  } else if (
    window.browser &&
    window.browser.tabs &&
    window.browser.tabs.query
  ) {
    // Microsoft Edge
    window.browser.tabs.query({ active: true, currentWindow: true }, function(
      tabs: chrome.tabs.Tab[]
    ) {
      const activeTab = tabs.length > 0 ? tabs[0].id : undefined;
      if (activeTab !== undefined) {
        window.browser.tabs.sendMessage(activeTab, message, callback);
      }
    });
  } else if (window.safari) {
    // Safari
    window.safari.application.activeBrowserWindow.activeTab.addEventListener(
      "message",
      function handler(response: { message: {} }) {
        window.safari.application.activeBrowserWindow.activeTab.removeEventListener(
          "message",
          handler
        );

        if (callback !== undefined) {
          const { message } = response;
          callback(message as Response);
        }
      },
      false
    );

    window.safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
      "message",
      message
    );
  }
}

export function sendCommandAsync(
  enable?: boolean,
  preset?: IPreset,
  activePresetIndex?: number
) {
  return eventChannel(emitter => {
    sendMessage<
      {
        command: "status" | "enable" | "disable";
        preset?: IPreset;
        activePresetIndex?: number;
      },
      { enabled: boolean; activePresetIndex?: number }
    >(
      {
        command:
          enable === undefined ? "status" : enable ? "enable" : "disable",
        preset,
        activePresetIndex
      },
      response => {
        emitter({
          enabled: response && response.enabled,
          activePresetIndex: response ? response.activePresetIndex : undefined
        });
      }
    );
    return () => {};
  });
}
