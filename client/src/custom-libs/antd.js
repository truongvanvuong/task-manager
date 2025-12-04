import { theme } from 'antd';

const configThemeAntd = (isTheme) => {
    const config = {
        token: {
            colorBorder: isTheme ? '#424242FF' : '#D9D9D9FF',
            colorBgBase: isTheme ? '#000000' : '#fff',
            colorPrimary: '#fa8c16',
        },
        algorithm: isTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
    };
    return config;
};

export default configThemeAntd;
