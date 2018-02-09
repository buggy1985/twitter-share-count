# twitter-share-count
Returns the number of shares on Twitter for a URL.
It uses the Twitter Search API.

## Usage

Install it using NPM:

    npm i twitter-share-count -S

Get your auth keys from your [Twitter Apps](https://apps.twitter.com/) account (you might need to create a new app).

Then use it in your project:

    var twitterShareCount = require( 'twitter-share-count' );
    
    var auth = {
      consumer_key: 'YOUR_CONSUMER_KEY',
      consumer_secret: 'YOUR_CONSUMER_SECRET',
      access_token_key: 'YOUR_ACCESS_TOKEN_KEY',
      access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
    };
    
    twitterShareCount(auth, "http://www.example.com/")
       .then(function(result){
           console.log(result); // returns '{ shares: 7 }'
       });


 