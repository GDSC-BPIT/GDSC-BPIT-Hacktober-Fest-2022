import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Story Wall</h1>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link
          to='/create'
          style={{
            color: "black",
            backgroundColor: "#00ffff ",
            boxShadow: "4px 4px 0 0 #fffbf5",
          }}
        >
          New Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
