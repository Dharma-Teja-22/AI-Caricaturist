import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "@/services/API";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const TableData = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get.getUserData();
        if (response.status && Array.isArray(response.data)) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error while fetching Data...");
      }
    };
    fetchData();
  }, []);

  // Truncate text function
  const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const filteredData = data.filter(
    (item) =>
      item.UserName &&
      item.CaricatureImage &&
      (item.UserName.toLowerCase().includes(search.toLowerCase()) ||
        item.UserEmail?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Card className="p-2 shadow-lg rounded-xl max-w-full bg-miracle-white text-miracle-black">
      <ToastContainer />
      <CardContent>
        <CardHeader className="text-center font-bold text-miracle-black text-xl">
          History of Previous Requests
        </CardHeader>
        <Input
          type="text"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full bg-miracle-white text-miracle-black"
        />
        <ScrollArea className="whitespace-nowrap rounded-md">
          <div className="max-h-96 border-none rounded-lg no-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left w-1/3">Name</th>
                  <th className="px-4 py-2 text-left w-1/3">Email</th>
                  <th className="px-4 py-2 text-left w-1/3">Caricature</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <motion.tr
                      key={item.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="border-t border-gray-200"
                    >
                      <td className="px-4 py-2 w-1/3" title={item.UserName}>
                        {truncateText(item.UserName)}
                      </td>
                      <td className="px-4 py-2 w-1/3" title={item.UserEmail}>
                        {truncateText(item.UserEmail || "-")}
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        {item.CaricatureImage ? (
                          <div className="flex items-center gap-4 text-blue-700">
                            <img
                              src={item.CaricatureImage}
                              alt="Caricature"
                              className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-md"
                            />
                            <a href={item.CaricatureImage}> Click Here</a>
                          </div>
                        ) : (
                          "No Caricature"
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 font-semibold">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TableData;
