import { Action as FsaAction, isType } from 'typescript-fsa';
import defaultState, { IPluginStore } from './plugin.store';
import { delay, put, race, select, take, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import IPreset from '@/Models/IPreset';
import PresetsActions from '@/Store/Presets';
import { PresetsSelectors } from '@/Store/Presets';
import actionCreator from './actionCreator';
import { sendCommandAsync } from '@/Helpers/browser';

const enablePluginAction = actionCreator.async<
    boolean,
    { enabled: boolean; activePresetIndex?: number },
    string
>('ENABLE');

export const enablePluginReducer = (
    state: IPluginStore = defaultState,
    action: Action
) => {
    if (isType(action, enablePluginAction.started)) {
        return {
            ...state,
            switching: true
        };
    } else if (isType(action, enablePluginAction.done)) {
        return {
            ...state,
            switching: false,
            enabled: action.payload.result.enabled
        };
    } else if (isType(action, enablePluginAction.failed)) {
        return {
            ...state,
            switching: false,
            errorMessage: action.payload.error
        };
    }

    return state;
};

function* handleEnablePlugin(action: FsaAction<boolean>) {
    const activePreset: IPreset | undefined = yield select(
        PresetsSelectors.activePreset
    );

    const sendChannel = yield sendCommandAsync(action.payload, activePreset);
    const result: {
        enabled: boolean;
        activePresetIndex?: number;
    } = yield take(sendChannel);

    yield put(enablePluginAction.done({ result, params: action.payload }));
}

export function* enablePluginSaga() {
    // handle enable toggling
    yield takeLatest(enablePluginAction.started, handleEnablePlugin);

    // get initial status
    const sendChannel = yield sendCommandAsync();
    const {
        result
    }: {
        result: { enabled: boolean; activePresetIndex?: number };
    } = yield race({
        result: take(sendChannel),
        timeout: delay(1000)
    });

    if (result !== undefined) {
        yield put(enablePluginAction.done({ result, params: true }));

        if (result.activePresetIndex !== undefined) {
            yield put(PresetsActions.activatePreset(result.activePresetIndex));
        }
    }
}

export default enablePluginAction;
