import defaultState, { IPresetsStore } from './presets.store';

import { Action } from 'redux';
import IGridForm from '@/Models/IGridForm';
import actionCreator from './actionCreator';
import convertIGridBaseToIGridForm from '@/Models/Mappers/convertIGridBaseToIGridForm';
import { isType } from 'typescript-fsa';

const selectPresetToEditAction = actionCreator<string>('SELECT/PRESET/EDIT');

export const selectPresetToEditReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, selectPresetToEditAction)) {
        const preset = state.presets.find((item) => item.id === action.payload);

        if (preset) {
            return {
                ...state,
                selectedPreset: {
                    id: preset.id,
                    name: preset.name,
                    grids: <IGridForm[]>(
                        preset.grids
                            .map((grid) =>
                                convertIGridBaseToIGridForm(
                                    grid.grid,
                                    grid.mediaQuery
                                )
                            )
                            .filter((grid) => grid !== undefined)
                    ),
                    changed: false
                }
            };
        } else {
            return {
                ...state,
                selectedPreset: undefined
            };
        }
    }

    return state;
};

export default selectPresetToEditAction;
