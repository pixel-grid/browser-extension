import * as React from 'react';

import PresetsActions, { editGridFormValidator } from '@/Store/Presets';
import { useDispatch, useSelector } from 'react-redux';

import EditGridForm from './editGridForm';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import IGridForm from '@/Models/IGridForm';
import { isOpera } from '@/Helpers/environment';

interface IEditGridViewProps {
    index?: number;
}

const EditGridView: React.FC<IEditGridViewProps> = ({ index }) => {
    const grid = useSelector<IAppState, IGridForm | undefined>((state) =>
        state.presets.selectedPreset !== undefined && index !== undefined
            ? state.presets.selectedPreset.grids.length > index
                ? state.presets.selectedPreset.grids[index]
                : undefined
            : undefined
    );

    const [formChanged, setFormChanged] = React.useState<boolean>(false);

    const dispatch = useDispatch();
    const editGrid = React.useCallback(
        (form: IGridForm) => {
            if (index !== undefined) {
                dispatch(PresetsActions.editGrid({ form, index }));
                window.history.back();
            }
        },
        [dispatch, index]
    );

    const deleteGrid = React.useCallback(() => {
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

    const navigateBack = React.useCallback(() => {
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
