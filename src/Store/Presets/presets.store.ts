import {
    IColumnsCenterGrid,
    IColumnsStretchGrid,
    IGrid,
    IRowsTopGrid
} from '@sergeyzwezdin/pixelgrid';

import IPreset from '@/Models/IPreset';
import IPresetForm from '@/Models/IPresetForm';

export interface IPresetsStore {
    selectedPreset?: IPresetForm;
    activePresetIndex?: number;
    presets: IPreset[];
}

const defaultState: IPresetsStore = {
    selectedPreset: undefined,
    activePresetIndex: 0,
    presets: [
        {
            id: '4b7b8690-b40a-11e9-bf11-0dd4bd29a1eb',
            name: '12 columns grid',
            grids: [
                {
                    grid: <IGrid>{
                        type: 'grid',
                        color: '#000000',
                        opacity: 0.2,
                        size: 8
                    }
                },
                {
                    grid: {
                        type: 'rows-top',
                        color: '#aaaaaa',
                        opacity: 0.4,
                        gutter: 8,
                        height: 8,
                        offset: 8
                    } as IRowsTopGrid
                },
                {
                    grid: {
                        type: 'columns-center',
                        color: '#aaaaaa',
                        opacity: 0.3,
                        count: 12,
                        gutter: 32,
                        width: 92
                    } as IColumnsCenterGrid,
                    mediaQuery: '(min-width: 120rem)' // xlg
                },
                {
                    grid: {
                        type: 'columns-center',
                        color: '#aaaaaa',
                        opacity: 0.3,
                        count: 12,
                        gutter: 32,
                        width: 84
                    } as IColumnsCenterGrid,
                    mediaQuery: '(min-width: 89rem) and (max-width: 119.99rem)' // lg
                },
                {
                    grid: {
                        type: 'columns-stretch',
                        color: '#aaaaaa',
                        opacity: 0.3,
                        count: 12,
                        gutter: 16,
                        margin: 16
                    } as IColumnsStretchGrid,
                    mediaQuery: '(min-width: 84rem) and (max-width: 88.99rem)' // md
                },
                {
                    grid: {
                        type: 'columns-stretch',
                        color: '#aaaaaa',
                        opacity: 0.3,
                        count: 12,
                        gutter: 8,
                        margin: 16
                    } as IColumnsStretchGrid,
                    mediaQuery: '(min-width: 40rem) and (max-width: 83.99rem)' // sm
                },
                {
                    grid: {
                        type: 'columns-stretch',
                        color: '#aaaaaa',
                        opacity: 0.3,
                        count: 12,
                        gutter: 8,
                        margin: 16
                    } as IColumnsStretchGrid,
                    mediaQuery: '(min-width: 30rem) and (max-width: 39.99rem)' // xs
                },
                {
                    grid: {
                        type: 'columns-stretch',
                        color: '#aaaaaa',
                        opacity: 0.3,
                        count: 12,
                        gutter: 8,
                        margin: 8
                    } as IColumnsStretchGrid,
                    mediaQuery: '(max-width: 29.99rem)' //xxs
                }
            ]
        },
        {
            id: '533c6390-b40a-11e9-aff2-41b28a7a3990',
            name: '8 columns grid',
            grids: [
                {
                    grid: <IGrid>{
                        type: 'grid',
                        color: '#000000',
                        opacity: 0.2,
                        size: 8
                    }
                },
                {
                    grid: {
                        type: 'rows-top',
                        color: '#aaaaaa',
                        opacity: 0.4,
                        gutter: 8,
                        height: 8,
                        offset: 8
                    } as IRowsTopGrid
                }
            ]
        },
        {
            id: '5ca57250-b40a-11e9-8c86-cbad5b461fe9',
            name: '5 columns grid',
            grids: [
                {
                    grid: <IGrid>{
                        type: 'grid',
                        color: '#000000',
                        opacity: 0.2,
                        size: 5
                    }
                },
                {
                    grid: {
                        type: 'rows-top',
                        color: '#aaaaaa',
                        opacity: 0.4,
                        gutter: 5,
                        height: 5,
                        offset: 5
                    } as IRowsTopGrid
                }
            ]
        }
    ]
};

export default defaultState;
