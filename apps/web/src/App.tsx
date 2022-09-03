import React from 'react';
import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom, SuperTokensWrapper} from "supertokens-auth-react";
import { PasswordlessAuth } from "supertokens-auth-react/recipe/passwordless";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import MyDashboardComponent from './Dashboard';
import Dashboard from './Dashboard';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  render() {
    if (SuperTokens.canHandleRoute()) {
      // This renders the login UI on the /auth route
      return SuperTokens.getRoutingComponent()
  }
      return (
          <SuperTokensWrapper>
                <BrowserRouter>
                    <Routes>
                    <Route path="/dashboard" element={
                        <PasswordlessAuth
                        onSessionExpired={() => {
                          alert("Session expired!");
                        }}>
                            {/*Components that require to be protected by authentication*/}
                       
                        </PasswordlessAuth>
                    } />
                    </Routes>
                </BrowserRouter>
          </SuperTokensWrapper>
      );
  }
}
export default App;
