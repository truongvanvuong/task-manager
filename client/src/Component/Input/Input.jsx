import { useState } from "react";
import PropTypes from "prop-types";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Input = ({
  inputRef,
  id,
  placeholder,
  name,
  type,
  onChange,
  bordered,
  messError,
  wrapInputClassName,
  inputClassName,
  readOnly = false,
  passWord,
  ...passProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const props = {
    onChange,
    ...passProps,
  };
  return (
    <div className={`w-full flex flex-col gap-2 ${wrapInputClassName}`}>
      <div className="flex items-center">
        <input
          ref={inputRef}
          id={id}
          readOnly={readOnly}
          className={`w-full py-[6px] bg-transparent dark:border-defaultBorderDark ${
            bordered && "border-b"
          } border-defaultBorder ${inputClassName} ${
            readOnly
              ? null
              : "focus:border-primaryColor dark:focus:border-primaryColor"
          } outline-none`}
          placeholder={placeholder}
          name={name}
          type={passWord ? (showPassword ? "text" : "password") : type}
          {...props}
        />
        {passWord && (
          <div className="-ml-6">
            {showPassword ? (
              <EyeOutlined
                onClick={() => setShowPassword(false)}
                className="text-[1.2rem] cursor-pointer"
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={() => setShowPassword(true)}
                className="text-[1.2rem] cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
      {messError && (
        <span className="text-red-600 text-[0.9rem] animate__animated animate__fadeIn">
          {messError}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  bordered: PropTypes.bool,
  wrapInputClassName: PropTypes.string,
  InputClassName: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  messError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Input;
