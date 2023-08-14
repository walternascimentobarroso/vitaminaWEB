export default ({
  typeOf = "button",
  children,
  onClick,
  customClass = "",
  disabled = false,
}: any) => {
  return (
    <button
      className={`custom--btn-primary ${customClass}
      ${disabled && "cursor-not-allowed opacity-75 hover:opacity-50"}`}
      type={typeOf}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
