import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDeck, CardColumns, Button, ButtonToolbar, Container, Row, Col, Spinner } from 'react-bootstrap';
import Truncate from 'react-truncate';
import Loader from 'react-loader-spinner';
import { createBrowserHistory as history} from 'history';
import commentBox from 'commentbox.io';
import ShareModal from './ShareModal';
import './Search.css';

//Not using 
import Text from 'react-text';
import { trackPromise } from 'react-promise-tracker';
import typy from 'typy';
import styled from 'styled-components';

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

const Styles = styled.div`
`;


class SearchGuardian extends Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: []
    };
    }

    componentDidMount() {
        const { keyword } = this.props.location.state
        console.log('Keyword is: ', keyword);
        
        fetch('/api/search/guardian/q?keyword=' + keyword, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        
        .then(res => res.json())
        .then( (result) => {
        this.setState({ results: result.response.results, isLoaded: true }, 
                        () => console.log('Search results fetched...', this.state.results));
                      });
        
//        this.removeCommentBox = commentBox('5684839231520768-proj', {
//            createBoxUrl(boxId, pageLocation) {
//				pageLocation.search = this.state.results.content.id; // removes query string!
//                pageLocation.hash = boxId;
//                return this.state.results.content.id;
//            },
//        });
        
    }
    
//    componentWillUnmount() {
//
//        this.removeCommentBox();
//    }

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
            <CardColumns >
            
                {this.state.results.map( (result) => 
            
                    <Card key={result.id} >
                        
                        <ShareModal title={result.webTitle} webUrl={result.webUrl} />
            
                        <Link to= {{
                            pathname: '/api/article/guardian/search?id=' + result.id,
                            state: {
                            articleId: result.id
                            }
                        }}>
                            
                            <Card.Img variant="top" src={ result.blocks.main && result.blocks.main.elements[0] && result.blocks.main.elements[0].assets && result.blocks.main.elements[0].assets[result.blocks.main.elements[0].assets.length-1] ? result.blocks.main.elements[0].assets[result.blocks.main.elements[0].assets.length-1].file : 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'} />

                            <Card.Body>
                                <Card.Title> 
                                    {result.webTitle}
                                </Card.Title>

                                <Row>
                                    <Col>{result.webPublicationDate.substring(0, 10)}</Col>

                                    <Col>
                                        <Button variant={(result.sectionId in SECTIONID) ? SECTIONID[result.sectionId] : 'gray'} size="sm">{result.sectionId.toUpperCase()}</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        
                        </Link>
                    </Card>
                )}
            </CardColumns>
        );
    }
}
}



export default SearchGuardian;
