import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import TalkOverview from '../TalkOverview/TalkOverview';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import { config } from '../../api/config';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      talks: null,
      days: null
    };
  }

  componentDidMount(){
    fetch(`${config.API_URL}/days`)
      .then(response => response.json())
      .then(response => this.setState({ days: response}))
      .catch(err => console.error(err))

    fetch(`${config.API_URL}/talks`)
      .then(response => response.json())
      .then(response => this.setState({ talks: response}))
      .catch(err => console.error(err))
  }
  
  render() {
    const { talks, days } = this.state;
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path='/' render={(props) => <Home days={days} {...props} />} />
          <Route path='/day/:number' render={(props) => <TalkOverview talks={talks} days={days} {...props} />} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
