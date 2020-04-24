import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Truncate from 'react-truncate';
import Loader from 'react-loader-spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import commentBox from 'commentbox.io';
import qs from 'qs';

import './Article.css';

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


class ArticleGuardian extends Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: []
    };
    }

    componentDidMount() {
        const { articleId } = this.props.location.state
        console.log(articleId);
        
        fetch('/api/article/guardian/search?id=' + articleId, {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        
        .then(res => res.json())
        .then( (result) => {
        this.setState({ results: result.response, isLoaded: true }, 
                        () => console.log('Full Article fetched...', this.state.results));
                      });
        
        this.removeCommentBox = commentBox('5684839231520768-proj', {
            createBoxUrl(boxId, pageLocation) {
				pageLocation.search = this.state.results.content.id; // removes query string!
                pageLocation.hash = boxId;
                return this.state.results.content.id;
            },
        });
        
    }
    
    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
        const { error, isLoaded, results } = this.state;

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
                    <Card>
                
                        <Card.Body>
                            <Card.Title> 
                                {this.state.results.content.webTitle}

                                <Row className='dateRow'>
                                    <Col>
                                        {this.state.results.content.webPublicationDate.substring(0, 10)}
                                    </Col>

                                    <Col>
                                        <div className='shareCol'>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip id='tooltipFacebook'>
                                                    Facebook
                                                    </Tooltip>}>
                                                <FacebookShareButton url={this.state.results.content.webUrl} hashtag='#CSCI_571_NewsApp'>
                                                    <FacebookIcon size={25} round />
                                                </FacebookShareButton>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip id='tooltipFacebook'>
                                                    Twitter
                                                    </Tooltip>}>
                                                <TwitterShareButton url={this.state.results.content.webUrl} hashtags={['CSCI_571_NewsApp']}>
                                                    <TwitterIcon size={25} round />
                                                </TwitterShareButton>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip id='tooltipFacebook'>
                                                    Email
                                                    </Tooltip>}>
                                                <EmailShareButton url={this.state.results.content.webUrl} subject={'#CSCI_571_NewsApp'}>
                                                    <EmailIcon size={25} round />
                                                </EmailShareButton>
                                            </OverlayTrigger>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Title>

                            <Card.Img className='articleCardImg' variant="top" src={ this.state.results.content.blocks.main.elements[0].assets[this.state.results.content.blocks.main.elements[0].assets.length-1] ? this.state.results.content.blocks.main.elements[0].assets[this.state.results.content.blocks.main.elements[0].assets.length-1].file : "https://img.icons8.com/ios/500/000000/image.png"} />

                            <Card.Text>{this.state.results.content.blocks.body[0].bodyTextSummary}
                            </Card.Text> 

                            <div className="commentbox" />

                        </Card.Body>
                    </Card>
                </div>
            );
        }
    } 
}



export default ArticleGuardian;
