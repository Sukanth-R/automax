import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/home" className="home-link">
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFound;