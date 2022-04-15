import { useContext } from "react"
import { Context } from "../Context"
import { Redirect, Route } from "react-router-dom"


export default ({children})=>{

    let [user,setUser]=useContext(Context)
        return(

            <Route path="/course-details/:id">

                    {
                        user?(

                            <>
                            {
                                children
                            }
                            
                            </>
                        ):(

                            <Redirect to="/signIn"/>
                        )
                    }


            </Route>
        )
}