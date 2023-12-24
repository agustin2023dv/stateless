import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';


function App() {
  return (
    <Router>
      <div>
       
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />

          <Route path='/my-profile' component={MyProfile}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
