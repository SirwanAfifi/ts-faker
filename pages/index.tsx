import React, { ChangeEvent, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { axios } from "../lib/axios";
import { GeneratedType } from "../types";
import { truncate, downloadObjectAsJson, downloadObjectAsSQL } from "../utils";
import { Select } from "../components/Select";
import { OPTIONS } from "../config";
import { SocialButtons } from "../components/SocialButtons";
const TextEditor = dynamic(import("../components/CodeEditor"), {
  ssr: false,
});

export default function Home() {
  const [options, setOptions] = useState(OPTIONS);
  const [value, setValue] = useState<string>();
  const [result, setResult] = useState<GeneratedType[]>([]);

  const process = useCallback(async () => {
    const jsonData = await axios.post("/api/generateFakeData", {
      value,
      scale: options.scale,
      numberMax: options.numberMax,
    });
    setResult(jsonData.data as unknown as GeneratedType[]);
  }, [value, options]);

  const downloadFile = useCallback(
    (result: GeneratedType) => downloadObjectAsJson(result.data, result.name),
    []
  );

  const downloadSQLFile = useCallback(
    (result: GeneratedType) => downloadObjectAsSQL(result),
    []
  );

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setResult([]);
    setOptions({ ...options, [event.target.name]: event.target.value });
  };

  const renderHeaders = useCallback(
    (data: unknown[]) =>
      Object.keys(data[0]).map((key, index) => (
        <th
          key={index}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {key.toUpperCase()}
        </th>
      )),
    []
  );

  return (
    <div className="overflow-hidden flex flex-row">
      <div className="w-2/5">
        <TextEditor
          theme="vs-dark"
          value={value}
          height={"100vh"}
          onChange={setValue}
        />
      </div>
      <div className="w-1/2 h-screen flex-1 overflow-y-auto">
        <SocialButtons />
        <div className="flex justify-between mb-5 bg-gray-300 p-4">
          <Select
            name="scale"
            label="Scale (Number Of Rows)"
            options={[10, 100, 200]}
            value={options.scale}
            onChange={onSelectChange}
          />
          <Select
            name="numberMax"
            label="Integer Max Value"
            options={[50, 100, 150]}
            value={options.numberMax}
            onChange={onSelectChange}
          />
          <button
            onClick={process}
            className="border border-solid w-40 h-10 rounded-full bg-indigo-500 text-white hover:bg-indigo-800 transition self-end"
          >
            Generate Data
          </button>
        </div>
        <div className="p-5">
          {result.map((res) => (
            <React.Fragment key={res.name}>
              <div className="mb-5 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {res.name}{" "}
                  <span className="text-sm text-gray-500">
                    (Number Of Rows: {options.scale})
                  </span>
                </h3>
                <div className="mt-3 flex sm:mt-0 sm:ml-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => downloadFile(res)}
                  >
                    Download JSON
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 border-transparent rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => downloadSQLFile(res)}
                  >
                    Download SQL
                  </button>
                </div>
              </div>
              <div className="shadow border-b border-gray-200 overflow-auto mb-5">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>{renderHeaders(res.data)}</tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {res.data.slice(0, 5).map((dt, i) => (
                      <tr key={i}>
                        {Object.values(dt).map((k, kIndex) => (
                          <td
                            key={kIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            <span className="">
                              {truncate(k as string, 20)}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
