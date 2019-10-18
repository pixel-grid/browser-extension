import PresetsActions, { editGridFormValidator } from '@/Store/Presets';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditGridForm from './editGridForm';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import IGridForm from '@/Models/IGridForm';
import { isOpera } from '@/Helpers/environment';

type EditGridViewProps = {
    index?: number;
};

const EditGridView: FunctionComponent<EditGridViewProps> = ({ index }) => {
    const grid = useSelector<IAppState, IGridForm | undefined>((state) =>
        state.presets.selectedPreset !== undefined && index !== undefined
            ? state.presets.selectedPreset.grids.length > index
                ? state.presets.selectedPreset.grids[index]
                : undefined
            : undefined
    );

    const [formChanged, setFormChanged] = useState<boolean>(false);

    const dispatch = useDispatch();
    const editGrid = useCallback(
        (form: IGridForm) => {
            if (index !== undefined) {
                dispatch(PresetsActions.editGrid({ form, index }));
                window.history.back();
            }
        },
        [dispatch, index]
    );

    const deleteGrid = useCallback(() => {
        if (index !== undefined) {
            if (
                isOpera() ||
                confirm('Are you sure that you want to delete the grid?')
            ) {
                dispatch(PresetsActions.deleteGrid(index));
                window.history.back();
            }
        }
    }, [dispatch, index]);

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
            {grid && (
                <EditGridForm
                    mode="edit"
                    initialValues={grid}
                    validate={editGridFormValidator}
                    onDelete={deleteGrid}
                    onFormChange={(pristine: boolean) => {
                        setFormChanged(!pristine);
                    }}
                    onCancel={navigateBack}
                    onSubmit={editGrid}
                />
            )}
        </div>
    );
};

export default EditGridView;
