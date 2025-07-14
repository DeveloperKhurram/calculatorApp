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

import { useState } from "react";

export default function SalaryForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    salary: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name;
    const gender = formData.gender;
    const monthlySalary = parseFloat(formData.salary);
    const annualSalary = monthlySalary * 12;
    const basic = Math.round(annualSalary * 0.67);
    const medical = Math.round(basic * 0.1);
    const taxable = annualSalary - medical;

    // Tax Calculation based on slabs
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

    setResult({
      name,
      gender,
      monthlySalary,
      annualSalary,
      basic,
      medical,
      taxable,
      annualTax,
      monthlyTax,
      netPayable,
      breakdown,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="salary"
          placeholder="Monthly Salary (PKR)"
          required
          value={formData.salary}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="overflow-auto">
          <h3 className="font-semibold text-lg mb-2">Salary Breakdown</h3>
          <table className="w-full border text-left text-sm">
            <tbody>
              <tr>
                <td className="border p-2">Name</td>
                <td className="border p-2">{result.name}</td>
              </tr>
              <tr>
                <td className="border p-2">Gender</td>
                <td className="border p-2">{result.gender}</td>
              </tr>
              <tr>
                <td className="border p-2">Monthly Salary</td>
                <td className="border p-2">
                  Rs {result.monthlySalary.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2">Annual Salary</td>
                <td className="border p-2">
                  Rs {result.annualSalary.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2">Basic (67%)</td>
                <td className="border p-2">
                  Rs {result.basic.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2">Medical (10%)</td>
                <td className="border p-2">
                  Rs {result.medical.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2">Taxable Income</td>
                <td className="border p-2">
                  Rs {result.taxable.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2">Tax Formula</td>
                <td className="border p-2">{result.breakdown}</td>
              </tr>
              <tr>
                <td className="border p-2">Annual Tax</td>
                <td className="border p-2">
                  Rs {result.annualTax.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2">Monthly Tax</td>
                <td className="border p-2">
                  Rs {result.monthlyTax.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Net Payable</td>
                <td className="border p-2 font-bold">
                  Rs {result.netPayable.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
