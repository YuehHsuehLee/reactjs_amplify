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


class SearchNYTimes extends Component {
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
        
        fetch('/api/search/nytimes/q?keyword=' + keyword, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        
        .then(res => res.json())
        .then( (result) => {
        this.setState({ results: result.response.docs, isLoaded: true }, 
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
            
                    <Card key={result._id} >
                        
                        <ShareModal title={result.headline.main} webUrl={result.web_url} />
            
                        <Link to= {{
                            pathname: '/api/article/nytimes/search?id=' + result.web_url,
                            state: {
                            articleId: result.web_url
                            }
                        }}>
                            
                            <Card.Img variant="top" src={ result.multimedia[0] ? ('https://nyt.com/' + result.multimedia[0].url) : 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg' } />

                            <Card.Body>
                                <Card.Title> 
                                    {result.headline.main}
                                </Card.Title>

                                <Row>
                                    <Col>{result.pub_date.substring(0, 10)}</Col>

                                    <Col>
                                        <Button variant={(result.news_desk in SECTIONID) ? SECTIONID[result.news_desk] : 'gray'} size="sm">{result.news_desk.toUpperCase()}</Button>
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



export default SearchNYTimes;
