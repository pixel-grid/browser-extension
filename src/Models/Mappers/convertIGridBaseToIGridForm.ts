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

import convertStringToMediaQuery from './convertStringToMediaQuery';
import IGridForm from '../IGridForm';

function removeColorHash(source?: string) {
    if (source !== undefined) {
        return source.replace(/^\#/, '');
    }

    return undefined;
}

function adjustOpacity(source?: number) {
    if (source !== undefined) {
        return source * 100;
    }

    return undefined;
}

export default function convertIGridBaseToIGridForm(
    source?: IGridBase,
    mediaQuery?: string
): IGridForm | undefined {
    if (source === undefined) return undefined;

    if (source.type === 'grid') {
        const sourceGrid = <IGrid>source;

        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'grid',
            gridSize: sourceGrid.size,
            gridColor: removeColorHash(sourceGrid.color),
            gridOpacity: adjustOpacity(sourceGrid.opacity)
        };
    } else if (source.type === 'columns-left') {
        const sourceGrid = <IColumnsLeftGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'columns',
            columnsColor: removeColorHash(sourceGrid.color),
            columnsOpacity: adjustOpacity(sourceGrid.opacity),
            columnsCount: sourceGrid.count,
            columnsGutter: sourceGrid.gutter,
            columnsType: 'left',

            columnsWidth: sourceGrid.width,
            columnsOffset: sourceGrid.offset
        };
    } else if (source.type === 'columns-right') {
        const sourceGrid = <IColumnsRightGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'columns',
            columnsColor: removeColorHash(sourceGrid.color),
            columnsOpacity: adjustOpacity(sourceGrid.opacity),
            columnsCount: sourceGrid.count,
            columnsGutter: sourceGrid.gutter,
            columnsType: 'right',

            columnsWidth: sourceGrid.width,
            columnsOffset: sourceGrid.offset
        };
    } else if (source.type === 'columns-center') {
        const sourceGrid = <IColumnsCenterGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'columns',
            columnsColor: removeColorHash(sourceGrid.color),
            columnsOpacity: adjustOpacity(sourceGrid.opacity),
            columnsCount: sourceGrid.count,
            columnsGutter: sourceGrid.gutter,
            columnsType: 'center',

            columnsWidth: sourceGrid.width
        };
    } else if (source.type === 'columns-stretch') {
        const sourceGrid = <IColumnsStretchGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'columns',
            columnsColor: removeColorHash(sourceGrid.color),
            columnsOpacity: adjustOpacity(sourceGrid.opacity),
            columnsCount: sourceGrid.count,
            columnsGutter: sourceGrid.gutter,
            columnsType: 'stretch',

            columnsMargin: sourceGrid.margin
        };
    } else if (source.type === 'rows-top') {
        const sourceGrid = <IRowsTopGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'rows',
            rowsColor: removeColorHash(sourceGrid.color),
            rowsOpacity: adjustOpacity(sourceGrid.opacity),
            rowsCount: sourceGrid.count,
            rowsGutter: sourceGrid.gutter,
            rowsType: 'top',

            rowsHeight: sourceGrid.height,
            rowsOffset: sourceGrid.offset
        };
    } else if (source.type === 'rows-bottom') {
        const sourceGrid = <IRowsBottomGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'rows',
            rowsColor: removeColorHash(sourceGrid.color),
            rowsOpacity: adjustOpacity(sourceGrid.opacity),
            rowsCount: sourceGrid.count,
            rowsGutter: sourceGrid.gutter,
            rowsType: 'bottom',

            rowsHeight: sourceGrid.height,
            rowsOffset: sourceGrid.offset
        };
    } else if (source.type === 'rows-center') {
        const sourceGrid = <IRowsCenterGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'rows',
            rowsColor: removeColorHash(sourceGrid.color),
            rowsOpacity: adjustOpacity(sourceGrid.opacity),
            rowsCount: sourceGrid.count,
            rowsGutter: sourceGrid.gutter,
            rowsType: 'center',

            rowsHeight: sourceGrid.height
        };
    } else if (source.type === 'rows-stretch') {
        const sourceGrid = <IRowsStretchGrid>source;
        return <IGridForm>{
            ...convertStringToMediaQuery(mediaQuery),

            layout: 'rows',
            rowsColor: removeColorHash(sourceGrid.color),
            rowsOpacity: adjustOpacity(sourceGrid.opacity),
            rowsCount: sourceGrid.count,
            rowsGutter: sourceGrid.gutter,
            rowsType: 'stretch',

            rowsMargin: sourceGrid.margin
        };
    }

    throw `Layout ${source.type} is unknown`;
}
