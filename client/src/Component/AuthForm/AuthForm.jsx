import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { Button } from '../../Component';
import { AiOutlineLoading } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const AuthForm = ({ linkTo, linkText, title, img, btnText, children, handleSubmit, isLoading }) => {
    const location = useLocation();

    return (
        <div className="w-full h-screen flex items-center justify-center gradien">
            <div className="bg-white rounded-2xl shadow-2xl p-1 w-full max-w-[600px] lg:max-w-[900px] mx-2 md:mx-0">
                <div className="flex w-full h-full lg:bg-primaryColor lg:rounded-2xl">
                    <div className="left w-[60%] lg:flex z-10 flex-col gap-8 justify-between transition-all ease-linear duration-[400ms] hidden">
                        <p className="text-2xl text-white mt-16 ml-8 z-10">
                            "Sắp xếp thời gian và
                            <br />
                            quản lý công việc của bạn"
                        </p>
                        <figure className="w-full mb-5">
                            <img src={img} className="w-full object-cover" alt="Hình minh họa" />
                        </figure>
                    </div>
                    <div className="right bg-white w-full flex flex-col items-center py-6 justify-center transition-all ease-linear duration-[400ms]">
                        <div className="w-full px-5 lg:px-0 lg:w-[60%]">
                            <h2 className="font-extrabold text-center text-2xl md:text-3xl mb-8">{title}</h2>
                            <div>
                                <form onSubmit={handleSubmit} className="gap flex flex-col gap-6">
                                    {children}
                                </form>
                                <div className="mt-8">
                                    <Button
                                        disabled={isLoading}
                                        large
                                        primary
                                        className="w-full flex item-center justify-center gap-4"
                                        leftIcon={isLoading && <Spin size="small" className="icon-spin-btn" />}
                                        onClick={handleSubmit}
                                    >
                                        {btnText}
                                    </Button>
                                </div>
                                <p className="text-center my-5">- Hoặc -</p>
                                <div className="flex justify-center">
                                    <Button
                                        leftIcon={<FcGoogle />}
                                        outline
                                        small
                                        className="flex items-center gap-2 rounded-lg py-3 hover:opacity-80"
                                    >
                                        Đăng nhập với google
                                    </Button>
                                </div>
                                <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 text-base">
                                    <p>Bạn {location.pathname === '/login' ? 'chưa' : 'đã'} có tài khoản?</p>
                                    <Link to={linkTo} className="text-primaryColor font-medium hover:underline">
                                        {linkText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AuthForm.propTypes = {
    children: PropTypes.node,
    linkText: PropTypes.string,
    linkTo: PropTypes.string,
    btnText: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    handleSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default AuthForm;
