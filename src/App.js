import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route path="/search">
            <Header />
            <Search />
          </Route>

          <Route path="/album/:id">
            <Header />
            <Album />
          </Route>

          <Route path="/favorites">
            <Header />
            <Favorites />
          </Route>

          <Route path="/profile/edit">
            <Header />
            <ProfileEdit />
          </Route>

          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>

          <Route path="*" component={ NotFound } />
        </Switch>

      </div>

    );
  }
}

export default App;
