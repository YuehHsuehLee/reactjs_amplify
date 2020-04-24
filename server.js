const express = require('express');
const app = express();
const request = require('request');
const querystring = require('querystring');

const guardianApiKey = '18b848cb-bcf5-4f34-97f3-44803c4eb843';
const nytimesApiKey = 'IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';

app.get('/api/guardian/home', (req, res) => {
    
    var guardianHomeUrl = 'https://content.guardianapis.com/search?api-key=18b848cb-bcf5-4f34-97f3-44803c4eb843&section=(sport%7Cbusiness%7Ctechnology%7Cpolitics)&show-blocks=all';
    
    request(guardianHomeUrl, function (error, response, body) {
        console.log ('guardianHomeUrl:  ' + guardianHomeUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);

        var guardianHomeData = JSON.parse(body);
        res.json(guardianHomeData);
//        console.log(guardianHomeData.response);
    });  
})

app.get('/api/guardian/world', (req, res) => {
    
    var guardianWorldUrl = 'https://content.guardianapis.com/world?api-key=18b848cb-bcf5-4f34-97f3-44803c4eb843&show-blocks=all';
    
    request(guardianWorldUrl, function (error, response, body) {
        console.log ('guardianWorldUrl:  ' + guardianWorldUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);

        var guardianWorldData = JSON.parse(body);
        res.json(guardianWorldData);
//        console.log(guardianHomeData.response);
    });  
})

app.get('/api/guardian/politics', (req, res) => {
    
    var guardianPoliticsUrl = 'https://content.guardianapis.com/politics?api-key=18b848cb-bcf5-4f34-97f3-44803c4eb843&show-blocks=all';
    
    request(guardianPoliticsUrl, function (error, response, body) {
        console.log ('guardianPoliticsUrl:  ' + guardianPoliticsUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);

        var guardianPoliticsData = JSON.parse(body);
        res.json(guardianPoliticsData);
//        console.log(guardianHomeData.response);
    });  
})

app.get('/api/guardian/business', (req, res) => {
    
    var guardianBusinessUrl = 'https://content.guardianapis.com/business?api-key=18b848cb-bcf5-4f34-97f3-44803c4eb843&show-blocks=all';
    
    request(guardianBusinessUrl, function (error, response, body) {
        console.log ('guardianBusinessUrl:  ' + guardianBusinessUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);

        var guardianBusinessData = JSON.parse(body);
        res.json(guardianBusinessData);
//        console.log(guardianHomeData.response);
    });  
})

app.get('/api/guardian/technology', (req, res) => {
    
    var guardianTechnologyUrl = 'https://content.guardianapis.com/technology?api-key=18b848cb-bcf5-4f34-97f3-44803c4eb843&show-blocks=all';
    
    request(guardianTechnologyUrl, function (error, response, body) {
        console.log ('guardianTechnologyUrl:  ' + guardianTechnologyUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);

        var guardianTechnologyData = JSON.parse(body);
        res.json(guardianTechnologyData);
//        console.log(guardianHomeData.response);
    });  
})

app.get('/api/guardian/sports', (req, res) => {
    
    var guardianSportsUrl = 'https://content.guardianapis.com/sport?api-key=18b848cb-bcf5-4f34-97f3-44803c4eb843&show-blocks=all';
    
    request(guardianSportsUrl, function (error, response, body) {
        console.log ('guardianSportsUrl:  ' + guardianSportsUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);

        var guardianSportsData = JSON.parse(body);
        res.json(guardianSportsData);
//        console.log(guardianHomeData.response);
    });  
})

