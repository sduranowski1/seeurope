// import React from 'react';
// import { Link } from 'react-router-dom'; // Assuming you're using react-router
// import './Breadcrumbs.scss';
//
// export const Breadcrumbs = ({ paths }) => {
//     return (
//         <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//                 {paths.map((path, index) => (
//                     <li
//                         key={index}
//                         className={`breadcrumb-item ${
//                             index === paths.length - 1 ? 'active' : ''
//                         }`}
//                     >
//                         {index === paths.length - 1 ? (
//                             path.label
//                         ) : (
//                             <Link to={path.link}>{path.label}</Link>
//                         )}
//                     </li>
//                 ))}
//             </ol>
//         </nav>
//     );
// };
