'use strict'

const Slack = require('slack');


module.exports.run = async (data) => {
    const dataObject = JSON.parse (data.body);


    let response = {
        statusCode: 200,
        body : {},
        headers : {'X-Slack-No-Retry' : 1}
    }

    try {
        if ( !('X-Slack-Retry-Num' in data.headers) )
        {
            switch (dataObject.type) {
                case 'url_verification':
                    response.body = verifyCall (dataObject);
                    break;
                case 'event_callback':
    
                    if (!dataObject.event.thread_ts){
                        const params = {
                            token: 'xoxb-2695008022544-2664749892838-DYBueDk0KpP6CQV15XpmQkXI',
                            channel: dataObject.event.channel,
                            text: 'Hello',
                            thread_ts: dataObject.event.ts
                        }
        
                        Slack.chat.postMessage( params );
                    }
    
                    response.body = {ok: true}
    
                    break;
                    
                }
        }
    }
    catch ( err ) {

    }
    finally {
        return response;
    }

}

function verifyCall (data){
    return data.challenge;
}