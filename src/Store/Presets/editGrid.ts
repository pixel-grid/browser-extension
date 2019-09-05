import defaultState, { IPresetsStore } from './presets.store';

import { Action } from 'redux';
import IGridForm from '@/Models/IGridForm';
import actionCreator from './actionCreator';
import { isType } from 'typescript-fsa';

const editGridAction = actionCreator<{ form: IGridForm; index: number }>(
    'GRIDS/EDIT'
);

export const editGridReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, editGridAction)) {
        return {
            ...state,
            selectedPreset:
                state.selectedPreset !== undefined
                    ? {
                          ...state.selectedPreset,
                          grids: state.selectedPreset.grids.map((grid, index) =>
                              index !== action.payload.index
                                  ? grid
                                  : action.payload.form
                          ),
                          changed: true
                      }
                    : undefined
        };
    }

    return state;
};

export const editGridFormValidator = (
    form: IGridForm
): {
    layout?: string;

    gridSize?: string;
    gridColor?: string;
    gridOpacity?: string;

    columnsCount?: string;
    columnsColor?: string;
    columnsOpacity?: string;
    columnsType?: string;
    columnsWidth?: string;
    columnsOffset?: string;
    columnsMargin?: string;
    columnsGutter?: string;

    rowsCount?: string;
    rowsColor?: string;
    rowsOpacity?: string;
    rowsType?: string;
    rowsHeight?: string;
    rowsOffset?: string;
    rowsMargin?: string;
    rowsGutter?: string;
} => {
    if (form.layout === 'grid') {
        return {
            gridSize:
                form.gridSize === undefined || form.gridSize <= 0
                    ? 'Grid size should be greater than zero'
                    : undefined,
            gridColor:
                form.gridColor === undefined
                    ? 'Grid color should be defined'
                    : undefined,
            gridOpacity:
                form.gridOpacity === undefined || form.gridOpacity <= 0
                    ? 'Grid opacity should be greater than zero'
                    : form.gridOpacity > 100
                    ? 'Grid opacity should be less or equal than 100'
                    : undefined
        };
    } else if (form.layout === 'columns') {
        const result = {
            columnsCount:
                form.columnsCount !== undefined && form.columnsCount <= 0
                    ? 'Columns count should be greater than zero'
                    : undefined,
            columnsColor:
                form.columnsColor === undefined
                    ? 'Grid color should be defined'
                    : undefined,
            columnsOpacity:
                form.columnsOpacity === undefined || form.columnsOpacity <= 0
                    ? 'Grid opacity should be greater than zero'
                    : form.columnsOpacity > 100
                    ? 'Grid opacity should be less or equal than 100'
                    : undefined,
            columnsGutter:
                form.columnsGutter === undefined || form.columnsGutter < 0
                    ? 'Column gutter should be greater or equal to zero'
                    : undefined
        };

        if (form.columnsType === 'left') {
            return {
                ...result,
                columnsWidth:
                    form.columnsWidth === undefined || form.columnsWidth <= 0
                        ? 'Column width should be greater than zero'
                        : undefined,
                columnsOffset:
                    form.columnsOffset === undefined || form.columnsOffset < 0
                        ? 'Column offset should be greater or equal to zero'
                        : undefined
            };
        } else if (form.columnsType === 'right') {
            return {
                ...result,
                columnsWidth:
                    form.columnsWidth === undefined || form.columnsWidth <= 0
                        ? 'Column width should be greater than zero'
                        : undefined,
                columnsOffset:
                    form.columnsOffset === undefined || form.columnsOffset < 0
                        ? 'Column offset should be greater or equal to zero'
                        : undefined
            };
        } else if (form.columnsType === 'center') {
            return {
                ...result,
                columnsWidth:
                    form.columnsWidth === undefined || form.columnsWidth <= 0
                        ? 'Column width should be greater than zero'
                        : undefined
            };
        } else if (form.columnsType === 'stretch') {
            return {
                ...result,
                columnsMargin:
                    form.columnsMargin === undefined || form.columnsMargin <= 0
                        ? 'Column margin should be greater or equal to zero'
                        : undefined
            };
        } else {
            return {
                ...result,
                columnsType: 'Columns layout type is required'
            };
        }
    } else if (form.layout === 'rows') {
        const result = {
            rowsCount:
                form.rowsCount !== undefined && form.rowsCount <= 0
                    ? 'Rows count should be greater than zero'
                    : undefined,
            rowsColor:
                form.rowsColor === undefined
                    ? 'Grid color should be defined'
                    : undefined,
            rowsOpacity:
                form.rowsOpacity === undefined || form.rowsOpacity <= 0
                    ? 'Grid opacity should be greater than zero'
                    : form.rowsOpacity > 100
                    ? 'Grid opacity should be less or equal than 100'
                    : undefined,
            rowsGutter:
                form.rowsGutter === undefined || form.rowsGutter < 0
                    ? 'Row gutter should be greater or equal to zero'
                    : undefined
        };

        if (form.rowsType === 'top') {
            return {
                ...result,
                rowsHeight:
                    form.rowsHeight === undefined || form.rowsHeight <= 0
                        ? 'Row height should be greater than zero'
                        : undefined,
                rowsOffset:
                    form.rowsOffset === undefined || form.rowsOffset < 0
                        ? 'Row offset should be greater or equal to zero'
                        : undefined
            };
        } else if (form.rowsType === 'bottom') {
            return {
                ...result,
                rowsHeight:
                    form.rowsHeight === undefined || form.rowsHeight <= 0
                        ? 'Column height should be greater than zero'
                        : undefined,
                rowsOffset:
                    form.rowsOffset === undefined || form.rowsOffset < 0
                        ? 'Row offset should be greater or equal to zero'
                        : undefined
            };
        } else if (form.rowsType === 'center') {
            return {
                ...result,
                rowsHeight:
                    form.rowsHeight === undefined || form.rowsHeight <= 0
                        ? 'Column height should be greater than zero'
                        : undefined
            };
        } else if (form.rowsType === 'stretch') {
            return {
                ...result,
                rowsMargin:
                    form.rowsMargin === undefined || form.rowsMargin <= 0
                        ? 'Row margin should be greater or equal to zero'
                        : undefined
            };
        } else {
            return {
                ...result,
                columnsType: 'Row layout type is required'
            };
        }
    } else {
        return { layout: 'Layout type is required' };
    }
};

export default editGridAction;
