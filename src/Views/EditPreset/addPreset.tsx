import './editPresetForm.pcss';

import * as React from 'react';

import PresetsActions, {
    PresetsSelectors,
    addPresetFormValidator
} from '@/Store/Presets';
import { useDispatch, useSelector } from 'react-redux';

import EditPresetForm from './editPresetForm';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import IPresetForm from '@/Models/IPresetForm';
import { isOpera } from '@/Helpers/environment';
import { navigate } from 'hookrouter';

const AddPresetView: React.FC = () => {
    const preset = useSelector<IAppState, IPresetForm | undefined>(
        (state) => state.presets.selectedPreset
    );
    const gridsChanged = useSelector<IAppState, boolean>(
        (state) =>
            state.presets.selectedPreset !== undefined &&
            state.presets.selectedPreset.changed
    );

    const nameChanged = useSelector<IAppState, boolean>(
        PresetsSelectors.selectedPresetNameChanged
    );

    const [formChanged, setFormChanged] = React.useState<boolean>(false);

    const dataChanged = formChanged || nameChanged || gridsChanged;

    const dispatch = useDispatch();

    const addPreset = React.useCallback(
        (form: IPresetForm) => {
            dispatch(PresetsActions.addPreset.started(form));
            navigate('/presets', true);
        },
        [dispatch]
    );

    const navigateBack = React.useCallback(() => {
        if (
            isOpera() ||
            (!dataChanged ||
                confirm(
                    'You have unsaved changes. Are you sure that you want to continue?'
                ))
        ) {
            navigate('/presets', true);
        }
    }, [dataChanged]);

    return (
        <div className="edit-preset-page">
            <Header title="Edit Preset" backButtonClick={navigateBack} />
            {preset && (
                <EditPresetForm
                    mode="add"
                    initialValues={{
                        id: '',
                        name: preset.name,
                        grids: preset.grids,
                        changed: false
                    }}
                    gridsChanged={gridsChanged}
                    validate={addPresetFormValidator}
                    onFormChange={(pristine: boolean) => {
                        setFormChanged(!pristine);
                    }}
                    onCancel={navigateBack}
                    onSubmit={addPreset}
                />
            )}
        </div>
    );
};

export default AddPresetView;
