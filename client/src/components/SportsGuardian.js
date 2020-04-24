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


class SportsGuardian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: []
        };
  }
    
    componentDidMount() {
        fetch('/api/guardian/sports')
        .then(res => res.json())
        .then( (result) => {
                this.setState({ results: result.response.results, isLoaded: true }, 
                () => console.log('Guardian Sports Result fetched...', result.response.results))
              })
  }
    

render() {
    const { error, isLoaded, results } = this.state;
    
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
            
                {this.state.results.map( (result) => 
            
                    <Card key={result.id} >
                        
                        <ShareModal title={result.webTitle} webUrl={result.webUrl} /> 
                        
                        <Link to= {{
                            pathname: '/api/article/guardian/search?id=' + result.id,
                            state: {
                            articleId: result.id
                            }
                        }}>
                            
                        <Row>
                            <Col sm={4}>
                                <Card.Img className='homeCardImg' variant="top" src={ result.blocks.main && result.blocks.main.elements[0] && result.blocks.main.elements[0].assets && result.blocks.main.elements[0].assets[result.blocks.main.elements[0].assets.length-1] ? result.blocks.main.elements[0].assets[result.blocks.main.elements[0].assets.length-1].file : 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'} />
                            </Col>

                            <Col sm={8}>
                                <Card.Body>
                                    <Card.Title> 
                                        {result.webTitle}
                            
                                    </Card.Title>
            
                                    <Card.Text>
                                        <Truncate lines={3} ellipsis={<span>...</span> 
                                        }>
                                            {result.blocks.body[0].bodyTextSummary}
                                        </Truncate>
                                    </Card.Text>  
                                    
                                    <Row>
                                        <Col>{result.webPublicationDate.substring(0, 10)}</Col>

                                        <Col>
                                            <Button variant={(result.sectionId in SECTIONID) ? SECTIONID[result.sectionId] : 'gray'} size="sm">{result.sectionId.toUpperCase()}</Button>
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

export default SportsGuardian;
