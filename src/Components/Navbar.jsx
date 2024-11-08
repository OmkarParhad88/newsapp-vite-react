import {Link} from 'react-router-dom'
import countries from "../country.json";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setRegion, setCode } from '../ReduxSlices/countrySlice';
const Navbar = () => {
  const region = useSelector((state) => state.country.region);
  // console.log(code);
  // console.log(region);
  const dispatch = useDispatch();
 return (
  <>
   <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div className="container-fluid">
     <Link className="navbar-brand" to="/newsapp">
      NewsApp
     </Link>
     <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
     >
      <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <li className="nav-item">
        <Link className="nav-link" to="newsapp">
         Top
        </Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="technology">
         Technology
        </Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="business">
         Business
        </Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="health">
         Health
        </Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="science">
         Science
        </Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="sports">
         Sports
        </Link>
       </li>
       <li className="nav-item">
        <Link className="nav-link" to="entertainment">
         Entertainment
        </Link>
       </li>
      </ul>
     </div>
     <Dropdown
      onSelect={(eventKey) => {
       dispatch(setCode(eventKey));
       const selected = countries.find((c) => c.code === eventKey);
       dispatch(setRegion(selected.country));
       //  console.log(code);
      }}
     >
      <DropdownButton
       // alignRight
       title={region}
       id="dropdown-menu-align-right"
      >
       <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
        {countries.map((country) => {
         // {console.log(country.name)}

         return (
          <Dropdown.Item eventKey={country.code}>
           {country.country}
          </Dropdown.Item>
         );
        })}
       </div>
      </DropdownButton>
     </Dropdown>
    </div>
   </nav>
  </>
 );
};

export default Navbar;