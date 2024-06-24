import React, { useState } from 'react';

type ConversionDataKeys = 'fromHay' | 'toHay' | 'hayLevel' | 'towerWatson' | 'mercerIPE' | 'aonHewitt'
const conversionData = [
  { fromHay: 1261, toHay: 1507, hayLevel: 23, towerWatson: 18, mercerIPE: 65, aonHewitt: 11 },
  { fromHay: 1056, toHay: 1260, hayLevel: 22, towerWatson: 17, mercerIPE: 63, aonHewitt: 10 },
  { fromHay: 880, toHay: 1055, hayLevel: 21, towerWatson: 16, mercerIPE: 61, aonHewitt: 9 },
  { fromHay: 735, toHay: 879, hayLevel: 20, towerWatson: 15, mercerIPE: 60, aonHewitt: 9 },
  { fromHay: 614, toHay: 734, hayLevel: 19, towerWatson: 14, mercerIPE: 58, aonHewitt: 8 },
  { fromHay: 519, toHay: 613, hayLevel: 18, towerWatson: 13, mercerIPE: 56, aonHewitt: 7 },
  { fromHay: 439, toHay: 518, hayLevel: 17, towerWatson: 12, mercerIPE: 54, aonHewitt: 6 },
  { fromHay: 371, toHay: 438, hayLevel: 16, towerWatson: 11, mercerIPE: 53, aonHewitt: 6 },
  { fromHay: 314, toHay: 370, hayLevel: 15, towerWatson: 10, mercerIPE: 52, aonHewitt: 6 },
  { fromHay: 269, toHay: 313, hayLevel: 14, towerWatson: 9, mercerIPE: 50, aonHewitt: 5 },
  { fromHay: 228, toHay: 268, hayLevel: 13, towerWatson: 8, mercerIPE: 49, aonHewitt: 5 },
  { fromHay: 192, toHay: 227, hayLevel: 12, towerWatson: 7, mercerIPE: 47, aonHewitt: 4 },
  { fromHay: 161, toHay: 191, hayLevel: 11, towerWatson: 6, mercerIPE: 46, aonHewitt: 3 },
  { fromHay: 135, toHay: 160, hayLevel: 10, towerWatson: 5, mercerIPE: 45, aonHewitt: 3 },
  { fromHay: 114, toHay: 134, hayLevel: 9, towerWatson: 4, mercerIPE: 44, aonHewitt: 2 },
  { fromHay: 98, toHay: 113, hayLevel: 8, towerWatson: 3, mercerIPE: 43, aonHewitt: 2 },
  { fromHay: 85, toHay: 97, hayLevel: 7, towerWatson: 2, mercerIPE: 42, aonHewitt: 1 },
  { fromHay: 73, toHay: 84, hayLevel: 6, towerWatson: 1, mercerIPE: 41, aonHewitt: 1 },
  { fromHay: 63, toHay: 72, hayLevel: 5, towerWatson: 1, mercerIPE: 40, aonHewitt: 1 }
];

const systems = [
  "Total Hay Job Size",
  "Hay Level",
  "Towers-Watson Global Grade",
  "Mercer IPE Class",
  "Aon-Hewitt Job-Link"
];

const JobEvaluationConversionTool = () => {
  const [fromSystem, setFromSystem] = useState('');
  const [toSystem, setToSystem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const convertValue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setResult('Please enter a valid number');
      return;
    }

    let fromKey: ConversionDataKeys, toKey: ConversionDataKeys;
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
      default:
        setResult('Please select a "From" system');
        return;
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
      default:
        setResult('Please select a "To" system');
        return;
    }

    const matchingRow = conversionData.find(row => row[fromKey] <= value && value <= (fromKey === 'toHay' ? row.toHay : row[fromKey]));
    if (matchingRow) {
      setResult(`${toSystem}: ${matchingRow[toKey]}`);
    } else {
      setResult('No matching conversion found');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-[#2A1B3C] py-8 text-center">
        <h1 className="text-4xl font-bold">Job Evaluation Conversion Tool 🪴</h1>
      </header>

      <main className="flex-grow flex justify-center">
        <div className="w-full max-w-4xl px-4 py-8">
          <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Conversion Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
                value={fromSystem}
                onChange={(e) => setFromSystem(e.target.value)}
              >
                <option value="">Select 'From' System</option>
                {systems.map((system) => (
                  <option key={system} value={system}>{system}</option>
                ))}
              </select>
              <select
                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
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
                className="bg-gray-800 text-white p-2 rounded border border-gray-700"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              onClick={convertValue}
            >
              Convert
            </button>
            <p className="mt-4 text-lg">{result}</p>
          </div>

          <div className="my-8 text-center text-lg">
            <p>
              Please ensure the accuracy of the values from the table below. If you encounter any discrepancies, let me know through LinkedIn or open an issue on GitHub 📝. Your feedback is invaluable! 🌟
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Conversion Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Total Hay Job Size</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Hay Level</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Towers-Watson Global Grade</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Mercer IPE Class</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Aon-Hewitt Job-Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {conversionData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                      <td className="px-3 py-4 text-sm text-gray-300">{row.fromHay} - {row.toHay}</td>
                      <td className="px-3 py-4 text-sm text-gray-300">{row.hayLevel}</td>
                      <td className="px-3 py-4 text-sm text-gray-300">{row.towerWatson}</td>
                      <td className="px-3 py-4 text-sm text-gray-300">{row.mercerIPE}</td>
                      <td className="px-3 py-4 text-sm text-gray-300">{row.aonHewitt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#2A1B3C] text-white py-4 text-center">
        <p>Made with 🍿 by Mohammed Alhaqbani</p>
        <a href="https://www.linkedin.com/in/alhagbani/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100">LinkedIn</a>
        {' | '}
        <a href="https://hr-for-all.blog/10+Website/Home+Page" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100">HR for All</a>
      </footer>
    </div>
  );
};

export default JobEvaluationConversionTool;
