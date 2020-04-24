import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ButtonToolbar, Container, Row, Col, Spinner } from 'react-bootstrap';
import Truncate from 'react-truncate';
import Text from 'react-text';
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { createBrowserHistory as history} from 'history';

import ShareModal from './ShareModal';
import './Home.css';

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';


class HomeNYTimes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: []
        };
    
  }
    
    componentDidMount() {
        fetch('http://ec2-3-84-36-254.compute-1.amazonaws.com:5000/api/nytimes/home')
        .then(res => res.json())
        .then( (result) => {
                this.setState({ results: result.results, isLoaded: true }, 
                () => console.log('NYTimes Home Result fetched...', result.results))
              })
  }
    

render() {
    const { error, isLoaded, results } = this.state;
    const temp = this.state.results.filter(article => article.multimedia[0].width > 2000);
    const articleToRender = temp.slice(0, 10);
    
    const SECTIONID = {
    'world': 'purple',
    'politics': 'green',
    'business': 'blue',
    'technology': 'lightgreen',
    'sport': 'yellow', 
    'guardian favorite': 'navy',
    'ny times facorite': 'lightgray'
    };
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
                }}>
                    <Row>
                        <Spinner animation="grow" variant="primary" />
                    </Row>
                    <Row>   
                        Loading
                    </Row>
            </div>
    } else {    
        return (
            <div className='cardContainer'>
            
                {articleToRender.map( (result) => 
            
                    <Card key={result.url} >
                        
                        <ShareModal title={result.title} webUrl={result.url} /> 
                        
                        <Link to= {{
                            pathname: '/api/article/nytimes/search?id=' + result.url,
                            state: {
                            articleId: result.url
                            }
                        }}>
                            
                        <Row>
                            <Col sm={4}>
                                <Card.Img className='homeCardImg' variant="top" src={ result.multimedia ? result.multimedia[0].url : 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg' } />
                            </Col>

                            <Col sm={8}>
                                <Card.Body>
                                    <Card.Title> 
                                        {result.title}
                            
                                    </Card.Title>
            
                                    <Card.Text>
                                        <Truncate lines={3} ellipsis={<span>...</span> 
                                        }>
                                            {result.abstract}
                                        </Truncate>
                                    </Card.Text>  
                                    
                                    <Row>
                                        <Col>{result.published_date.substring(0, 10)}</Col>

                                        <Col>
                                            <Button variant={(result.section in SECTIONID) ? SECTIONID[result.section] : 'gray'} size="sm">{result.section.toUpperCase()}</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Link>
                    </Card>
                )}
            </div>
        );
    }
}  
}

export default HomeNYTimes;
