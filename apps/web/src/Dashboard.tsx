import { render } from "@testing-library/react";
import React from "react";
import { useSessionContext } from 'supertokens-auth-react/recipe/session'; 

// Your dashboard component

  
function Dashboard(props: any){

    let session = useSessionContext();

    if (session.loading) {
       return 
      (<div></div>)

    }

    if (!session.doesSessionExist) {
        return 

    } else {
        let {userId, accessTokenPayload} = session;
        console.log(session.userId)

        let role = accessTokenPayload.role;

        if (role === "admin") {
            // TODO..
        } else {
            // TODO..
        }
        
 
    }
}

export default Dashboard