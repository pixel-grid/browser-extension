import { Action as FsaAction, isType } from 'typescript-fsa';
import defaultState, { IPresetsStore } from './presets.store';
import { select, take, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import { IAppState } from '@/store';
import IPreset from '@/Models/IPreset';
import { PresetsSelectors } from '@/Store/Presets';
import actionCreator from './actionCreator';
import { sendCommandAsync } from '@/Helpers/browser';

const activatePresetAction = actionCreator<number | undefined>(
    'PRESETS/SELECT'
);

export const activatePresetReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, activatePresetAction)) {
        return {
            ...state,
            activePresetIndex: action.payload
        };
    }

    return state;
};

function* handleActivatePreset() {
    const enabled: boolean = yield select(
        (state: IAppState) => state.plugin.enabled
    );

    const activePreset: IPreset | undefined = yield select(
        PresetsSelectors.activePreset
    );

    const activePresetIndex: number | undefined = yield select(
        (state: IAppState) => state.presets.activePresetIndex
    );

    const sendChannel = yield sendCommandAsync(
        enabled,
        activePreset,
        activePresetIndex
    );
    yield take(sendChannel);
}

export function* activatePresetSaga() {
    yield takeLatest(activatePresetAction, handleActivatePreset);
}

export default activatePresetAction;
