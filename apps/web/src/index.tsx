import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import SuperTokens from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";

let id:string;

SuperTokens.init({
    appInfo: {
        appName: "platform",
        apiDomain: "http://localhost:8000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "PHONE",
            getRedirectionURL: async (context) => {
              if (context.action === "SUCCESS") {
                  if (context.redirectToPath !== undefined) {
                      // we are navigating back to where the user was before they authenticated
                      return context.redirectToPath;
                  }
                  return "/dashboard";
              }
              return undefined;
          },
          onHandleEvent: async (context) => {
            if (context.action === "SESSION_ALREADY_EXISTS") {
                // TODO:
            } else if (context.action === "PASSWORDLESS_RESTART_FLOW") {
                // TODO:
            } else if (context.action === "PASSWORDLESS_CODE_SENT") {
                // TODO:
            } else {
                id = context.user.id;
                console.log("ID: ", id)
                if (context.action === "SUCCESS") {
                    if (context.isNewUser) {
                        // TODO: Sign up
                    } else {
                        // TODO: Sign in
                    }
                }
            }
        }
        }),
        Session.init()
    ]
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let axiosInstance = axios.create({/*...*/});
Session.addAxiosInterceptors(axiosInstance);

async function callAPI() {
    // use axios as you normally do
    let response = await axiosInstance.get("http://localhost:8000");
    console.log(response);
    
}
callAPI()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
