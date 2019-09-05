import defaultState, { IPresetsStore } from './presets.store';
import { put, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import { Action as FsaAction } from 'typescript-fsa';
import { IGridBase } from '@sergeyzwezdin/pixelgrid';
import IPreset from '@/Models/IPreset';
import IPresetForm from '@/Models/IPresetForm';
import actionCreator from './actionCreator';
import convertIGridFormToIGridBase from '@/Models/Mappers/convertIGridFormToIGridBase';
import convertMediaQueryToString from '@/Models/Mappers/convertMediaQueryToString';
import { isType } from 'typescript-fsa';
import uuid from 'uuid/v1';

const addPresetAction = actionCreator.async<IPresetForm, IPreset, string>(
    'ADD'
);

export const addPresetReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, addPresetAction.done)) {
        return {
            ...state,
            presets: [...state.presets, action.payload.result]
        };
    }

    return state;
};

export const addPresetFormValidator = (
    form: IPresetForm
): { name?: string } => {
    return {
        name:
            form.name === undefined || form.name.length === 0
                ? 'Preset name is required'
                : undefined
    };
};

function* handleAddPreset(action: FsaAction<IPresetForm>) {
    const { name, grids } = action.payload;

    try {
        const result: IPreset = {
            id: uuid(),
            name: name,
            grids:
                grids !== undefined
                    ? (grids
                          .map((item) => ({
                              grid: convertIGridFormToIGridBase(item),
                              mediaQuery: convertMediaQueryToString(
                                  item.mediaQueryType,
                                  {
                                      mediaQueryRaw: item.mediaQueryRaw,
                                      mediaQueryFrom: item.mediaQueryFrom,
                                      mediaQueryTo: item.mediaQueryTo
                                  }
                              )
                          }))
                          .filter((item) => item.grid !== undefined) as {
                          grid: IGridBase;
                          mediaQuery?: string;
                      }[])
                    : []
        };

        yield put(
            addPresetAction.done({
                params: action.payload,
                result: result
            })
        );
    } catch (e) {
        yield put(
            addPresetAction.failed({
                params: action.payload,
                error: e
            })
        );
    }
}

export function* addPresetSaga() {
    yield takeLatest(addPresetAction.started, handleAddPreset);
}

export default addPresetAction;
