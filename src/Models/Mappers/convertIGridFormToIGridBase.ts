import {
    IColumnsCenterGrid,
    IColumnsLeftGrid,
    IColumnsRightGrid,
    IColumnsStretchGrid,
    IGrid,
    IGridBase,
    IRowsCenterGrid,
    IRowsStretchGrid,
    IRowsTopGrid,
    IRowsBottomGrid
} from '@sergeyzwezdin/pixelgrid';

import IGridForm from '../IGridForm';

function addColorHash(source?: string) {
    if (source !== undefined) {
        if (/^[0-9A-F]{3,6}$/gi.test(source)) {
            return '#' + source;
        } else {
            return source;
        }
    }
    return undefined;
}

function adjustOpacity(source?: number) {
    if (source !== undefined) {
        return source / 100;
    }

    return undefined;
}

export default function convertIGridFormToIGridBase(
    source?: IGridForm
): IGridBase | undefined {
    if (source === undefined) return undefined;

    if (source.layout === 'grid') {
        return <IGrid>{
            type: 'grid',
            color: addColorHash(source.gridColor),
            opacity: adjustOpacity(source.gridOpacity),
            size: source.gridSize
        };
    } else if (source.layout === 'columns') {
        if (source.columnsType === 'left') {
            return <IColumnsLeftGrid>{
                type: 'columns-left',
                color: addColorHash(source.columnsColor),
                opacity: adjustOpacity(source.columnsOpacity),
                count: source.columnsCount,
                gutter: source.columnsGutter,

                width: source.columnsWidth,
                offset: source.columnsOffset
            };
        } else if (source.columnsType === 'right') {
            return <IColumnsRightGrid>{
                type: 'columns-right',
                color: addColorHash(source.columnsColor),
                opacity: adjustOpacity(source.columnsOpacity),
                count: source.columnsCount,
                gutter: source.columnsGutter,

                width: source.columnsWidth,
                offset: source.columnsOffset
            };
        } else if (source.columnsType === 'center') {
            return <IColumnsCenterGrid>{
                type: 'columns-center',
                color: addColorHash(source.columnsColor),
                opacity: adjustOpacity(source.columnsOpacity),
                count: source.columnsCount,
                gutter: source.columnsGutter,

                width: source.columnsWidth
            };
        } else if (source.columnsType === 'stretch') {
            return <IColumnsStretchGrid>{
                type: 'columns-stretch',
                color: addColorHash(source.columnsColor),
                opacity: adjustOpacity(source.columnsOpacity),
                count: source.columnsCount,
                gutter: source.columnsGutter,

                margin: source.columnsMargin
            };
        }

        throw `Type ${source.columnsType} is unknown`;
    } else if (source.layout === 'rows') {
        if (source.rowsType === 'top') {
            return <IRowsTopGrid>{
                type: 'rows-top',
                color: addColorHash(source.rowsColor),
                opacity: adjustOpacity(source.rowsOpacity),
                count: source.rowsCount,
                gutter: source.rowsGutter,

                height: source.rowsHeight,
                offset: source.rowsOffset
            };
        } else if (source.rowsType === 'bottom') {
            return <IRowsBottomGrid>{
                type: 'rows-bottom',
                color: addColorHash(source.rowsColor),
                opacity: adjustOpacity(source.rowsOpacity),
                count: source.rowsCount,
                gutter: source.rowsGutter,

                height: source.rowsHeight,
                offset: source.rowsOffset
            };
        } else if (source.rowsType === 'center') {
            return <IRowsCenterGrid>{
                type: 'rows-center',
                color: addColorHash(source.rowsColor),
                opacity: adjustOpacity(source.rowsOpacity),
                count: source.rowsCount,
                gutter: source.rowsGutter,

                height: source.rowsHeight
            };
        } else if (source.rowsType === 'stretch') {
            return <IRowsStretchGrid>{
                type: 'rows-stretch',
                color: addColorHash(source.rowsColor),
                opacity: adjustOpacity(source.rowsOpacity),
                count: source.rowsCount,
                gutter: source.rowsGutter,

                margin: source.rowsMargin
            };
        }

        throw `Type ${source.rowsType} is unknown`;
    }

    throw `Layout ${source.layout} is unknown`;
}
