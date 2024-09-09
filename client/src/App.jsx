import { createContext, useState } from 'react';
import Routers from './Router';

import './custom-libs/dayJS.js';
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN.js';
import configThemeAntd from './custom-libs/antd.js';
import { AuthContextProvider } from './context/AuthContext.jsx';

import 'animate.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import './App.css';

const ContextTheme = createContext();

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <ContextTheme.Provider value={{ isDarkMode, setIsDarkMode }}>
            <ConfigProvider theme={configThemeAntd(isDarkMode)} locale={vi_VN}>
                <AuthContextProvider>
                    <Routers />
                </AuthContextProvider>
            </ConfigProvider>
        </ContextTheme.Provider>
    );
};

export { ContextTheme, App };
