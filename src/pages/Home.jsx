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
        {/* Add more links here for future calculators */}
      </ul>
    </div>
  );
};

export default Home;
