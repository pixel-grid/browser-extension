import defaultState, { IPresetsStore } from './presets.store';
import { put, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import actionCreator from './actionCreator';
import { isType } from 'typescript-fsa';

const deletePresetAction = actionCreator<string>('DELETE');

export const deletePresetReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, deletePresetAction)) {
        return {
            ...state,
            presets: state.presets.filter(
                (preset) => preset.id !== action.payload
            )
        };
    }

    return state;
};

export default deletePresetAction;
