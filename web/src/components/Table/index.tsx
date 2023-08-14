const Table = ({ caption = "", tHeads, data, action }: any) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        {caption}
      </caption>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
        <tr>
          {tHeads.map((head: any, index: any) => (
            <th className="px-6 py-3" key={index}>
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record: any, index: any) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            key={index}
          >
            {Object.keys(record).map((key) => (
              <td key={key} className="px-6 py-4">
                {record[key]}
              </td>
            ))}
            <td>{action(record)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
