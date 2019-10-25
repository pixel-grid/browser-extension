import { IPreset, destroyGrid, initializeGrid } from '@sergeyzwezdin/pixelgrid';
import { getItem, setItem } from '@/Helpers/localStorage';

import IPresetModel from '@/Models/IPreset';
import { isFirefox } from '@/Helpers/environment';

declare global {
    interface Window {
        browser: {
            tabs: {
                query: Function;
                sendMessage: Function;
            };
            runtime: {
                onMessage: {
                    addListener: Function;
                };
            };
        };
    }
    const browser: Window['browser'];
}

let token:
    | {
          root: HTMLElement;
          resizeHandler: () => void;
          activePresetIndex?: number;
      }
    | undefined = undefined;

let currentTab:
    | {
          id: number;
          url: string;
      }
    | undefined;

function onMessageCallback(
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: {}) => void
) {
    if (!sender.tab) {
        switch (request.command) {
            case 'status':
                sendResponse({
                    enabled: token !== undefined,
                    activePresetIndex:
                        token !== undefined
                            ? token.activePresetIndex
                            : undefined
                });
                break;

            case 'enable':
                const preset: IPresetModel | undefined = request.preset;
                const activePresetIndex: number | undefined =
                    request.activePresetIndex;

                if (token) {
                    destroyGrid(token);
                }

                token = enableGrid(preset, activePresetIndex);
                if (currentTab) {
                    saveLocalState(
                        currentTab.id,
                        currentTab.url,
                        preset,
                        activePresetIndex
                    );
                }

                sendResponse({ activePresetIndex, enabled: true });
                break;

            case 'disable':
                if (token) {
                    destroyGrid(token);
                    token = undefined;

                    if (currentTab) {
                        saveLocalState(
                            currentTab.id,
                            currentTab.url,
                            undefined,
                            undefined
                        );
                    }
                }

                sendResponse({
                    enabled: false,
                    activePresetIndex: undefined
                });
                break;
        }
    }
}

function getBrowserRuntime(): Window['browser']['runtime'] | undefined {
    if (window.chrome && window.chrome.runtime) {
        return window.chrome.runtime;
    } else if (isFirefox() && browser && browser.runtime) {
        // Firefox
        return browser.runtime;
    } else if (window.browser && window.browser.runtime) {
        // Microsoft Edge
        return window.browser.runtime;
    }

    return undefined;
}

const runtime = getBrowserRuntime();
if (runtime && runtime.onMessage) {
    runtime.onMessage.addListener(onMessageCallback);
}

function enableGrid(preset?: IPresetModel, activePresetIndex?: number) {
    if (preset !== undefined) {
        const presets = preset.grids.map(
            (grid) =>
                ({
                    grids: [grid.grid],
                    mediaQuery: !!grid.mediaQuery ? grid.mediaQuery : undefined
                } as IPreset)
        );

        return { ...initializeGrid(presets), activePresetIndex };
    }

    return initializeGrid([]);
}

function saveLocalState(
    tabId: number,
    url: string,
    preset?: IPresetModel,
    activePresetIndex?: number
) {
    const storageKey = `${tabId}_${url}`;
    return setItem(storageKey, { preset, activePresetIndex });
}

function loadLocalState(tabId: number, url: string) {
    const storageKey = `${tabId}_${url}`;
    return new Promise<{ preset?: IPresetModel; activePresetIndex?: number }>(
        (resolve, reject) => {
            getItem<
                | {
                      preset?: IPresetModel;
                      activePresetIndex?: number;
                  }
                | undefined
            >(storageKey).then((storageItem) => {
                if (storageItem) {
                    resolve(storageItem);
                } else {
                    reject();
                }
            });
        }
    );
}

// load previous state on page reload

const loadInitialState = () =>
    chrome.runtime.sendMessage(
        { command: 'resolve-current-tab' },
        ({ tab: { id, url } }: { tab: { id: number; url: string } }) => {
            currentTab = {
                id,
                url
            };

            loadLocalState(id, url).then(({ preset, activePresetIndex }) => {
                token = enableGrid(preset, activePresetIndex);
            });
        }
    );

window.addEventListener('load', loadInitialState);
