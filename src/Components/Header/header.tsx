import './header.pcss';

import * as React from 'react';

import { resolveAssetUrl } from '@/Helpers/environment';

const logo = require('./assets/header-logo.svg');
const back = require('./assets/header-back.svg');
const gihub = require('./assets/header-github.svg');

interface IHeaderProps {
    title: string;
    githubLink?: string;
    backButtonClick?: () => void;
}

const Header: React.FC<IHeaderProps> = ({
    title,
    githubLink,
    backButtonClick
}) => {
    const backButtonClickHander = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();

            if (backButtonClick) {
                backButtonClick();
            }
        },
        [backButtonClick]
    );

    return (
        <header className="header">
            {!backButtonClick && (
                <div className="header__logo">
                    <img
                        src={resolveAssetUrl(logo)}
                        className="header__logo-image"
                    />
                </div>
            )}

            {backButtonClick && (
                <div className="header__button">
                    <a
                        href="#"
                        className="header__button-link"
                        onClick={backButtonClickHander}
                    >
                        <img
                            src={resolveAssetUrl(back)}
                            className="header__button-back-image"
                        />
                    </a>
                </div>
            )}

            <div className="header__title">{title}</div>

            {githubLink && (
                <div className="header__github">
                    <a href={githubLink} target="_blank">
                        <img
                            src={resolveAssetUrl(gihub)}
                            className="header__logo-image"
                        />
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
