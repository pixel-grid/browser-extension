import defaultState, { IPresetsStore } from './presets.store';

import { Action } from 'redux';
import actionCreator from './actionCreator';
import { isType } from 'typescript-fsa';

const deleteGridAction = actionCreator<number>('GRIDS/DELETE');

export const deleteGridReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, deleteGridAction)) {
        return {
            ...state,
            selectedPreset:
                state.selectedPreset !== undefined
                    ? {
                          ...state.selectedPreset,
                          grids: state.selectedPreset.grids.filter(
                              (grid, index) => index !== action.payload
                          ),
                          changed: true
                      }
                    : undefined
        };
    }

    return state;
};

export default deleteGridAction;
