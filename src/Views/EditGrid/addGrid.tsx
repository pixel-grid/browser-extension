import PresetsActions, { addGridFormValidator } from '@/Store/Presets';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditGridForm from './editGridForm';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import IGridForm from '@/Models/IGridForm';
import IPresetForm from '@/Models/IPresetForm';
import { isOpera } from '@/Helpers/environment';

const AddGridView: FunctionComponent = () => {
    const preset = useSelector<IAppState, IPresetForm | undefined>(
        (state) => state.presets.selectedPreset
    );

    const [formChanged, setFormChanged] = useState<boolean>(false);

    const dispatch = useDispatch();
    const addGrid = useCallback(
        (form: IGridForm) => {
            dispatch(PresetsActions.addGrid(form));
            window.history.back();
        },
        [dispatch]
    );

    const navigateBack = useCallback(() => {
        if (
            isOpera() ||
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
