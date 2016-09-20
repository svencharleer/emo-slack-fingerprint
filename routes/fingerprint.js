// Emotional Fingerprint, a simple sentiment visualisation for Slack.
// created by
// Sven Charleer - @svencharleer svencharleer.com

var express = require('express');
var router = express.Router();

var Retext = require('retext');
var sentiment = require('retext-sentiment');
var http = require('http');
var retext = new Retext()
    .use(sentiment);

var config = require("../config.json")

// have all callbacks .. called back?
var json = {};
var areWeDone = function(r,res)
{
    if(json.length <= r.total)
        res.render('fingerprint', { data: JSON.stringify(r) });
}

// calculate sentiment for each entry per user
router.index = function(req, res, next){
    console.log("file is " + req.params.file);
    
    doGET(config.host, config.port, config.path, function(data){
      json = data;
      var result = {total:0, highestPolarity:0, lowestPolarity:0, data:{}};

      json.forEach(function(e){
          if(result.data[e.username] == undefined)
              result.data[e.username] = {sentiment:[]};


          retext.parse(e.object, function (err, tree) {
              var polarity =  tree.data.polarity;
              result.data[e.username].sentiment.push(
                  {polarity: polarity  , datetime: e.starttime, text: e.object});

              result.total++;

              if(result.highestPolarity <polarity) result.highestPolarity = polarity;
              if(result.lowestPolarity > polarity) result.lowestPolarity = polarity;
              //check if we're done
              areWeDone(result,res);

          });
      })
    });


};

//http get function
function doGET(host, port, path, callback, auth) {

    var options = {
        host: host,
        port: port,
        path: path,
        method: 'GET'
    };
    if(auth != undefined)
    {
        options.headers = {"Authorization": auth};
    }
    var lastChunk = "";
    var totalData = [];
    var dataPerPage = "";

    var fetchRequest = function (result) {

        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            dataPerPage += chunk;
            lastChunk = chunk;

        });
        result.on('end', function () {

            totalData = totalData.concat(JSON.parse(dataPerPage));
            callback(totalData);


        });
    }
    var req = http.request(options, fetchRequest);
    req.end();
    return;
}



module.exports = router;
