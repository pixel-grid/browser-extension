import { IPreset, destroyGrid, initializeGrid } from '@sergeyzwezdin/pixelgrid';

import IPresetModel from '@/Models/IPreset';

function write(text: string) {
    var newElement = document.createElement('p');
    newElement.textContent = text;
    newElement.style.color = 'red';
    document.body.insertBefore(newElement, document.body.firstChild);
}

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
        safari: {
            application: {
                activeBrowserWindow: {
                    activeTab: {
                        page: {
                            dispatchMessage: Function;
                        };
                        addEventListener: Function;
                        removeEventListener: Function;
                    };
                };
            };
            self: {
                tab: {
                    dispatchMessage: Function;
                };
                addEventListener: Function;
            };
        };
    }
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

                sendResponse({ enabled: true, activePresetIndex });
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
    window.browser &&
    window.browser.runtime &&
    window.browser.runtime.onMessage
) {
    // Microsoft Edge
    window.browser.runtime.onMessage.addListener(onMessageCallback);
} else if (window.safari) {
    // Safari
    window.safari.self.addEventListener(
        'message',
        function(request: { message: {} }) {
            const { message } = request;
            onMessageCallback(
                message,
                {} as chrome.runtime.MessageSender,
                (response?: {}) => {
                    window.safari.self.tab.dispatchMessage('message', response);
                }
            );
        },
        false
    );
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
