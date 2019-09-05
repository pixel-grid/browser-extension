import { IAppState } from '@/store';
import IPreset from '@/Models/IPreset';
import IPresetForm from '@/Models/IPresetForm';
import { createSelector } from 'reselect';

export default {
    presetsName: createSelector(
        (state: IAppState) => state.presets.presets,
        (presets: IPreset[]) =>
            presets.map((preset) => ({ id: preset.id, name: preset.name }))
    ),

    /**
     * Selector that returns that name of selected preset was changed
     */
    selectedPresetNameChanged: createSelector(
        (state: IAppState) => state.presets.selectedPreset,
        (state: IAppState) => state.presets.presets,
        (selectedPreset: IPresetForm | undefined, presets: IPreset[]) => {
            if (selectedPreset !== undefined) {
                if (selectedPreset.id === undefined) {
                    // new preset
                    return !!selectedPreset.name;
                } else {
                    // edit preset
                    const initialValue = presets.find(
                        (p) => p.id === selectedPreset.id
                    );

                    if (initialValue !== undefined) {
                        return selectedPreset.name !== initialValue.name;
                    } else {
                        // no initial preset
                        return !!selectedPreset.name;
                    }
                }
            }

            return false;
        }
    ),

    activePreset: createSelector(
        (state: IAppState) => state.presets.presets,
        (state: IAppState) => state.presets.activePresetIndex,
        (presets: IPreset[], activePresetIndex?: number) => {
            if (activePresetIndex !== undefined) {
                if (presets.length > activePresetIndex) {
                    return presets[activePresetIndex];
                }
            } else return undefined;
        }
    )
};
