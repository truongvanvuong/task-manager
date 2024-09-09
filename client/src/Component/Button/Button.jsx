import PropTypes from 'prop-types';

const Button = ({
    primary = false,
    disabled = false,
    small = false,
    medium = false,
    large = false,
    roundedBorder = false,
    outline = false,
    className = '',
    rightIcon,
    leftIcon,
    children,
    onClick,
    ...passProps
}) => {
    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = {
        primary,
        outline,
        disabled,
        roundedBorder,
        small,
        medium,
        large,
    };
    const classList = Object.keys(classes)
        .filter((key) => classes[key])
        .concat(className) // Add custom className if provided
        .join(' ');
    return (
        <button className={classList} {...props}>
            {leftIcon && <span className="text-base">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="text-base">{rightIcon}</span>}
        </button>
    );
};

Button.propTypes = {
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    outline: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    roundedBorder: PropTypes.bool,
    className: PropTypes.string,
    rightIcon: PropTypes.node,
    leftIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;
