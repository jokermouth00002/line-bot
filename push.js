  const {client} = require('./routes/line')
  const pushMessage=()=>{
    const message = {
      type: 'text',
      text: 'Hello World!'
    };

    client.pushMessage('U4d19e311a8a95f54d1e0adffb5137eca', message)
    .then(() => {

    })
    .catch((err) => {
      console.log(err)
    });
  }
  pushMessage()

