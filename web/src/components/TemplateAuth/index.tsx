import Title from "../Title";

const TemplateAuth = ({
  image,
  title,
  children
}: any) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
          <div className="w-full lg:w-7/12 bg-white dark:bg-gray-800 p-5 rounded-lg lg:rounded-l-none">
            <Title customClass="text-2xl text-center">{title}</Title>

            {children}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateAuth;
