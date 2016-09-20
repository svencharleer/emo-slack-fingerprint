# emo-slack-fingerprint
Emotional Fingerprint for Slack, a simple sentiment visualisation for Slack activity

Before you begin, check out the following blog post:
http://svencharleer.com/blog/2015/06/10/your-emotional-fingerprint-on-slack/ 

## Run

Simply run it with `node bin/www`

## Your own Slack data

To import your own Slack data, it is required to export all messages of e.g. a channel into the following JSON format:

    [
        {
        "username": "person1", 
        "verb": "message", 
        "context": "roomid", 
        "starttime": "01/03/20015 08:37 AM", 
        "object": "It's a beautiful day!"
        }, 
        
        {
        "username": "person2", 
        "verb": "message", 
        "context": "roomid", 
        "starttime": "01/02/2015 07:39 AM", 
        "object": "I give up..."
        },
     ...
    ]
  
  The important fields are username, starttime and object (the content of the chat message).
  
  You can either replace the `/public/testdata/output.json` file, or host your own json file and edit the `/config.json` file to point to this file.

    {
    "host": "localhost",
    "port": 3000,
    "path": "/testdata/output.json"	
    }
  
## No complete Slack solution?

This was a quick visualisation prototype/tryout, using a backend system created by my former colleague [Jose Luis Santos](https://about.me/jlsantoso), which he hooked up to our Slack team. This system was specifically made for Learning Enviroments (read our [journal paper](http://jucs.org/jucs_21_7/tracking_data_in_open/jucs_21_07_0976_0996_santos.pdf) for more details on that), built on the [xAPI](http://tincanapi.com/) standard. It should be easy enough to export your data to the correct format, or modify these scripts to work with your own. However, if there is a demand, we can look into publishing a  complete Slack to Emo-Fingerprint solution.

## Questions?
  
You can always bug me at [@svencharleer](http://twitter.com/svencharleer), happy to help!
