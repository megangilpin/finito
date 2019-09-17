import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div className="collapse bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4 className="text-white">About</h4>
              <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
              <h4 className="text-white">Contact</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
          <a className="text-white navbar-brand d-flex align-items-center">
            <strong><i className="fas fa-map-marked-alt mr-2"></i>Trips</strong>
          </a>
          <a className="text-white navbar-brand d-flex align-items-center">
            <strong><i className="fas fa-map-marked-alt mr-2"></i>Trips</strong>
          </a>
          <a className="text-white navbar-brand d-flex align-items-center">
            <strong><i className="fas fa-map-marked-alt mr-2"></i>Trips</strong>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
//       <p class="mb-0 p-3">Google Book Search</p>
//       <div className="collapse navbar-collapse">
//         <ul className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link
//               to="/"
//               className={
//                 window.location.pathname === "/" || window.location.pathname === "/about"
//                   ? "nav-link active"
//                   : "nav-link"
//               }
//             >
//               Search
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/saved"
//               className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
//             >
//               Saved Books
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

export default Nav;
