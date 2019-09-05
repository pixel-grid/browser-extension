import defaultState, { IPresetsStore } from './presets.store';

import { Action } from 'redux';
import { Action as FsaAction } from 'typescript-fsa';
import actionCreator from './actionCreator';
import { isType } from 'typescript-fsa';
import { navigate } from 'hookrouter';
import { takeLatest } from 'redux-saga/effects';

const selectPresetToAddAction = actionCreator<{ navigateToView?: boolean }>(
    'SELECT/PRESET/ADD'
);

export const selectPresetToAddReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, selectPresetToAddAction)) {
        return {
            ...state,
            selectedPreset: {
                id: undefined,
                name: '',
                grids: [],
                changed: false
            }
        };
    }

    return state;
};

function* handleSelectPresetToAdd(
    action: FsaAction<{ navigateToView?: boolean }>
) {
    if (action.payload.navigateToView === true) {
        navigate('/preset');
    }
    yield;
}

export function* selectPresetToAddSaga() {
    yield takeLatest(selectPresetToAddAction, handleSelectPresetToAdd);
}
export default selectPresetToAddAction;
