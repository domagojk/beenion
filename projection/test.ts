import * as stream from 'getstream'

var client = stream.connect('yure5t5apfsn', '<secret>', '38917');

var ericFeed = client.feed('user', 'eric');

// Add the activity to the feed
ericFeed.addActivity({
  actor: 'eric', 
  tweet: 'Hello world from node', 
  verb: 'tweet', 
  object: 1
});

const jessicaFlatFeed = client.feed('timeline', 'jessica')
jessicaFlatFeed.follow('user', 'eric')

jessicaFlatFeed.get({'limit': 3})
  .then(console.log)
  .catch(console.error)