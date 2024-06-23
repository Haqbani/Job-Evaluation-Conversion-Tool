import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

const conversionData = [
  { fromHay: 1261, toHay: 1507, hayLevel: 23, towerWatson: 18, mercerIPE: 65, aonHewitt: 11 },
  { fromHay: 1261, toHay: 1507, hayLevel: 23, towerWatson: 18, mercerIPE: 64, aonHewitt: 11 },
  { fromHay: 1056, toHay: 1260, hayLevel: 22, towerWatson: 17, mercerIPE: 63, aonHewitt: 10 },
  { fromHay: 1056, toHay: 1260, hayLevel: 22, towerWatson: 17, mercerIPE: 62, aonHewitt: 10 },
  { fromHay: 880, toHay: 1055, hayLevel: 21, towerWatson: 16, mercerIPE: 61, aonHewitt: 9 },
  { fromHay: 880, toHay: 1055, hayLevel: 21, towerWatson: 16, mercerIPE: 60, aonHewitt: 9 },
  { fromHay: 735, toHay: 879, hayLevel: 20, towerWatson: 15, mercerIPE: 60, aonHewitt: 9 },
  { fromHay: 735, toHay: 879, hayLevel: 20, towerWatson: 15, mercerIPE: 59, aonHewitt: 8 },
  { fromHay: 614, toHay: 734, hayLevel: 19, towerWatson: 14, mercerIPE: 58, aonHewitt: 8 },
  { fromHay: 614, toHay: 734, hayLevel: 19, towerWatson: 14, mercerIPE: 57, aonHewitt: 7 },
  { fromHay: 519, toHay: 613, hayLevel: 18, towerWatson: 13, mercerIPE: 56, aonHewitt: 7 },
  { fromHay: 519, toHay: 613, hayLevel: 18, towerWatson: 13, mercerIPE: 55, aonHewitt: 7 },
  { fromHay: 439, toHay: 518, hayLevel: 17, towerWatson: 12, mercerIPE: 54, aonHewitt: 6 },
  { fromHay: 371, toHay: 438, hayLevel: 16, towerWatson: 11, mercerIPE: 53, aonHewitt: 6 },
  { fromHay: 314, toHay: 370, hayLevel: 15, towerWatson: 10, mercerIPE: 52, aonHewitt: 6 },
  { fromHay: 314, toHay: 370, hayLevel: 15, towerWatson: 10, mercerIPE: 51, aonHewitt: 5 },
  { fromHay: 269, toHay: 313, hayLevel: 14, towerWatson: 9, mercerIPE: 50, aonHewitt: 5 },
  { fromHay: 228, toHay: 268, hayLevel: 13, towerWatson: 8, mercerIPE: 49, aonHewitt: 5 },
  { fromHay: 228, toHay: 268, hayLevel: 13, towerWatson: 8, mercerIPE: 48, aonHewitt: 4 },
  { fromHay: 192, toHay: 227, hayLevel: 12, towerWatson: 7, mercerIPE: 47, aonHewitt: 4 },
  { fromHay: 161, toHay: 191, hayLevel: 11, towerWatson: 6, mercerIPE: 46, aonHewitt: 3 },
  { fromHay: 135, toHay: 160, hayLevel: 10, towerWatson: 5, mercerIPE: 45, aonHewitt: 3 },
  { fromHay: 114, toHay: 134, hayLevel: 9, towerWatson: 4, mercerIPE: 44, aonHewitt: 2 },
  { fromHay: 98, toHay: 113, hayLevel: 8, towerWatson: 3, mercerIPE: 43, aonHewitt: 2 },
  { fromHay: 85, toHay: 97, hayLevel: 7, towerWatson: 2, mercerIPE: 42, aonHewitt: 1 },
  { fromHay: 73, toHay: 84, hayLevel: 6, towerWatson: 1, mercerIPE: 41, aonHewitt: 1 },
  { fromHay: 63, toHay: 72, hayLevel: 5, towerWatson: 1, mercerIPE: 40, aonHewitt: 1 },
];

