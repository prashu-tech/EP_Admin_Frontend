const Table = () => {
  const data = [
    {
      id: 1,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "21-01-2025",
      endsAt: "23-01-2025",
      resultStatus: "Instantly",
    },
    {
      id: 1,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "21-01-2025",
      endsAt: "23-01-2025",
      resultStatus: "Instantly",
    },
    {
      id: 1,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "21-01-2025",
      endsAt: "23-01-2025",
      resultStatus: "Instantly",
    },
    {
      id: 1,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "21-01-2025",
      endsAt: "23-01-2025",
      resultStatus: "Instantly",
    },
    {
      id: 1,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "21-01-2025",
      endsAt: "23-01-2025",
      resultStatus: "Instantly",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white shadow-md border rounded-lg overflow-hidden w-full mx-auto">
        <table className="w- table-auto">
          <thead>
            <tr className="bg-white text-black text-center border-b-2 uppercase text-xs leading-tight">
              <th className="py-4 px-2 w-12">ID</th>
              <th className="py-4 px-2 w-32">TEST NAME</th>
              <th className="py-4 px-2 w-32">BATCH NAME</th>
              <th className="py-4 px-2 w-28">DURATION</th>
              <th className="py-4 px-2 w-36">SCHEDULE FROM</th>
              <th className="py-4 px-2 w-36">ENDS AT</th>
              <th className="py-4 px-2 w-32">RESULT STATUS</th>
              <th className="py-4 px-2 w-28">RESCHEDULE</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs font-light">
            {data.map((row) => (
              <tr key={row.id} className="border-b text-center text-black border-black hover:bg-gray-100">
                <td className="py-4 px-2 border-r-2 w-12 font-roboto">{row.id}</td>
                <td className="py-4 px-2 border-r-2 w-32 truncate font-roboto">{row.testName}</td>
                <td className="py-4 px-2 border-r-2 w-32 truncate font-roboto">{row.batchName}</td>
                <td className="py-4 px-2 border-r-2 w-28 font-roboto">{row.duration}</td>
                <td className="py-4 px-2 border-r-2 w-36 font-roboto">{row.scheduleFrom}</td>
                <td className="py-4 px-2 border-r-2 w-36 font-roboto">{row.endsAt}</td>
                <td className="py-4 px-2 border-r-2 w-32 font-roboto">{row.resultStatus}</td>
                <td className="py-4 px-2 w-28 font-roboto">
                  <button 
                    className="border w-20   text-black px-4 rounded-sm hover:bg-gray-300 whitespace-nowrap text-xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;