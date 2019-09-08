import { IPreset, destroyGrid, initializeGrid } from '@sergeyzwezdin/pixelgrid';

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

                sendResponse({ activePresetIndex, enabled: true });
                break;

            case 'disable':
                if (token) {
                    destroyGrid(token);
                    token = undefined;
                }

                sendResponse({
                    enabled: false,
                    activePresetIndex: undefined
                });
                break;
        }
    }
}

if (window.chrome && window.chrome.runtime && window.chrome.runtime.onMessage) {
    window.chrome.runtime.onMessage.addListener(onMessageCallback);
} else if (
    isFirefox() &&
    browser &&
    browser.runtime &&
    browser.runtime.onMessage
) {
    // Firefox
    browser.runtime.onMessage.addListener(onMessageCallback);
} else if (
    window.browser &&
    window.browser.runtime &&
    window.browser.runtime.onMessage
) {
    // Microsoft Edge
    window.browser.runtime.onMessage.addListener(onMessageCallback);
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
