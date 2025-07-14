import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <ul className="space-y-2">
        <li>
          <Link to="/rent-tax-25-26" className="text-blue-600 underline">
            Rental Tax 25-26
          </Link>
        </li>
        <li>
          <Link to="/salary-tax-25-26" className="text-blue-600 underline">
            Salaried Tax 25-26
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
