// old version
// import { useState } from "react";

// const SalaryForm = () => {
//   const [salary, setSalary] = useState("");
//   const [result, setResult] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const income = parseFloat(salary);
//     let tax = 0;
//     let breakdown = "";

//     if (income <= 600000) {
//       tax = 0;
//       breakdown = "0%";
//     } else if (income <= 1200000) {
//       tax = (income - 600000) * 0.01;
//       breakdown = "1% of the amount exceeding 600,000";
//     } else if (income <= 2200000) {
//       tax = 6000 + (income - 1200000) * 0.11;
//       breakdown = "Rs 6,000 + 11% of the amount exceeding 1.2M";
//     } else if (income <= 3200000) {
//       tax = 116000 + (income - 2200000) * 0.23;
//       breakdown = "Rs 116,000 + 23% of the amount exceeding 2.2M";
//     } else if (income <= 4100000) {
//       tax = 346000 + (income - 3200000) * 0.3;
//       breakdown = "Rs 346,000 + 30% of the amount exceeding 3.2M";
//     } else {
//       tax = 616000 + (income - 4100000) * 0.35;
//       breakdown = "Rs 616,000 + 35% of the amount exceeding 4.1M";
//     }

//     setResult({ income, tax: Math.round(tax), breakdown });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//         <input
//           type="number"
//           placeholder="Annual Salary (PKR)"
//           required
//           value={salary}
//           onChange={(e) => setSalary(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Calculate
//         </button>
//       </form>

//       {result && (
//         <div className="border p-4 rounded bg-gray-50">
//           <p>
//             <strong>Annual Salary:</strong> Rs {result.income.toLocaleString()}
//           </p>
//           <p>
//             <strong>Tax Formula:</strong> {result.breakdown}
//           </p>
//           <p>
//             <strong>Tax Payable:</strong> Rs {result.tax.toLocaleString()}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SalaryForm;

// version 2.0
// import { useState } from "react";

// export default function SalaryForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     salary: "",
//   });
//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const name = formData.name;
//     const gender = formData.gender;
//     const monthlySalary = parseFloat(formData.salary);
//     const annualSalary = monthlySalary * 12;
//     const basic = Math.round(annualSalary * 0.67);
//     const medical = Math.round(basic * 0.1);
//     const taxable = annualSalary - medical;

//     // Tax Calculation based on slabs
//     let annualTax = 0;
//     let breakdown = "";

//     if (taxable > 4100000) {
//       annualTax = Math.round((taxable - 4100000) * 0.35 + 616000);
//       breakdown = "Rs 616,000 + 35% of amount exceeding 4.1M";
//     } else if (taxable > 3200000) {
//       annualTax = Math.round((taxable - 3200000) * 0.3 + 346000);
//       breakdown = "Rs 346,000 + 30% of amount exceeding 3.2M";
//     } else if (taxable > 2200000) {
//       annualTax = Math.round((taxable - 2200000) * 0.23 + 116000);
//       breakdown = "Rs 116,000 + 23% of amount exceeding 2.2M";
//     } else if (taxable > 1200000) {
//       annualTax = Math.round((taxable - 1200000) * 0.11 + 6000);
//       breakdown = "Rs 6,000 + 11% of amount exceeding 1.2M";
//     } else if (taxable > 600000) {
//       annualTax = Math.round((taxable - 600000) * 0.01);
//       breakdown = "1% of amount exceeding 600,000";
//     } else {
//       annualTax = 0;
//       breakdown = "0%";
//     }

//     const monthlyTax = Math.round(annualTax / 12);
//     const netPayable = monthlySalary - monthlyTax;

//     setResult({
//       name,
//       gender,
//       monthlySalary,
//       annualSalary,
//       basic,
//       medical,
//       taxable,
//       annualTax,
//       monthlyTax,
//       netPayable,
//       breakdown,
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           required
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <select
//           name="gender"
//           required
//           value={formData.gender}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>

//         <input
//           type="number"
//           name="salary"
//           placeholder="Monthly Salary (PKR)"
//           required
//           value={formData.salary}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Calculate
//         </button>
//       </form>