app.get('/api/nytimes/home', (req, res) => {
    
    var nytimesHomeUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';
    
    request(nytimesHomeUrl, function (error, response, body) {
        console.log ('nytimesHomeUrl:  ' + nytimesHomeUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        console.log(nytimesHomeUrl);

        var nytimesHomeData = JSON.parse(body);
        res.json(nytimesHomeData);
        console.log(nytimesHomeData);
    });  
})

app.get('/api/nytimes/world', (req, res) => {
    
    var nytimesUrl = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';
    
    request(nytimesUrl, function (error, response, body) {
        console.log ('nytimesUrl:  ' + nytimesUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        console.log(nytimesUrl);

        var nytimesData = JSON.parse(body);
        res.json(nytimesData);
//        console.log(nytimesData);
    });  
})

app.get('/api/nytimes/politics', (req, res) => {
    
    var nytimesUrl = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';
    
    request(nytimesUrl, function (error, response, body) {
        console.log ('nytimesUrl:  ' + nytimesUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        console.log(nytimesUrl);

        var nytimesData = JSON.parse(body);
        res.json(nytimesData);
//        console.log(nytimesData);
    });  
})

app.get('/api/nytimes/business', (req, res) => {
    
    var nytimesUrl = 'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';
    
    request(nytimesUrl, function (error, response, body) {
        console.log ('nytimesUrl:  ' + nytimesUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        console.log(nytimesUrl);

        var nytimesData = JSON.parse(body);
        res.json(nytimesData);
//        console.log(nytimesData);
    });  
})

app.get('/api/nytimes/technology', (req, res) => {
    
    var nytimesUrl = 'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';
    
    request(nytimesUrl, function (error, response, body) {
        console.log ('nytimesUrl:  ' + nytimesUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        console.log(nytimesUrl);

        var nytimesData = JSON.parse(body);
        res.json(nytimesData);
//        console.log(nytimesData);
    });  
})

app.get('/api/nytimes/sports', (req, res) => {
    
    var nytimesUrl = 'https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=IjN9uINUq8PGnbzmj1avYAWr8NlhjAbR';
    
    request(nytimesUrl, function (error, response, body) {
        console.log ('nytimesUrl:  ' + nytimesUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        console.log(nytimesUrl);

        var nytimesData = JSON.parse(body);
        res.json(nytimesData);
//        console.log(nytimesData);
    });  
})



app.get('/api/article/guardian/search', (req, res) => {
    
    let articleId = req.query.id;
    var guardianArticleUrl = 'https://content.guardianapis.com/' + articleId + '?api-key=' + guardianApiKey + '&show-blocks=all';
    
    request(guardianArticleUrl, function (error, response, body) {
        console.log ('guardianArticleUrl:  ' + guardianArticleUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        
        var guardianArticleData = JSON.parse(body);
        res.json(guardianArticleData);
//        console.log(guardianArticleData);
    });  
})

app.get('/api/article/nytimes/search', (req, res) => {
    
    let articleId = req.query.id;
    var nytimesArticleUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + articleId + '")&api-key=' + nytimesApiKey;
    
    request(nytimesArticleUrl, function (error, response, body) {
        console.log ('nytimesArticleUrl:  ' + nytimesArticleUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        
        var nytimesArticleData = JSON.parse(body);
        res.json(nytimesArticleData);
//        console.log(nytimesArticleData);
    });  
})

app.get('/api/search/guardian/q', (req, res) => {
    
    let keyword = req.query.keyword;
    var guardianSearchUrl = 'https://content.guardianapis.com/search?q=' + keyword + '&api-key=' + guardianApiKey + '&show-blocks=all';
    
    request(guardianSearchUrl, function (error, response, body) {
        console.log ('guardianSearchUrl:  ' + guardianSearchUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        
        var guardianSearchData = JSON.parse(body);
        res.json(guardianSearchData);
        console.log(guardianSearchData.response.results);
    });  
})

app.get('/api/search/nytimes/q', (req, res) => {
    
    let keyword = req.query.keyword;
    var nytimesSearchUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + keyword + '&api-key=' + nytimesApiKey;
    
    request(nytimesSearchUrl, function (error, response, body) {
        console.log ('nytimesSearchUrl:  ' + nytimesSearchUrl);
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
        
        var nytimesSearchData = JSON.parse(body);
        res.json(nytimesSearchData);
        console.log(nytimesSearchData.response);
    });  
})

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);