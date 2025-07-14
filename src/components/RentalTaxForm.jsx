// RentalTaxForm.jsx
import { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';

export default function RentalTaxForm() {
  const [formData, setFormData] = useState({ name: '', gender: '', rent: '' });
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthlyRent = parseFloat(formData.rent);
    const annualRent = monthlyRent * 12;
    const tax = annualRent <= 300000 ? 0 : Math.round((annualRent - 300000) * 0.15);
    const monthlyTax = Math.round(tax / 12);

    const newEntry = {
      name: formData.name,
      gender: formData.gender,
      monthlyRent,
      annualRent,
      tax,
      monthlyTax,
    };

    setEntries([...entries, newEntry]);
    setFormData({ name: '', gender: '', rent: '' });
  };

  const exportPDF = () => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('rental-tax.pdf');
    });
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between mb-4">
        <button onClick={toggleTheme} className="bg-black text-white px-4 py-2 rounded">
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <Link
          to="/"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Homepage
        </Link>
      </div>

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
          name="rent"
          placeholder="Monthly Rent"
          required
          value={formData.rent}
          onChange={handleChange}
          className="border p-2 w-full dark:bg-gray-800"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Entry
        </button>
      </form>

      {entries.length > 0 && (
        <div>
          <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 mb-4 rounded">
            Download PDF
          </button>

          <div className="overflow-auto" ref={printRef}>
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Monthly Rent</th>
                  <th className="border p-2">Annual Rent</th>
                  <th className="border p-2">Annual Tax</th>
                  <th className="border p-2">Monthly Tax</th>
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
                              setEditFormData({ ...editFormData, name: ev.target.value })
                            }
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="border p-2" colSpan={5}>
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
                        <td className="border p-2">Rs {e.monthlyRent.toLocaleString()}</td>
                        <td className="border p-2">Rs {e.annualRent.toLocaleString()}</td>
                        <td className="border p-2">Rs {e.tax.toLocaleString()}</td>
                        <td className="border p-2">Rs {e.monthlyTax.toLocaleString()}</td>
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
                              const filtered = entries.filter((_, i) => i !== index);
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
