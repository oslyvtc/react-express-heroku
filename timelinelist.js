var Twitter = require('twitter');

module.exports = function(res, clientName){
	var text = [];
	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY || 'aPflykClxYELcYBWgL0NoPeRE',
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'bjddVIhhi1zjq6ofWWiVGjrkmX9DUhBNzTS8rLkjTQCdpDqrjF',
	  access_token_key: process.env.TWITTER_TOKEN_KEY || '986315835181498369-OI4dZzyCcokqiZSvi7hpxYfyYLlfe2V', 
	  access_token_secret: process.env.TWITTER_TOKEN_SECRET || 'a8k7jIJxFkruzyJC8M7YdtAAHV175wmbcnB0tby2M8ToM'
	}); 

	var params = {screen_name: clientName};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  
	  if (!error) {
	    tweets.forEach(function(twit){
	    	var tweet = {
	    		name: twit.user.name,
	    		avatar: twit.user.profile_image_url,
	    		postDate: twit.created_at,
	    		content: twit.text
	    	}
	    	text.push(tweet)
	    })
	    res.json( text ) 
	    
	  }
	});
}
 
