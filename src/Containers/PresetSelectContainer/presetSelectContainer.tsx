import * as React from 'react';

import PresetsActions, { PresetsSelectors } from '@/Store/Presets';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '@/store';
import List from '@/Components/List';

const PresetSelectContainer: React.FC = () => {
    const presets = useSelector<IAppState, { id: string; name: string }[]>(
        PresetsSelectors.presetsName
    );

    const activePreset = useSelector<IAppState, number | undefined>(
        (state) => state.presets.activePresetIndex
    );

    const dispatch = useDispatch();
    const selectPreset = React.useCallback(
        (id: string, index?: number) =>
            dispatch(PresetsActions.activatePreset(index)),
        [dispatch]
    );

    return (
        <List
            items={presets}
            selectedIndex={activePreset}
            onSelect={selectPreset}
        />
    );
};

export default PresetSelectContainer;
