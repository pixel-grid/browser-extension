import { Action, Middleware, MiddlewareAPI } from 'redux';
import { getItem, setItem } from '@/Helpers/syncStorage';

import { IAppState } from '@/store';
import { debounce } from 'lodash';

const storageKey = 'redux-state';

const saveState = debounce(
    (
        api: MiddlewareAPI,
        sliceStateToSave?: (state: IAppState) => Partial<IAppState>
    ) => {
        const fullState: IAppState = api.getState();
        const state: Partial<IAppState> =
            sliceStateToSave !== undefined
                ? sliceStateToSave(fullState)
                : fullState;

        setItem<Partial<IAppState>>(storageKey, state);
    },
    500
);

/**
 * Middleware that persists state into persistant storage
 * @param actions List of actions that will trigger to update persistance storage
 * @param sliceStateToSave Returns shape of state object that should be stored
 */
const createPersistMiddleware: (
    actions?: Action[],
    sliceStateToSave?: (state: IAppState) => Partial<IAppState>
) => Middleware = (actions, sliceStateToSave) => {
    const allowedActions: string[] | undefined =
        actions !== undefined
            ? actions.map((action) => action.type)
            : undefined;

    // sliceStateToSave()
    return (api) => (next) => (action: Action) => {
        const isAllowed =
            allowedActions === undefined ||
            allowedActions.indexOf(action.type) !== -1;

        if (isAllowed) {
            saveState(api, sliceStateToSave);
        }
        return next(action);
    };
};

/**
 * Function that restores state from persistant storage
 */
export function resoreAppState(): Promise<Partial<IAppState> | undefined> {
    return getItem<Partial<IAppState>>(storageKey);
}

export default createPersistMiddleware;
