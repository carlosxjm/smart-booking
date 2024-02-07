import "./Button.css";

const variantClassNames = {
  icon: "button-icon",
  text: "button-text",
  danger: "button-danger",
  secondary: "button-secondary",
};

export const Button = ({ children, variant, ...otherProps }) => {
  let className = variantClassNames[variant] ?? null;

  return (
    <button className={`button-root ${className}`} {...otherProps}>
      {children}
    </button>
  );
};
