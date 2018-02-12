var Twitter = require('twitter');

var extractMaxId = function(url) {
    return url.split("max_id=")[1].split("&")[0];
}

var twitterSearch = function(config, query, max_id) {
    return new Promise(function(resolve,reject){
        var params = { q: query, count: 100 };
        if (max_id) params.max_id = max_id;
        
        var client = new Twitter(config);
        client.get('search/tweets', params, function(error, tweets, response) {
            var body = JSON.parse(response.body);
            if (error || body.errors) {
                reject(error ? error : body.errors);
            } else {
                var tweetsList = tweets.statuses;
                if ( tweets.statuses.length < params.count ) {
                    resolve({ tweets: tweetsList });
                } else {
                    var next_max_id = extractMaxId(tweets.search_metadata.next_results);
                    if (max_id !== next_max_id) {
                        twitterShareCount(config, query, next_max_id).then(function(response) {
                            resolve({ tweets: tweetsList.concat(response.tweets) });
                        }, function(e) { 
                            resolve( { tweets: tweetsList })
                        });
                    } else {
                        resolve({ tweets: tweetsList })
                    }
                }
            }
        });
    });
}
var twitterShareCount = function(config, query, max_id) {
    return new Promise(function(resolve,reject){
        twitterSearch(config, query, max_id).then(function(response) {
            resolve({shares: response.tweets.length});
        }, function(e){
            reject(e);
        } );
    });
}

module.exports = twitterShareCount;