//       {result && (
//         <div className="overflow-auto">
//           <h3 className="font-semibold text-lg mb-2">Salary Breakdown</h3>
//           <table className="w-full border text-left text-sm">
//             <tbody>
//               <tr>
//                 <td className="border p-2">Name</td>
//                 <td className="border p-2">{result.name}</td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Gender</td>
//                 <td className="border p-2">{result.gender}</td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Monthly Salary</td>
//                 <td className="border p-2">
//                   Rs {result.monthlySalary.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Annual Salary</td>
//                 <td className="border p-2">
//                   Rs {result.annualSalary.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Basic (67%)</td>
//                 <td className="border p-2">
//                   Rs {result.basic.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Medical (10%)</td>
//                 <td className="border p-2">
//                   Rs {result.medical.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Taxable Income</td>
//                 <td className="border p-2">
//                   Rs {result.taxable.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Tax Formula</td>
//                 <td className="border p-2">{result.breakdown}</td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Annual Tax</td>
//                 <td className="border p-2">
//                   Rs {result.annualTax.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2">Monthly Tax</td>
//                 <td className="border p-2">
//                   Rs {result.monthlyTax.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-2 font-bold">Net Payable</td>
//                 <td className="border p-2 font-bold">
//                   Rs {result.netPayable.toLocaleString()}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// version 3.0
// import { useRef, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// export default function SalaryForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     salary: "",
//   });
//   const [salaryType, setSalaryType] = useState("monthly");
//   const [entries, setEntries] = useState([]);
//   const printRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const monthlySalary =
//       salaryType === "monthly"
//         ? parseFloat(formData.salary)
//         : parseFloat(formData.salary) / 12;

//     const annualSalary = monthlySalary * 12;
//     const basic = Math.round(annualSalary * 0.67);
//     const medical = Math.round(basic * 0.1);
//     const taxable = annualSalary - medical;

//     let annualTax = 0;
//     let breakdown = "";

//     if (taxable > 4100000) {
//       annualTax = Math.round((taxable - 4100000) * 0.35 + 616000);
//       breakdown = "Rs 616,000 + 35% of amount exceeding 4.1M";
//     } else if (taxable > 3200000) {
//       annualTax = Math.round((taxable - 3200000) * 0.3 + 346000);
//       breakdown = "Rs 346,000 + 30% of amount exceeding 3.2M";
//     } else if (taxable > 2200000) {
//       annualTax = Math.round((taxable - 2200000) * 0.23 + 116000);
//       breakdown = "Rs 116,000 + 23% of amount exceeding 2.2M";
//     } else if (taxable > 1200000) {
//       annualTax = Math.round((taxable - 1200000) * 0.11 + 6000);
//       breakdown = "Rs 6,000 + 11% of amount exceeding 1.2M";
//     } else if (taxable > 600000) {
//       annualTax = Math.round((taxable - 600000) * 0.01);
//       breakdown = "1% of amount exceeding 600,000";
//     } else {
//       annualTax = 0;
//       breakdown = "0%";
//     }

//     const monthlyTax = Math.round(annualTax / 12);
//     const netPayable = monthlySalary - monthlyTax;

//     const newEntry = {
//       name: formData.name,
//       gender: formData.gender,
//       salaryType,
//       monthlySalary,
//       annualSalary,
//       basic,
//       medical,
//       taxable,
//       annualTax,
//       monthlyTax,
//       netPayable,
//       breakdown,
//     };

//     setEntries([...entries, newEntry]);
//     setFormData({ name: "", gender: "", salary: "" });
//   };

//   const exportPDF = () => {
//     const input = printRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("salaries.pdf");
//     });
//   };

//   const exportCSV = () => {
//     const headers = [
//       "Name",
//       "Gender",
//       "Monthly Salary",
//       "Annual Salary",
//       "Basic",
//       "Medical",
//       "Taxable",
//       "Annual Tax",
//       "Monthly Tax",
//       "Net Payable",
//     ];
//     const rows = entries.map((e) => [
//       e.name,
//       e.gender,
//       e.monthlySalary,
//       e.annualSalary,
//       e.basic,
//       e.medical,
//       e.taxable,
//       e.annualTax,
//       e.monthlyTax,
//       e.netPayable,
//     ]);
//     const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "salaries.csv");
//   };

//   const exportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(entries);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Salaries");
//     const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     saveAs(
//       new Blob([wbout], { type: "application/octet-stream" }),
//       "salaries.xlsx"
//     );
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           required
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <select
//           name="gender"
//           required
//           value={formData.gender}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//         <input
//           type="number"
//           name="salary"
//           placeholder="Enter Salary"
//           required
//           value={formData.salary}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <div className="flex gap-4 items-center">
//           <label className="font-semibold">Salary Type:</label>
//           <label>
//             <input
//               type="radio"
//               name="salaryType"
//               value="monthly"
//               checked={salaryType === "monthly"}
//               onChange={() => setSalaryType("monthly")}
//             />{" "}
//             Monthly
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="salaryType"
//               value="annual"
//               checked={salaryType === "annual"}
//               onChange={() => setSalaryType("annual")}
//             />{" "}
//             Annual
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Entry
//         </button>
//       </form>

