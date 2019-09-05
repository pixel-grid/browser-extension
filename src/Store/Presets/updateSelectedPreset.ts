import defaultState, { IPresetsStore } from './presets.store';

import { Action } from 'redux';
import actionCreator from './actionCreator';
import { isType } from 'typescript-fsa';

const updateSelectedPresetAction = actionCreator<{ name: string }>(
    'SELECTED/UPDATE'
);

export const updateSelectedPresetReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, updateSelectedPresetAction)) {
        return {
            ...state,
            selectedPreset:
                state.selectedPreset !== undefined
                    ? {
                          ...state.selectedPreset,
                          ...action.payload
                      }
                    : undefined
        };
    }

    return state;
};

export default updateSelectedPresetAction;
