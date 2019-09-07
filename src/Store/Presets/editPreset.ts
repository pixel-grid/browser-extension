import { Action as FsaAction, isType } from 'typescript-fsa';
import defaultState, { IPresetsStore } from './presets.store';
import { put, select, takeLatest } from 'redux-saga/effects';

import { Action } from 'redux';
import { IAppState } from '@/store';
import { IGridBase } from '@sergeyzwezdin/pixelgrid';
import IPreset from '@/Models/IPreset';
import IPresetForm from '@/Models/IPresetForm';
import actionCreator from './actionCreator';
import activatePreset from './activatePreset';
import convertIGridFormToIGridBase from '@/Models/Mappers/convertIGridFormToIGridBase';
import convertMediaQueryToString from '@/Models/Mappers/convertMediaQueryToString';

const editPresetAction = actionCreator.async<IPresetForm, IPreset, string>(
    'EDIT'
);

export const editPresetReducer = (
    state: IPresetsStore = defaultState,
    action: Action
) => {
    if (isType(action, editPresetAction.done)) {
        const presets: IPreset[] = state.presets.map((preset) => {
            if (preset.id !== action.payload.result.id) {
                return preset;
            } else {
                return action.payload.result;
            }
        });

        return {
            ...state,
            presets
        };
    }

    return state;
};

export const editPresetFormValidator = (
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
    const { id, name, grids } = action.payload;

    try {
        if (id !== undefined) {
            const result: IPreset = {
                id,
                name,
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
                editPresetAction.done({
                    result,
                    params: action.payload
                })
            );

            const activePresetIndex: number | undefined = yield select(
                (state: IAppState) => state.presets.activePresetIndex
            );

            const presets: IPreset[] = yield select(
                (state: IAppState) => state.presets.presets
            );

            if (presets.findIndex((p) => p.id === id) === activePresetIndex) {
                yield put(activatePreset(activePresetIndex));
            }
        } else {
            yield put(
                editPresetAction.failed({
                    params: action.payload,
                    error: 'Id is not defined'
                })
            );
        }
    } catch (e) {
        yield put(
            editPresetAction.failed({
                params: action.payload,
                error: e
            })
        );
    }
}

export function* editPresetSaga() {
    yield takeLatest(editPresetAction.started, handleAddPreset);
}

export default editPresetAction;
