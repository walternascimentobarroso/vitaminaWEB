import { Link } from "react-router-dom";

const ALink: any = ({ route, children }: any) => {
  return (
    <Link
      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
      to={route}
    >
      {children}
    </Link>
  );
};

export default ALink;
