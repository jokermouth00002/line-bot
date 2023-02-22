  const {client} = require('./routes/line')
  const pushMessage=()=>{
    // const message = {
    //   type: 'text',
    //   text: 'Hello World!'
    // };
    const message= {
      type: 'template',
      altText: 'this is a carousel template',
      template: {
        type: 'carousel',
        columns: [
          {
            thumbnailImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
            imageBackgroundColor: '#FFFFFF',
            title: 'this is menu',
            text: 'description',
            defaultAction: {
              type: 'uri',
              label: 'View detail',
              uri: 'https://ithelp.ithome.com.tw/2020ironman',
            },
            actions: [
              {
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=111',
              },
              {
                type: 'message',
                label: 'Osense',
                text: 'Osense',
              },
              {
                type: 'uri',
                label: 'View detail',
                uri: 'https://ithelp.ithome.com.tw/2020ironman',
              },
            ],
          },
          {
            thumbnailImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
            imageBackgroundColor: '#000000',
            title: 'this is menu',
            text: 'description',
            defaultAction: {
              type: 'uri',
              label: 'View detail',
              uri: 'https://ithelp.ithome.com.tw/2020ironman',
            },
            actions: [
              {
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=222',
              },
              {
                type: 'message',
                label: 'Osense',
                text: 'Osense',
              },
              {
                type: 'uri',
                label: 'View detail',
                uri: 'https://ithelp.ithome.com.tw/2020ironman',
              },
            ],
          },
        ],
        imageAspectRatio: 'rectangle',
        imageSize: 'cover',
      },
    };

    client.pushMessage('U4d19e311a8a95f54d1e0adffb5137eca', message)
    .then(() => {

    })
    .catch((err) => {
      console.log(err)
    });
  }
  pushMessage()

