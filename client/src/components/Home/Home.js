import bg from '../../assests/bg.png';
import './Home.css';

const Home = ({ onSearch, cartItems }) => {
  return (
    <div>
      <header className="home">
        <div className="main-title">
          Find Your <br />
          Next Home
        </div>
        <div className="desc">
          Our user-friendly platform makes it easy to search for rental properties.
          With detailed listings, high-quality images, and transparent pricing,
          you’ll find exactly what you’re looking for.
        </div>
        <button className="know-button">Know More</button>
        <div className="bg-container">
          <img src={bg} alt="Urban Rental Background" className="background-image" />
        </div>
      </header>
      <div className="breaker"></div>
    </div>
  );
};

export default Home;
