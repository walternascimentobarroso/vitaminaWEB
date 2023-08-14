import { TbWorldWww } from "react-icons/tb";
import {
  AiFillFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  const linksFooter = [
    {
      label: "Terms and conditions",
      href: "",
    },
    {
      label: "Privacy Policy",
      href: "",
    },
    {
      label: "Licensing",
      href: "",
    },
  ];

  const linksSocialMedia = [
    { icon: <AiFillFacebook className="w-5 h-5" />, href: "#" },
    { icon: <AiOutlineInstagram className="w-5 h-5" />, href: "#" },
    { icon: <AiOutlineTwitter className="w-5 h-5" />, href: "#" },
    { icon: <AiOutlineGithub className="w-5 h-5" />, href: "#" },
    { icon: <TbWorldWww className="w-5 h-5" />, href: "#" },
  ];
  return (
    <>
      <footer className="bg-white dark:bg-gray-800 dark:border-gray-700 md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
        <ul className="flex items-center flex-wrap mb-6 md:mb-0">
          {linksFooter.map((link: any, index: any) => (
            <li key={index}>
              <a
                href={link.href}
                className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex sm:justify-center space-x-6">
          {linksSocialMedia.map((item: any, index: any) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </footer>
      <p className="text-center text-sm text-gray-500 my-10">
        &copy; 2023 &nbsp;
        <a
          href="https://walternascimentobarroso.github.io/"
          className="hover:underline"
          target="_blank"
        >
          Walter Nascimento Barroso
        </a>
      </p>
    </>
  );
};

export default Footer;
