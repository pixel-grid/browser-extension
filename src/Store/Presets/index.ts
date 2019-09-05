export * from './presets.store';

import activatePreset, {
    activatePresetReducer,
    activatePresetSaga
} from './activatePreset';
import addGrid, { addGridFormValidator, addGridReducer } from './addGrid';
import addPreset, {
    addPresetFormValidator,
    addPresetReducer,
    addPresetSaga
} from './addPreset';
import deleteGrid, { deleteGridReducer } from './deleteGrid';
import deletePreset, { deletePresetReducer } from './deletePreset';
import editGrid, { editGridFormValidator, editGridReducer } from './editGrid';
import editPreset, {
    editPresetFormValidator,
    editPresetReducer,
    editPresetSaga
} from './editPreset';
import selectPresetToAdd, {
    selectPresetToAddReducer,
    selectPresetToAddSaga
} from './selectPresetToAdd';
import selectPresetToEdit, {
    selectPresetToEditReducer
} from './selectPresetToEdit';
import updateSelectedPreset, {
    updateSelectedPresetReducer
} from './updateSelectedPreset';

import { fork } from 'redux-saga/effects';
import reduceReducers from 'redux-reduce-reducers';

export const presetsReducer = reduceReducers(
    activatePresetReducer,
    selectPresetToAddReducer,
    selectPresetToEditReducer,
    addPresetReducer,
    editPresetReducer,
    deletePresetReducer,
    addGridReducer,
    editGridReducer,
    deleteGridReducer,
    updateSelectedPresetReducer
);

export { default as PresetsSelectors } from './presets.selectors';
export { addPresetFormValidator };
export { editPresetFormValidator };
export { addGridFormValidator };
export { editGridFormValidator };

export function* presetsSagas() {
    yield fork(addPresetSaga);
    yield fork(editPresetSaga);
    yield fork(selectPresetToAddSaga);
    yield fork(activatePresetSaga);
}

export default {
    activatePreset,
    selectPresetToAdd,
    selectPresetToEdit,
    addPreset,
    editPreset,
    deletePreset,
    addGrid,
    editGrid,
    deleteGrid,
    updateSelectedPreset
};
