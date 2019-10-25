import { Action as FsaAction, isType } from 'typescript-fsa';
import PresetsActions, { PresetsSelectors } from '@/Store/Presets';
import defaultState, { IPluginStore } from './plugin.store';
import { delay, put, race, select, take, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import IPreset from '@/Models/IPreset';
import PluginEnableErrorReason from './Models/pluginEnableErrorReason';
import actionCreator from './actionCreator';
import { sendCommandAsync } from '@/Helpers/browser';

const enablePluginAction = actionCreator.async<
    { enable: boolean },
    { enabled: boolean; activePresetIndex?: number },
    PluginEnableErrorReason
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
            enabled: action.payload.result.enabled,
            errorReason: undefined
        };
    } else if (isType(action, enablePluginAction.failed)) {
        return {
            ...state,
            switching: false,
            errorReason: action.payload.error
        };
    }

    return state;
};

function* handleEnablePlugin(
    action: ReturnType<typeof enablePluginAction.started>
) {
    const activePreset: IPreset | undefined = yield select(
        PresetsSelectors.activePreset
    );

    const sendChannel = yield sendCommandAsync(
        action.payload.enable,
        activePreset
    );
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
        result: {
            notSupportedPage: boolean;
            enabled: boolean;
            activePresetIndex?: number;
        };
    } = yield race({
        result: take(sendChannel),
        timeout: delay(1000)
    });

    if (result !== undefined) {
        if (result.notSupportedPage === false) {
            yield put(
                enablePluginAction.done({ result, params: { enable: true } })
            );

            if (result.activePresetIndex !== undefined) {
                yield put(
                    PresetsActions.activatePreset(result.activePresetIndex)
                );
            }
        } else {
            yield put(
                enablePluginAction.failed({
                    error: 'NOT_SUPPORTED',
                    params: { enable: true }
                })
            );
        }
    } else {
        yield put(
            enablePluginAction.failed({
                error: 'NOT_SUPPORTED',
                params: { enable: true }
            })
        );
    }
}

export default enablePluginAction;
