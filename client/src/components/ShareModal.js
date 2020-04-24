import React, { Component, useState } from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './ShareModal.css';

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


class ShareModal extends Component {
    constructor(props, context){
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
        this.state = {
            show: false,
        };
    } 

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    render(){
        return(
            <div>
                <Button className='shareBtn' variant="light" onClick={this.handleShow} />
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
            
                    <Modal.Body>
                        <Row>
                            {"Share via"}
                        </Row>
            
                        <Row>
                            <FacebookShareButton className='homePage' url={this.props.webUrl} hashtag='#CSCI_571_NewsApp'>
                                <FacebookIcon size={60} round />
                            </FacebookShareButton>

                            <TwitterShareButton className='homePage' url={this.props.webUrl} hashtags={['CSCI_571_NewsApp']}>
                                <TwitterIcon size={60} round />
                            </TwitterShareButton>

                            <EmailShareButton className='homePage' url={this.props.webUrl} subject={'#CSCI_571_NewsApp'}>
                                <EmailIcon size={60} round />
                            </EmailShareButton>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ShareModal;