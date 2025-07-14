import React from 'react'

const ResultTable = ({ data }) => {
  const rent = parseFloat(data.rent);
  const annualIncome = rent * 12;
  let tax = 0;
  let breakdown = "";

  if (annualIncome <= 300000) {
    tax = 0;
    breakdown = "Nil";
  } else if (annualIncome <= 600000) {
    tax = (annualIncome - 300000) * 0.05;
    breakdown = `5% of amount exceeding 300,000`;
  } else if (annualIncome <= 2000000) {
    tax = 15000 + (annualIncome - 600000) * 0.10;
    breakdown = `Rs 15,000 + 10% of amount exceeding 600,000`;
  } else {
    tax = 155000 + (annualIncome - 2000000) * 0.25;
    breakdown = `Rs 155,000 + 25% of amount exceeding 2,000,000`;
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-2">Calculation Result:</h3>
      <table className="w-full border text-left">
        <tbody>
          <tr>
            <td className="border p-2">Name</td>
            <td className="border p-2">{data.name}</td>
          </tr>
          <tr>
            <td className="border p-2">Gender</td>
            <td className="border p-2">{data.gender}</td>
          </tr>
          <tr>
            <td className="border p-2">Monthly Rent</td>
            <td className="border p-2">Rs {rent.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border p-2">Annual Income</td>
            <td className="border p-2">Rs {annualIncome.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border p-2">Tax Formula</td>
            <td className="border p-2">{breakdown}</td>
          </tr>
          <tr>
            <td className="border p-2 font-bold">Tax Payable</td>
            <td className="border p-2 font-bold">Rs {Math.round(tax).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default ResultTable
