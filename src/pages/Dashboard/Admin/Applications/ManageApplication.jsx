import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";

const ManageApplication = () => {
  const axiosFetch = useAxiosFetch();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axiosFetch
      .get("/applications")
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-7">
        Application for <span className="text-secondary"> Instructor</span>
      </h1>

      <div className="">

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">sn.no</th>
                                        
                                            <th scope="col" className="px-6 py-4">NAME</th>
                                            <th scope="col" className="px-6 py-4">EMAIL</th>
                                            <th scope="col" className="px-6 py-4">EXPERIENCE</th>
                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            applications.map((application, idx) => <tr
                                                key={application._id}
                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{idx + 1}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {application.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">{application.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{application.experience}</td>
                                               
                                            </tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default ManageApplication;
