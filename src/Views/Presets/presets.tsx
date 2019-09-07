import './presets.pcss';

import * as React from 'react';

import PresetsActions, { PresetsSelectors } from '@/Store/Presets';
import { useDispatch, useSelector } from 'react-redux';

import AppContext from '@/appType';
import Button from '@material-ui/core/Button';
import Header from '@/Components/Header';
import { IAppState } from '@/store';
import List from '@/Components/List';
import { navigate } from 'hookrouter';

const PresetsView: React.FC = () => {
    const appContext = React.useContext(AppContext);

    const presets = useSelector<IAppState, { id: string; name: string }[]>(
        (state) => PresetsSelectors.presetsName(state)
    );
    const dispatch = useDispatch();
    const selectPresetToAdd = React.useCallback(
        () =>
            dispatch(
                PresetsActions.selectPresetToAdd({ navigateToView: true })
            ),
        [dispatch]
    );

    const navigateBack = React.useCallback(() => {
        navigate('/', true);
    }, []);

    return (
        <div className="presets-page">
            <Header
                title={'Presets '}
                backButtonClick={
                    appContext.type !== 'options' ? navigateBack : undefined
                }
            />

            <section className="presets-page__toolbar">
                <Button color="secondary" onClick={selectPresetToAdd}>
                    Add new preset
                </Button>
            </section>

            <section className="presets-page__list">
                <List
                    items={presets}
                    onSelect={(id: string, index?: number) =>
                        navigate(`/preset/${id}`)
                    }
                />
            </section>

            <section className="presets-page__bottom">
                <p className="presets-page__bottom-help">
                    Click on preset to edit
                </p>
            </section>
        </div>
    );
};

export default PresetsView;
