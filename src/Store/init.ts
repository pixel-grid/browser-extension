import actionCreatorFactory, { isType } from 'typescript-fsa';

import { Action } from 'redux';
import { IAppState } from '@/store';

const actionCreator = actionCreatorFactory('STATE');
const initAction = actionCreator<Partial<IAppState>>('INIT');

export const initReducer = (state: IAppState, action: Action) => {
    if (isType(action, initAction)) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
};

export default initAction;
