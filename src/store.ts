import {
    AnyAction,
    Reducer,
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import { IPluginStore, pluginReducer, pluginSagas } from '@/Store/Plugin';
import { IPresetsStore, presetsReducer, presetsSagas } from '@/Store/Presets';
import createPersistMiddleware, { resoreAppState } from './store.persistance';
import initAction, { initReducer } from '@/Store/init';
import { isOpera, isYandex } from '@/Helpers/environment';

import PresetsActions from '@/Store/Presets';
import createSagaMiddleware from 'redux-saga';
import reduceReducers from 'redux-reduce-reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: Function;
    }
}

export interface IAppState {
    plugin: IPluginStore;
    presets: IPresetsStore;
}

const sagaMiddleware = createSagaMiddleware();
const persistMiddleware = createPersistMiddleware(
    [
        PresetsActions.addGrid,
        PresetsActions.editGrid,
        PresetsActions.deleteGrid,
        PresetsActions.addPreset.started,
        PresetsActions.addPreset.done,
        PresetsActions.addPreset.failed,
        PresetsActions.editPreset.started,
        PresetsActions.editPreset.done,
        PresetsActions.editPreset.failed,
        PresetsActions.deletePreset
    ],
    (state) => ({
        presets: {
            presets: state.presets.presets
        }
    })
);

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
          applyMiddleware(sagaMiddleware),
          applyMiddleware(persistMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(
          applyMiddleware(sagaMiddleware),
          applyMiddleware(persistMiddleware)
      );

const reducer = reduceReducers(
    combineReducers<IAppState>({
        presets: presetsReducer,
        plugin: pluginReducer
    }) as Reducer<IAppState | undefined, AnyAction>,
    initReducer as Reducer<IAppState | undefined, AnyAction>
);

export const runSagas = () => {
    sagaMiddleware.run(pluginSagas);
    sagaMiddleware.run(presetsSagas);
};

const store = createStore(reducer, enhancer);
resoreAppState().then((result) => {
    if (result !== undefined) {
        store.dispatch(initAction(result));
    }
});

export default store;
