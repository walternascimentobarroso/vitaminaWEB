export default ({ customClass, children }: any) => {
  return (
    <h1
      className={`text-gray-900 dark:text-gray-200 text-xl font-bold mb-2 ${customClass}`}
    >
      {children}
    </h1>
  );
};
