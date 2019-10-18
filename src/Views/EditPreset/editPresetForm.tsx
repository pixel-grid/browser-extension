import './editPresetForm.pcss';

import { Field, Form, FormSpy } from 'react-final-form';
import PresetsActions, { PresetsSelectors } from '@/Store/Presets';
import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import { IAppState } from '@/store';
import IPresetForm from '@/Models/IPresetForm';
import List from '@/Components/List';
import { TextFieldInput } from '@/Components/Form';
import { debounce } from 'lodash';
import generateGridName from '@/Models/Helpers/generateGridName';
import { navigate } from 'hookrouter';

type EditPresetFormViewProps = {
    mode: 'add' | 'edit';
    initialValues?: IPresetForm;
    gridsChanged: boolean;
    validate?: (values: IPresetForm) => {};
    onDelete?: () => void;
    onFormChange?: (pristine: boolean) => void;
    onCancel?: () => void;
    onSubmit: (values: IPresetForm) => void;
};

const EditPresetFormView: FunctionComponent<EditPresetFormViewProps> = ({
    mode,
    initialValues,
    gridsChanged,
    validate,
    onDelete,
    onFormChange,
    onCancel,
    onSubmit
}) => {
    const nameChanged = useSelector<IAppState, boolean>(
        PresetsSelectors.selectedPresetNameChanged
    );

    const dispatch = useDispatch();
    const updateSelectedPresetData = useCallback(
        debounce((name: string) => {
            dispatch(PresetsActions.updateSelectedPreset({ name }));
        }, 500),
        [dispatch]
    );

    return (
        <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, pristine, values, valid }) => (
                <form
                    className="edit-preset-page__form"
                    onSubmit={handleSubmit}
                >
                    <section className="edit-preset-page__inputs">
                        <Field
                            name="name"
                            title="Name"
                            fullWidth={true}
                            outlined={true}
                            component={TextFieldInput}
                        />
                    </section>

                    <section className="edit-preset-page__toolbar">
                        <Button
                            color="secondary"
                            onClick={() => navigate('/grid')}
                        >
                            Add new grid
                        </Button>
                    </section>

                    <section className="edit-preset-page__list">
                        <List
                            items={values.grids.map((grid, index) => ({
                                id: `${index}`,
                                name: generateGridName(grid),
                                type: grid.layout
                            }))}
                            onSelect={(id: string, index?: number) => {
                                navigate(`/grid/${id}`);
                            }}
                        />
                    </section>

                    <section className="edit-preset-page__bottom">
                        {onDelete !== undefined && (
                            <div className="edit-preset-page__bottom__left">
                                <Button
                                    disabled={submitting}
                                    color="secondary"
                                    onClick={onDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                        <div className="edit-preset-page__bottom__right">
                            <Button
                                disabled={submitting}
                                variant="outlined"
                                color="primary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={
                                    (pristine &&
                                        !gridsChanged &&
                                        !nameChanged) ||
                                    !valid ||
                                    submitting
                                }
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {mode === 'add' &&
                                    (!submitting ? 'Add' : 'Adding...')}
                                {mode === 'edit' &&
                                    (!submitting ? 'Save' : 'Saving...')}
                            </Button>
                            <FormSpy
                                onChange={(state) => {
                                    updateSelectedPresetData(state.values.name);

                                    if (onFormChange) {
                                        onFormChange(state.pristine);
                                    }
                                }}
                            />
                        </div>
                    </section>
                </form>
            )}
        />
    );
};

export default EditPresetFormView;
