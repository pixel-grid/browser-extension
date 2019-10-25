export function setItem<T>(key: string, value: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        if (
            window.chrome !== undefined &&
            window.chrome.storage !== undefined &&
            window.chrome.storage.sync !== undefined
        ) {
            // use Chrome storage
            window.chrome.storage.sync.set({ [key]: value }, () => {
                resolve(value);
            });
        } else if (localStorage !== undefined) {
            // fallback to local storage
            try {
                localStorage.setItem(key, JSON.stringify(value));
                resolve(value);
            } catch (e) {
                reject(e);
            }
        } else {
            reject('There is no available storage.');
        }
    });
}

export function getItem<T>(key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        if (
            window.chrome !== undefined &&
            window.chrome.storage !== undefined &&
            window.chrome.storage.sync !== undefined
        ) {
            // use Chrome storage
            window.chrome.storage.sync.get([key], (result) => {
                resolve(result[key] as T);
            });
        } else if (localStorage !== undefined) {
            // fallback to local storage
            try {
                const result: T = JSON.parse(localStorage.getItem(
                    key
                ) as string);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        } else {
            reject('There is no available storage.');
        }
    });
}