//       {entries.length > 0 && (
//         <div>
//           <h3 className="font-semibold text-lg mb-2">
//             All Employee Calculations
//           </h3>

//           <div className="flex flex-wrap gap-4 mb-4">
//             <button
//               onClick={exportPDF}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Download PDF
//             </button>
//             <button
//               onClick={exportCSV}
//               className="bg-yellow-600 text-white px-4 py-2 rounded"
//             >
//               Export CSV
//             </button>
//             <button
//               onClick={exportExcel}
//               className="bg-purple-600 text-white px-4 py-2 rounded"
//             >
//               Export Excel
//             </button>
//           </div>

//           <div className="overflow-auto" ref={printRef}>
//             <table className="min-w-full border text-sm">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border p-2">Name</th>
//                   <th className="border p-2">Gender</th>
//                   <th className="border p-2">Monthly Salary</th>
//                   <th className="border p-2">Annual Salary</th>
//                   <th className="border p-2">Basic</th>
//                   <th className="border p-2">Medical</th>
//                   <th className="border p-2">Taxable</th>
//                   <th className="border p-2">Tax Formula</th>
//                   <th className="border p-2">Annual Tax</th>
//                   <th className="border p-2">Monthly Tax</th>
//                   <th className="border p-2 font-bold">Net Payable</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {entries.map((e, index) => (
//                   <tr key={index}>
//                     <td className="border p-2">{e.name}</td>
//                     <td className="border p-2">{e.gender}</td>
//                     <td className="border p-2">
//                       Rs {e.monthlySalary.toLocaleString()}
//                     </td>
//                     <td className="border p-2">
//                       Rs {e.annualSalary.toLocaleString()}
//                     </td>
//                     <td className="border p-2">
//                       Rs {e.basic.toLocaleString()}
//                     </td>
//                     <td className="border p-2">
//                       Rs {e.medical.toLocaleString()}
//                     </td>
//                     <td className="border p-2">
//                       Rs {e.taxable.toLocaleString()}
//                     </td>
//                     <td className="border p-2">{e.breakdown}</td>
//                     <td className="border p-2">
//                       Rs {e.annualTax.toLocaleString()}
//                     </td>
//                     <td className="border p-2">
//                       Rs {e.monthlyTax.toLocaleString()}
//                     </td>
//                     <td className="border p-2 font-bold">
//                       Rs {e.netPayable.toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// version 4.0
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function SalaryForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    salary: "",
  });
  const [salaryType, setSalaryType] = useState("monthly");
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const printRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthlySalary =
      salaryType === "monthly"
        ? parseFloat(formData.salary)
        : parseFloat(formData.salary) / 12;

    const annualSalary = monthlySalary * 12;
    const basic = Math.round(annualSalary * 0.67);
    const medical = Math.round(basic * 0.1);
    const taxable = annualSalary - medical;

    let annualTax = 0;
    let breakdown = "";

    if (taxable > 4100000) {
      annualTax = Math.round((taxable - 4100000) * 0.35 + 616000);
      breakdown = "Rs 616,000 + 35% of amount exceeding 4.1M";
    } else if (taxable > 3200000) {
      annualTax = Math.round((taxable - 3200000) * 0.3 + 346000);
      breakdown = "Rs 346,000 + 30% of amount exceeding 3.2M";
    } else if (taxable > 2200000) {
      annualTax = Math.round((taxable - 2200000) * 0.23 + 116000);
      breakdown = "Rs 116,000 + 23% of amount exceeding 2.2M";
    } else if (taxable > 1200000) {
      annualTax = Math.round((taxable - 1200000) * 0.11 + 6000);
      breakdown = "Rs 6,000 + 11% of amount exceeding 1.2M";
    } else if (taxable > 600000) {
      annualTax = Math.round((taxable - 600000) * 0.01);
      breakdown = "1% of amount exceeding 600,000";
    } else {
      annualTax = 0;
      breakdown = "0%";
    }

    const monthlyTax = Math.round(annualTax / 12);
    const netPayable = monthlySalary - monthlyTax;

    const newEntry = {
      name: formData.name,
      gender: formData.gender,
      salaryType,
      monthlySalary,
      annualSalary,
      basic,
      medical,
      taxable,
      annualTax,
      monthlyTax,
      netPayable,
      breakdown,
    };

    setEntries([...entries, newEntry]);
    setFormData({ name: "", gender: "", salary: "" });
  };

  const exportPDF = () => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("salaries.pdf");
    });
  };

  const exportCSV = () => {
    const headers = [
      "Name",
      "Gender",
      "Monthly Salary",
      "Annual Salary",
      "Basic",
      "Medical",
      "Taxable",
      "Annual Tax",
      "Monthly Tax",
      "Net Payable",
    ];
    const rows = entries.map((e) => [
      e.name,
      e.gender,
      e.monthlySalary,
      e.annualSalary,
      e.basic,
      e.medical,
      e.taxable,
      e.annualTax,
      e.monthlyTax,
      e.netPayable,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "salaries.csv");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salaries");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "salaries.xlsx"
    );
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white transition-all duration-300">
      <button
        onClick={toggleTheme}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full dark:bg-gray-800"
        />
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 w-full dark:bg-gray-800"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="salary"
          placeholder="Enter Salary"
          required
          value={formData.salary}
          onChange={handleChange}
          className="border p-2 w-full dark:bg-gray-800"
        />
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Salary Type:</label>
          <label>
            <input
              type="radio"
              name="salaryType"
              value="monthly"
              checked={salaryType === "monthly"}
              onChange={() => setSalaryType("monthly")}
            />{" "}
            Monthly
          </label>
          <label>
            <input
              type="radio"
              name="salaryType"
              value="annual"
              checked={salaryType === "annual"}
              onChange={() => setSalaryType("annual")}
            />{" "}
            Annual
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Entry
        </button>
      </form>

      {entries.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-2">
            All Employee Calculations
          </h3>

          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={exportPDF}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
            <button
              onClick={exportCSV}
              className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Export CSV
            </button>
            <button
              onClick={exportExcel}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Export Excel
            </button>
          </div>

          <div className="overflow-auto" ref={printRef}>
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Monthly Salary</th>
                  <th className="border p-2">Annual Salary</th>
                  <th className="border p-2">Basic</th>
                  <th className="border p-2">Medical</th>
                  <th className="border p-2">Taxable</th>
                  <th className="border p-2">Tax Formula</th>
                  <th className="border p-2">Annual Tax</th>
                  <th className="border p-2">Monthly Tax</th>
                  <th className="border p-2">Net Payable</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, index) => (
                  <tr key={index}>
                    {editIndex === index ? (
                      <>
                        <td className="border p-2" colSpan={2}>
                          <input
                            type="text"
                            value={editFormData.name}
                            onChange={(ev) =>
                              setEditFormData({
                                ...editFormData,
                                name: ev.target.value,
                              })
                            }
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="border p-2" colSpan={10}>
                          <button
                            onClick={() => {
                              const updated = [...entries];
                              updated[index].name = editFormData.name;
                              setEntries(updated);
                              setEditIndex(null);
                            }}
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditIndex(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border p-2">{e.name}</td>
                        <td className="border p-2">{e.gender}</td>
                        <td className="border p-2">
                          Rs {e.monthlySalary.toLocaleString()}
                        </td>
                        <td className="border p-2">
                          Rs {e.annualSalary.toLocaleString()}
                        </td>
                        <td className="border p-2">
                          Rs {e.basic.toLocaleString()}
                        </td>
                        <td className="border p-2">
                          Rs {e.medical.toLocaleString()}
                        </td>
                        <td className="border p-2">
                          Rs {e.taxable.toLocaleString()}
                        </td>
                        <td className="border p-2">{e.breakdown}</td>
                        <td className="border p-2">
                          Rs {e.annualTax.toLocaleString()}
                        </td>
                        <td className="border p-2">
                          Rs {e.monthlyTax.toLocaleString()}
                        </td>
                        <td className="border p-2 font-bold">
                          Rs {e.netPayable.toLocaleString()}
                        </td>
                        <td className="border p-2">
                          <button
                            onClick={() => {
                              setEditIndex(index);
                              setEditFormData({ name: e.name });
                            }}
                            className="text-blue-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const filtered = entries.filter(
                                (_, i) => i !== index
                              );
                              setEntries(filtered);
                            }}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
