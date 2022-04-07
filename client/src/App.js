import Header from "./Components/Header";
import Home from "./Components/Home";
import CourseDetails from "./Components/CourseDetails";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import CourseUpdate from "./Components/CourseUpdate";
import NewCourse from "./Components/NewCourse";
import "./Style/App.scss";

import { UserProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/newCourse">
            <NewCourse />
          </Route>
          <Route path="/course-details/:id">
            <CourseDetails />
          </Route>
          <Route path="/course-update/:id">
            <CourseUpdate />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
