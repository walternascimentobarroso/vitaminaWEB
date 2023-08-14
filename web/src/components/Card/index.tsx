export default ({ children, className }: any) => {
  return (
    <div className={`custom--bg shadow rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};
