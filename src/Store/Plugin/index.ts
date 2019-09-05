export * from './plugin.store';

import enablePlugin, {
    enablePluginReducer,
    enablePluginSaga
} from './enablePlugin';

import { fork } from 'redux-saga/effects';
import reduceReducers from 'redux-reduce-reducers';

export const pluginReducer = reduceReducers(enablePluginReducer);

export function* pluginSagas() {
    yield fork(enablePluginSaga);
}

export default { enablePlugin };
