import * as React from "react";
import * as ReactDOM from "react-dom";
import './style.css';


// class Popup1 extends React.Component {
//   render() {
//     return (
//       <div className='popup'>
//         <div className='popup\_inner'>
//           <h1>This is a popup</h1>
//           <button>close me</button>
//         </div>
//       </div> 
//     );
//   }
// }

export const Popup: React.FC = () => (
  <div className='popup' id="popup">
    <div className='popup\_inner'>
      <h1>This is a popup</h1>
      <button>close me</button>
    </div>
  </div>
)

//export default Popup;