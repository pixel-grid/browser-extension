import PresetsActions, { PresetsSelectors } from '@/Store/Presets';
import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '@/store';
import List from '@/Components/List';

const PresetSelectContainer: FunctionComponent = () => {
    const presets = useSelector<IAppState, { id: string; name: string }[]>(
        PresetsSelectors.presetsName
    );

    const activePreset = useSelector<IAppState, number | undefined>(
        (state) => state.presets.activePresetIndex
    );

    const dispatch = useDispatch();
    const selectPreset = useCallback(
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
