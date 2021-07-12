const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1 ({
        version: '2021-7-12',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const query_url = req.query.url
    const nlp = getNLUInstance();
    const analyzeParams = {
        'url': query_url,
        'features': {
            'entities' : {
                'emotion' : true,
                'sentiment': false
            }, 'keywords': {
                'emotion': true,
                'sentiment': false

            }
        } 
    }

    nlp.analyze(analyzeParams).then(analysisresults => {
            const emotionResults = analysisresults.result.entities[0].emotion
            return res.send({emotions: emotionResults});
        }).catch( err => {
            console.log(err)
        })
});

app.get("/url/sentiment", (req,res) => {
    const query_url = req.query.url
    const nlp = getNLUInstance();
    const analyzeParams = {
        'url': query_url,
        'features': {
            'entities' : {
                'emotion' : false,
                'sentiment': true
            }, 'keywords': {
                'emotion': false,
                'sentiment': true
            }
        } 
    }

    nlp.analyze(analyzeParams).then(analysisresults => {
            const sentimentResult = analysisresults.result.entities[0].sentiment.label
            return res.send({sentiments: sentimentResult});
        }).catch( err => {
            console.log(err)
        })
});

app.get("/text/emotion", (req,res) => {
    const query_text = req.query.text
    const nlp = getNLUInstance();
    const analyzeParams = {
        'text': query_text,
        'features': {
            'entities' : {
                'emotion' : true,
                'sentiment': false
            }, 'keywords': {
                'emotion': true,
                'sentiment': false

            }
        } 
    }

    nlp.analyze(analyzeParams).then(analysisresults => {
            const emotionResults = analysisresults.result.entities[0].emotion
            return res.send({emotions: emotionResults});
        }).catch( err => {
                console.log(err)
        })
});

app.get("/text/sentiment", (req,res) => {
    const query_text = req.query.text
    const nlp = getNLUInstance();
    const analyzeParams = {
        'text': query_text,
        'features': {
            'entities' : {
                'emotion' : false,
                'sentiment': true
            }, 'keywords': {
                'emotion': false,
                'sentiment': true
            }
        } 
    }

    nlp.analyze(analyzeParams).then(analysisresults => {
            const sentimentResult = analysisresults.result.entities[0].sentiment.label
            return res.send({sentiments: sentimentResult});
        }).catch( err => {
            console.log(err)
        })
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

