import { MdGroup, MdGroupAdd, MdGroupOff, MdGroupRemove } from "react-icons/md";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Template from "../../components/Template";
import Breadcrumb from "../../components/Breadcrumb";
import StatisticCard from "../../components/StatisticCard";

export default () => {
  return (
    <Template>
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "",
          },
        ]}
      />

      <Title>Dashboard</Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-4 gap-4">
        <StatisticCard
          background={"bg-blue-500 dark:bg-blue-800"}
          icon={
            <MdGroup className="w-7 h-7 text-blue-600 dark:text-blue-900" />
          }
          value={"4,331"}
          description={"Total Users"}
        />

        <StatisticCard
          background={"bg-red-500 dark:bg-red-800"}
          icon={
            <MdGroupRemove className="w-7 h-7 text-red-600 dark:text-red-900" />
          }
          value={"1,678"}
          description={"Removed Users"}
        />

        <StatisticCard
          background={"bg-green-500 dark:bg-green-800"}
          icon={
            <MdGroupAdd className="w-7 h-7 text-green-600 dark:text-green-900" />
          }
          value={"2,987"}
          description={"New Users"}
        />

        <StatisticCard
          background={"bg-orange-500 dark:bg-orange-800"}
          icon={
            <MdGroupOff className="w-7 h-7 text-orange-600 dark:text-orange-900" />
          }
          value={"1,173"}
          description={"Inactive Users"}
        />
      </div>

      <Card className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200 sm:text-4xl">
          Dashboard
        </h2>

        <p className="mt-4 text-gray-500 sm:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          dolores laborum impedit esse recusandae facere libero harum sequi.
        </p>
      </Card>
    </Template>
  );
};
