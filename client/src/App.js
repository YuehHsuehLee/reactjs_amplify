import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import HomeGuardian from './components/HomeGuardian';
import WorldGuardian from './components/WorldGuardian';
import PoliticsGuardian from './components/PoliticsGuardian';
import BusinessGuardian from './components/BusinessGuardian';
import TechnologyGuardian from './components/TechnologyGuardian';
import SportsGuardian from './components/SportsGuardian';

import HomeNYTimes from './components/HomeNYTimes';
import WorldNYTimes from './components/WorldNYTimes';
import PoliticsNYTimes from './components/PoliticsNYTimes';
import BusinessNYTimes from './components/BusinessNYTimes';
import TechnologyNYTimes from './components/TechnologyNYTimes';
import SportsNYTimes from './components/SportsNYTimes';

import SearchGuardian from './components/SearchGuardian';
import SearchNYTimes from './components/SearchNYTimes';

import ArticleGuardian from './components/ArticleGuardian';
import ArticleNYTimes from './components/ArticleNYTimes';
import _ from "lodash";
import { Typeahead } from 'react-bootstrap-typeahead';

import { Layout } from './components/Layout';
import NavigationBar from './components/NavigationBar';

import { Nav, Navbar, NavItem, Form, Button, FormGroup, FormControl, ControlLabel, Container } from 'react-bootstrap';
import SwitchBtn from "react-switch";
import styled from 'styled-components'; 

const Styles = styled.div`
  .navbar {
    background: linear-gradient(to right, #191970, #1E90FF 99%);
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }

    .react-switch {
    margin-top:5px;
}
`;

class App extends Component {
    
    constructor() {
        super();
        this.state = { checked: false,
                       results: [],
                       selectedResult: null,
                       searchKeyword: null,
                       isSearching: false,
                       redirectGuardianSearch: false, 
                       redirectNYTimesSearch: false,
                       needReload: false};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.textInput = React.createRef(); 
        this.handleUrlChange = this.handleUrlChange.bind(this);
        localStorage.setItem('isSearching', false);
//        this.handleResultSelect = this.handleResultSelect.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            console.log('URL changed !');
            window.location.reload();
            
        }
    }
    
    // Switch between 'NYTimes' and 'Guardian' is checked or not
    handleChange(checked) {
        this.setState({ checked });
        localStorage.setItem('checked', checked);
    };
    
    // Autosuggestion for Searching
    handleSearchChange = async (input, event) => {
        try {
          const response = await fetch(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${input}`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "27147043a7b04d2994202c95b0f833d3"
              }
            }
          );
          const data = await response.json();
          const resultsRaw = data.suggestionGroups[0].searchSuggestions;
          const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
          this.setState({ results });
          console.log('Autosuggestion: ', this.state.results);
        } catch (error) {
          console.error(`Error fetching search ${input}`);
        }
    };


    // Searching Event
    handleOnClick = async (input, event) => {
        try{
            console.log('You click keyword: ', input[0].title)
            this.setState({ isSearching: true, searchKeyword: input[0].title });
            localStorage.setItem('isSearching', true);
            
            //Searching Guardian Articles
            if(localStorage.getItem('checked') === 'true'){
                this.setState({ redirectGuardianSearch: true });
                localStorage.setItem('redirectGuardianSearch', true);
            } 
            
            //Searching NYTimes Articles
            else{
                this.setState({ redirectNYTimesSearch: true });
                localStorage.setItem('redirectNYTimesSearch', true);
            } 
            
            this.setState({ needReload: true });
            
        } catch (error) {
            console.error('Clicking option error');
        }
    };

    handleUrlChange() {
        window.location.reload();
    }

//    handleResultSelect = (e) => {
//        this.setState({ selectedResult: this.textInput.current.getInput() });
//    };

    
  render() {
      console.log('Guardian or NYTimes? ', localStorage.getItem('checked') === 'true' ? 'Guardian' : 'NYTimes');
      console.log('isSearching: ?', this.state.isSearching);
      console.log('Guardian Searching? ',this.state.redirectGuardianSearch); 
      console.log('NYTimes Searching? ',this.state.redirectNYTimesSearch); 
      
      return(
           <React.Fragment>
                <Styles>
                    <Navbar style={{ minWidth: 960 }}>

                        <Typeahead
                            id="inputForm"
                            placeholder="Enter keywords .."
                            labelKey='title' 
                            filterBy={['title']} 
                            emptyLabel='Loading'
                            ref={this.textInput}
                            onInputChange= {
                            _.debounce(this.handleSearchChange, 1000, {
                                    leading: true
                                })
                            } 
                            onChange = { (pressed) => this.handleOnClick(pressed)}
                            options={this.state.results}
                        />

                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/World">World</Nav.Link>
                            <Nav.Link href="/Politics">Politics</Nav.Link>
                            <Nav.Link href="/Business">Business</Nav.Link>
                            <Nav.Link href="/Technology">Technology</Nav.Link>
                            <Nav.Link href="/Sports">Sports</Nav.Link>
                        </Nav>
                        
                        {localStorage.getItem('isSearching') === 'true' ? null : 
                            <label>
                                <span>NYTimes  </span>
                                <SwitchBtn
                                    onChange={this.handleChange}
                                    checked={localStorage.getItem('checked') === 'true'}
                                    className="react-switch"
                                />
                                <span>  Guardian</span>
                            </label>
                        }
        
                    </Navbar>
                </Styles>
        
                

                <Router>
                    
                    {this.state.redirectGuardianSearch ? 
                        <Redirect to={{ pathname: "/api/search/guardian/q?keyword=" + this.state.searchKeyword, state: { keyword: this.state.searchKeyword }}} /> : null}

                    {this.state.redirectNYTimesSearch ? 
                        <Redirect to={{ pathname: "/api/search/nytimes/q?keyword=" + this.state.searchKeyword, state: { keyword: this.state.searchKeyword }}} /> : null}


                    <Layout>
                        <Switch>
                            <Route exact path="/" component={localStorage.getItem('checked') === 'true' ? HomeGuardian : HomeNYTimes} />
                            <Route path="/world" component={localStorage.getItem('checked') === 'true' ? WorldGuardian : WorldNYTimes} />
                            <Route path="/politics" component={localStorage.getItem('checked') === 'true' ? PoliticsGuardian : PoliticsNYTimes} />
                            <Route path="/business" component={localStorage.getItem('checked') === 'true' ? BusinessGuardian : BusinessNYTimes} />
                            <Route path="/technology" component={localStorage.getItem('checked') === 'true' ? TechnologyGuardian : TechnologyNYTimes} />
                            <Route path="/sports" component={localStorage.getItem('checked') === 'true' ? SportsGuardian : SportsNYTimes} />
                                
                            <Route path="/api/article/guardian" component={ArticleGuardian} />
                            <Route path="/api/article/nytimes" component={ArticleNYTimes} />
                            
                            <Route path="/api/search/guardian" component={SearchGuardian} />
                            <Route path="/api/search/nytimes" component={SearchNYTimes} />
                            
                        </Switch>
                    </Layout>
                </Router>
            </React.Fragment> 
    );
  }
}

export default withRouter(App);

