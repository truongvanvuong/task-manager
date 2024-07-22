import React from "react";
import PropTypes from "prop-types";

const TitlePage = ({ title }) => {
  return (
    <div className="px-5">
      <h1 className="font-bold text-[1.5rem] pb-2 border-b-2 border-primaryColor w-max dark:text-textHeaddingDark">
        {title}
      </h1>
    </div>
  );
};

TitlePage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitlePage;