const systems = [
  "Total Hay Job Size",
  "Hay Level",
  "Towers-Watson Global Grade",
  "Mercer IPE Class",
  "Aon-Hewitt Job-Link"
];

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="font-medium">{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-6 bg-gray-800">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const JobEvaluationConversionTool = () => {
  const [fromSystem, setFromSystem] = useState('');
  const [toSystem, setToSystem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  const convertValue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setResult('Please enter a valid number');
      return;
    }

    let fromKey, toKey;
    switch (fromSystem) {
      case "Total Hay Job Size":
        fromKey = value >= 1261 ? 'fromHay' : 'toHay';
        break;
      case "Hay Level":
        fromKey = 'hayLevel';
        break;
      case "Towers-Watson Global Grade":
        fromKey = 'towerWatson';
        break;
      case "Mercer IPE Class":
        fromKey = 'mercerIPE';
        break;
      case "Aon-Hewitt Job-Link":
        fromKey = 'aonHewitt';
        break;
    }

    switch (toSystem) {
      case "Total Hay Job Size":
        toKey = 'fromHay';
        break;
      case "Hay Level":
        toKey = 'hayLevel';
        break;
      case "Towers-Watson Global Grade":
        toKey = 'towerWatson';
        break;
      case "Mercer IPE Class":
        toKey = 'mercerIPE';
        break;
      case "Aon-Hewitt Job-Link":
        toKey = 'aonHewitt';
        break;
    }

    const matchingRow = conversionData.find(row => row[fromKey] === value);
    if (matchingRow) {
      setResult(`${toSystem}: ${matchingRow[toKey]}`);
    } else {
      setResult('No matching conversion found');
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-[#2A1B3C] h-[240px] flex items-center justify-center">
        <h1 className="text-4xl font-bold">Job Evaluation Conversion Tool 🪴</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="bg-gray-700 text-white p-2 rounded"
              value={fromSystem}
              onChange={(e) => setFromSystem(e.target.value)}
            >
              <option value="">Select 'From' System</option>
              {systems.map((system) => (
                <option key={system} value={system}>{system}</option>
              ))}
            </select>
            <select
              className="bg-gray-700 text-white p-2 rounded"
              value={toSystem}
              onChange={(e) => setToSystem(e.target.value)}
            >
              <option value="">Select 'To' System</option>
              {systems.map((system) => (
                <option key={system} value={system}>{system}</option>
              ))}
            </select>
            <input
              type="number"
              className="bg-gray-700 text-white p-2 rounded"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded"
            onClick={convertValue}
          >
            Convert
          </button>
          <p className="mt-4">{result}</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-900 px-3 text-lg font-medium text-white">Table</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Total Hay Job Size</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Hay Level</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Towers-Watson Global Grade</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Mercer IPE Class</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Aon-Hewitt Job-Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {conversionData.map((row, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{row.fromHay} - {row.toHay}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{row.hayLevel}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{row.towerWatson}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{row.mercerIPE}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{row.aonHewitt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
          <div className="w-full max-w-md mx-auto">
            <AccordionItem
              title="What is job evaluation?"
              content="Job evaluation is a systematic process used to assess the relative worth of different jobs within an organization. It helps in establishing a fair and equitable pay structure based on the job's content, responsibilities, and required skills."
              isOpen={openAccordion === 0}
              onClick={() => toggleAccordion(0)}
            />
            <AccordionItem
              title="Why are there different job evaluation systems?"
              content="Different job evaluation systems exist because organizations have varying needs and priorities. Some systems focus more on skills, while others emphasize responsibilities or market factors. The choice of system often depends on the organization's size, industry, and specific requirements."
              isOpen={openAccordion === 1}
              onClick={() => toggleAccordion(1)}
            />
            <AccordionItem
              title="How accurate are the conversions between different systems?"
              content="While the conversions provided by this tool are based on general industry standards, they should be considered approximations. Exact equivalencies between different job evaluation systems can vary depending on how each system is implemented within a specific organization."
              isOpen={openAccordion === 2}
              onClick={() => toggleAccordion(2)}
            />
          </div>
        </div>
      </main>

      <footer className="bg-[#2A1B3C] text-white py-4 text-center">
        <p>Made with 🍿 by Mohammed Alhaqbani</p>
        <a href="https://www.linkedin.com/in/alhagbani/"