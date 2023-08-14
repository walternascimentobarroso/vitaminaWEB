const StatisticCard = ({ background, icon, value, description }: any) => {
  return (
    <div
      className={` ${background} shadow rounded-lg flex items-center justify-between p-3 text-white font-medium`}
    >
      <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-2xl">{value}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
