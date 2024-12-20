import PropTypes from 'prop-types';

import { useState } from 'react';
import { Sidebar } from '../Component';
import { AccountSettings } from '../Page';
const Layout = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="h-screen w-full dark:bg-dark">
            <div className="flex lg:gap-5 lg:p-5 h-full">
                <Sidebar setIsModalOpen={setIsModalOpen} />
                <main className="w-full h-full">
                    <div className="lg:border border-defaultBorder w-full h-full shadow-lg dark:border-defaultBorderDark dark:bg-gray lg:rounded-xl">
                        <div className="py-4 h-full">{children}</div>
                    </div>
                </main>
            </div>
            <AccountSettings isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};
export default Layout;
