import Template from "../../components/Template";
import Breadcrumb from "../../components/Breadcrumb";

export default () => {
  return (
    <Template>
      <h1 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
        Breadcrumb
      </h1>
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "",
          },
          {
            label: "Components",
            href: "",
          },
        ]}
      />
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "",
          },
          {
            label: "Page",
            href: "",
          },
          {
            label: "Page end",
            href: "",
          },
        ]}
      />
    </Template>
  );
};
