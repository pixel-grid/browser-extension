import './editPresetForm.pcss';

import PresetsActions, {
    PresetsSelectors,
    editPresetFormValidator
} from '@/Store/Presets';
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditPresetForm from './editPresetForm';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import IPresetForm from '@/Models/IPresetForm';
import { isOpera } from '@/Helpers/environment';
import { navigate } from 'hookrouter';

type EditPresetViewProps = {
    id?: string;
};

const EditPresetView: FunctionComponent<EditPresetViewProps> = ({
    id,
    ...others
}) => {
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

    const [formChanged, setFormChanged] = useState<boolean>(false);

    const dataChanged = formChanged || nameChanged || gridsChanged;

    const dispatch = useDispatch();
    const selectPresetToEdit = useCallback(
        (id: string) => {
            dispatch(PresetsActions.selectPresetToEdit(id));
        },
        [dispatch]
    );

    const deletePreset = useCallback(() => {
        if (id !== undefined) {
            if (
                isOpera() ||
                confirm('Are you sure that you want to delete the preset?')
            ) {
                dispatch(PresetsActions.deletePreset(id));
                navigate('/presets', true);
            }
        }
    }, [dispatch, id]);

    const navigateBack = useCallback(() => {
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

    useEffect(() => {
        if (id !== undefined && (preset === undefined || preset.id !== id)) {
            selectPresetToEdit(id);
        }
    }, [id]);

    const editPreset = useCallback(
        (form: IPresetForm) => {
            dispatch(PresetsActions.editPreset.started(form));
            navigate('/presets', true);
        },
        [dispatch]
    );

    return (
        <div className="edit-preset-page">
            <Header title="Edit Preset" backButtonClick={navigateBack} />
            {preset && (
                <EditPresetForm
                    mode="edit"
                    initialValues={{
                        id,
                        name: preset.name,
                        grids: preset.grids,
                        changed: false
                    }}
                    gridsChanged={gridsChanged}
                    validate={editPresetFormValidator}
                    onDelete={deletePreset}
                    onFormChange={(pristine: boolean) => {
                        setFormChanged(!pristine);
                    }}
                    onCancel={navigateBack}
                    onSubmit={editPreset}
                />
            )}
        </div>
    );
};

export default EditPresetView;
