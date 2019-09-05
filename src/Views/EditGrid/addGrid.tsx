import * as React from 'react';

import PresetsActions, { addGridFormValidator } from '@/Store/Presets';
import { isOpera, isSafari, isYandex } from '@/Helpers/environment';
import { useDispatch, useSelector } from 'react-redux';

import EditGridForm from './editGridForm';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import IGridForm from '@/Models/IGridForm';
import IPresetForm from '@/Models/IPresetForm';

const AddGridView: React.FC = () => {
    const preset = useSelector<IAppState, IPresetForm | undefined>(
        (state) => state.presets.selectedPreset
    );

    const [formChanged, setFormChanged] = React.useState<boolean>(false);

    const dispatch = useDispatch();
    const addGrid = React.useCallback(
        (form: IGridForm) => {
            dispatch(PresetsActions.addGrid(form));
            window.history.back();
        },
        [dispatch]
    );

    const navigateBack = React.useCallback(() => {
        if (
            isOpera() ||
            isYandex() ||
            isSafari() ||
            (!formChanged ||
                confirm(
                    'You have unsaved changes. Are you sure that you want to continue?'
                ))
        ) {
            window.history.back();
        }
    }, [formChanged]);

    return (
        <div className="edit-grid-page">
            <Header title="Edit Grid" backButtonClick={navigateBack} />

            {preset && (
                <EditGridForm
                    mode="add"
                    initialValues={{
                        layout: 'grid',
                        columnsType: 'left',
                        rowsType: 'top',
                        mediaQueryType: 'boundaries',
                        mediaQueryRaw: '',
                        mediaQueryFrom: '',
                        mediaQueryTo: ''
                    }}
                    validate={addGridFormValidator}
                    onFormChange={(pristine: boolean) => {
                        setFormChanged(!pristine);
                    }}
                    onCancel={navigateBack}
                    onSubmit={addGrid}
                />
            )}
        </div>
    );
};

export default AddGridView;
