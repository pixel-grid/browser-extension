import './editGridForm.pcss';

import * as React from 'react';

import { Field, Form, FormSpy } from 'react-final-form';
import {
    NumericFieldInput,
    SelectFieldInput,
    TextFieldInput
} from '@/Components/Form';

import Button from '@material-ui/core/Button';
import IGridForm from '@/Models/IGridForm';

interface IEditGridFormViewProps {
    mode: 'add' | 'edit';
    initialValues?: IGridForm;
    validate?: (values: IGridForm) => {};
    onDelete?: () => void;
    onFormChange?: (pristine: boolean) => void;
    onCancel?: () => void;
    onSubmit: (values: IGridForm) => void;
}

const EditGridFormView: React.FC<IEditGridFormViewProps> = ({
    mode,
    initialValues,
    validate,
    onDelete,
    onFormChange,
    onCancel,
    onSubmit
}) => (
    <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values, valid }) => {
            const { layout, columnsType, rowsType, mediaQueryType } = values;
            return (
                <form className="edit-grid-page__form" onSubmit={handleSubmit}>
                    <section className="edit-grid-page__inputs">
                        <div className="edit-grid-page__input-layout">
                            <Field
                                name="layout"
                                title="Layout"
                                fullWidth={true}
                                items={[
                                    {
                                        value: 'grid',
                                        text: 'Grid'
                                    },
                                    {
                                        value: 'columns',
                                        text: 'Columns'
                                    },
                                    {
                                        value: 'rows',
                                        text: 'Rows'
                                    }
                                ]}
                                component={SelectFieldInput}
                            />
                        </div>

                        {layout === 'grid' && (
                            <>
                                <div className="edit-grid-page__input-size">
                                    <Field
                                        name="gridSize"
                                        title="Size"
                                        fullWidth={true}
                                        suffix="px"
                                        helperText="Size of cell in pixels"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-color">
                                    <Field
                                        name="gridColor"
                                        title="Color"
                                        fullWidth={true}
                                        helperText="Color name or HEX code"
                                        component={TextFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-colora">
                                    <Field
                                        name="gridOpacity"
                                        title="Opacity"
                                        fullWidth={true}
                                        suffix="%"
                                        helperText="Opacity in %"
                                        component={NumericFieldInput}
                                    />
                                </div>
                            </>
                        )}

                        {layout === 'columns' && (
                            <>
                                <div className="edit-grid-page__input-count">
                                    <Field
                                        name="columnsCount"
                                        title="Count"
                                        fullWidth={true}
                                        helperText="Column count (keep empty to fill all space)"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-color">
                                    <Field
                                        name="columnsColor"
                                        title="Color"
                                        fullWidth={true}
                                        helperText="Color name or HEX code"
                                        component={TextFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-colora">
                                    <Field
                                        name="columnsOpacity"
                                        title="Opacity"
                                        fullWidth={true}
                                        suffix="%"
                                        helperText="Opacity in %"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-type">
                                    <Field
                                        name="columnsType"
                                        title="Type"
                                        fullWidth={true}
                                        items={[
                                            {
                                                value: 'left',
                                                text: 'Left'
                                            },
                                            {
                                                value: 'right',
                                                text: 'Right'
                                            },
                                            {
                                                value: 'center',
                                                text: 'Center'
                                            },
                                            {
                                                value: 'stretch',
                                                text: 'Stretch'
                                            }
                                        ]}
                                        helperText="Columns grid alignment"
                                        component={SelectFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-width">
                                    <Field
                                        name="columnsWidth"
                                        title="Width"
                                        fullWidth={true}
                                        disabled={
                                            columnsType !== 'left' &&
                                            columnsType !== 'right' &&
                                            columnsType !== 'center'
                                        }
                                        suffix="px"
                                        helperText="Column width in pixels"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                {(columnsType === 'left' ||
                                    columnsType === 'right') && (
                                    <div className="edit-grid-page__input-offset">
                                        <Field
                                            name="columnsOffset"
                                            title="Offset"
                                            fullWidth={true}
                                            suffix="px"
                                            helperText="Grid offset from start"
                                            component={NumericFieldInput}
                                        />
                                    </div>
                                )}
                                {columnsType === 'stretch' && (
                                    <div className="edit-grid-page__input-margin">
                                        <Field
                                            name="columnsMargin"
                                            title="Margin"
                                            fullWidth={true}
                                            suffix="px"
                                            helperText="Margin from left/right in pixels"
                                            component={NumericFieldInput}
                                        />
                                    </div>
                                )}

                                <div className="edit-grid-page__input-gutter">
                                    <Field
                                        name="columnsGutter"
                                        title="Gutter"
                                        fullWidth={true}
                                        suffix="px"
                                        helperText="Glutter width in pixels"
                                        component={NumericFieldInput}
                                    />
                                </div>
                            </>
                        )}

                        {layout === 'rows' && (
                            <>
                                <div className="edit-grid-page__input-count">
                                    <Field
                                        name="rowsCount"
                                        title="Count"
                                        fullWidth={true}
                                        helperText="Row count (keep empty to fill all space)"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-color">
                                    <Field
                                        name="rowsColor"
                                        title="Color"
                                        fullWidth={true}
                                        helperText="Color name or HEX code"
                                        component={TextFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-colora">
                                    <Field
                                        name="rowsOpacity"
                                        title="Opacity"
                                        fullWidth={true}
                                        suffix="%"
                                        helperText="Opacity in %"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-type">
                                    <Field
                                        name="rowsType"
                                        title="Type"
                                        fullWidth={true}
                                        items={[
                                            {
                                                value: 'top',
                                                text: 'Top'
                                            },
                                            {
                                                value: 'bottom',
                                                text: 'Bottom'
                                            },
                                            {
                                                value: 'center',
                                                text: 'Center'
                                            },
                                            {
                                                value: 'stretch',
                                                text: 'Stretch'
                                            }
                                        ]}
                                        helperText="Rows grid alignment"
                                        component={SelectFieldInput}
                                    />
                                </div>

                                <div className="edit-grid-page__input-height">
                                    <Field
                                        name="rowsHeight"
                                        title="Height"
                                        fullWidth={true}
                                        disabled={
                                            rowsType !== 'top' &&
                                            rowsType !== 'bottom' &&
                                            rowsType !== 'center'
                                        }
                                        suffix="px"
                                        helperText="Row height in pixels"
                                        component={NumericFieldInput}
                                    />
                                </div>

                                {(rowsType === 'top' ||
                                    rowsType === 'bottom') && (
                                    <div className="edit-grid-page__input-offset">
                                        <Field
                                            name="rowsOffset"
                                            title="Offset"
                                            fullWidth={true}
                                            suffix="px"
                                            helperText="Grid offset from start"
                                            component={NumericFieldInput}
                                        />
                                    </div>
                                )}
                                {rowsType === 'stretch' && (
                                    <div className="edit-grid-page__input-margin">
                                        <Field
                                            name="rowsMargin"
                                            title="Margin"
                                            fullWidth={true}
                                            suffix="px"
                                            helperText="Margin from top/bottom in pixels"
                                            component={NumericFieldInput}
                                        />
                                    </div>
                                )}

                                <div className="edit-grid-page__input-gutter">
                                    <Field
                                        name="rowsGutter"
                                        title="Gutter"
                                        fullWidth={true}
                                        suffix="px"
                                        helperText="Glutter height in pixels"
                                        component={NumericFieldInput}
                                    />
                                </div>
                            </>
                        )}

                        <div className="edit-grid-page__input-mediaquery">
                            <div className="edit-grid-page__input-mediaquery-type">
                                <Field
                                    name="mediaQueryType"
                                    title="Media query type"
                                    items={[
                                        {
                                            value: 'raw',
                                            text: 'Media query'
                                        },
                                        {
                                            value: 'boundaries',
                                            text: 'Boundaries'
                                        }
                                    ]}
                                    fullWidth={true}
                                    component={SelectFieldInput}
                                />
                            </div>
                            {mediaQueryType !== undefined && (
                                <div className="edit-grid-page__input-mediaquery-value">
                                    {mediaQueryType === 'raw' && (
                                        <div className="edit-grid-page__input-mediaquery-raw">
                                            <Field
                                                name="mediaQueryRaw"
                                                title="Media query"
                                                fullWidth={true}
                                                helperText="CSS media query that determines visibility of the grid (optional)"
                                                component={TextFieldInput}
                                            />
                                        </div>
                                    )}
                                    {mediaQueryType === 'boundaries' && (
                                        <>
                                            <div className="edit-grid-page__input-mediaquery-from">
                                                <Field
                                                    name="mediaQueryFrom"
                                                    title="From"
                                                    helperText="In PX, REM or EM"
                                                    fullWidth={true}
                                                    component={TextFieldInput}
                                                />
                                            </div>
                                            <div className="edit-grid-page__input-mediaquery-to">
                                                <Field
                                                    name="mediaQueryTo"
                                                    title="To"
                                                    helperText="In PX, REM or EM"
                                                    fullWidth={true}
                                                    component={TextFieldInput}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="edit-grid-page__bottom">
                        {onDelete !== undefined && (
                            <div className="edit-grid-page__bottom__left">
                                <Button
                                    disabled={submitting}
                                    color="secondary"
                                    onClick={onDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                        <div className="edit-grid-page__bottom__right">
                            <Button
                                disabled={submitting}
                                variant="outlined"
                                color="primary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={pristine || !valid || submitting}
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
                                    if (onFormChange) {
                                        onFormChange(state.pristine);
                                    }
                                }}
                            />
                        </div>
                    </section>
                </form>
            );
        }}
    />
);

export default EditGridFormView;
