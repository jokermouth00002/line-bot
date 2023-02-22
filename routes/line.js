require('dotenv').config();

const express = require('express');
const router = express.Router();

const line = require('@line/bot-sdk');

// create LINE SDK client
const client = new line.Client({
  channelAccessToken: process.env['CHANNEL_ACCESS_TOKEN'],
  channelSecret: process.env['CHANNEL_SECRET']
});

router.post('/', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


// event handler
function handleEvent(event) {
  console.log(`使用者 ID: ${event.source.userId}`);
  if (event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff') {
    return Promise.resolve(null);
  }
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  if (event.message.text === '測試1') {
    return client.replyMessage(event.replyToken, [
      {
        type: 'sticker',
        packageId: '1',
        stickerId: '2'
      },
      {
        type: 'image',
        originalContentUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
        previewImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg'
      },
      {
        type: 'video',
        originalContentUrl: 'https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
        previewImageUrl: 'https://www.collinsdictionary.com/images/full/apple_158989157.jpg'
      },
      {
        type: 'audio',
        originalContentUrl: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
        duration: '27000'
      },
      {
        type: 'location',
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203
      }
    ]);
  }
  if (event.message.text === '測試2') {
    return client.replyMessage(event.replyToken, [
      {
        type: 'imagemap',
        baseUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
        altText: 'Imagemap alt text',
        baseSize: {
          width: 1040,
          height: 1040
        },
        actions: [
          {
            area: {
              x: 0,
              y: 0,
              width: 520,
              height: 520
            },
            type: 'uri',
            linkUri: 'https://store.line.me/family/manga/en'
          },
          {
            area: {
              x: 520,
              y: 0,
              width: 520,
              height: 520
            },
            type: 'uri',
            linkUri: 'https://store.line.me/family/music/en'
          },
          {
            area: {
              x: 0,
              y: 520,
              width: 520,
              height: 520
            },
            type: 'uri',
            linkUri: 'https://store.line.me/family/play/en'
          },
          {
            area: {
              x: 520,
              y: 520,
              width: 520,
              height: 520
            },
            type: 'message',
            text: 'URANAI!'
          },
        ],
        video: {
          originalContentUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/video.mp4',
          previewImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/preview.jpg',
          area: {
            x: 280,
            y: 385,
            width: 480,
            height: 270,
          },
          externalLink: {
            linkUri: 'https://line.me',
            label: 'LINE'
          }
        },
      },
    ]);
  }
  if (event.message.text === 'Buttons template') {
    return client.replyMessage(event.replyToken,
      {
        type: 'template',
        altText: 'This is a buttons template',
        template: {
          type: 'buttons',
          thumbnailImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
          imageAspectRatio: 'rectangle',
          imageSize: 'cover',
          imageBackgroundColor: '#FFFFFF',
          title: 'Menu',
          text: 'Please select',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'http://example.com/page/123',
          },
          actions: [
            {
              type: 'postback',
              label: 'Buy',
              data: 'action=buy&itemid=123',
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
      });
  }
  if (event.message.text === 'Confirm template') {
    return client.replyMessage(event.replyToken,
      {
        type: 'template',
        altText: 'this is a confirm template',
        template: {
          type: 'confirm',
          text: 'Are you sure?',
          actions: [
            {
              type: 'message',
              label: 'Yes',
              text: 'yes',
            },
            {
              type: 'message',
              label: 'No',
              text: 'no',
            },
          ],
        },
    });
  }
  if (event.message.text === 'Carousel template') {
    return client.replyMessage(event.replyToken,
    {
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
    });
  }
  if (event.message.text === 'Image carousel template') {
    return client.replyMessage(event.replyToken,
      {
        type: 'template',
        altText: 'this is a image carousel template',
        template: {
          type: 'image_carousel',
          columns: [
            {
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
              action: {
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=111',
              },
            },
            {
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
              action: {
                type: 'message',
                label: 'Yes',
                text: 'yes',
              },
            },
            {
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/847px-Red_Apple.jpg',
              action: {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/222',
              },
            },
          ],
        },
    });
  }
  if(event.message.text === 'flex templete'){
    return client.replyMessage(event.replyToken,
      {
          type:"flex",
          altText:"flex message demo",
          contents:{
            "type": "carousel",
            "contents": [
              {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "image",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip1.jpg",
                      "size": "full",
                      "aspectMode": "cover",
                      "aspectRatio": "2:3",
                      "gravity": "top"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Brown's T-shirts",
                              "size": "xl",
                              "color": "#ffffff",
                              "weight": "bold"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "¥35,800",
                              "color": "#ebebeb",
                              "size": "sm",
                              "flex": 0
                            },
                            {
                              "type": "text",
                              "text": "¥75,000",
                              "color": "#ffffffcc",
                              "decoration": "line-through",
                              "gravity": "bottom",
                              "flex": 0,
                              "size": "sm"
                            }
                          ],
                          "spacing": "lg"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "filler"
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "contents": [
                                {
                                  "type": "filler"
                                },
                                {
                                  "type": "icon",
                                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
                                },
                                {
                                  "type": "text",
                                  "text": "Add to cart",
                                  "color": "#ffffff",
                                  "flex": 0,
                                  "offsetTop": "-2px"
                                },
                                {
                                  "type": "filler"
                                }
                              ],
                              "spacing": "sm"
                            },
                            {
                              "type": "filler"
                            }
                          ],
                          "borderWidth": "1px",
                          "cornerRadius": "4px",
                          "spacing": "sm",
                          "borderColor": "#ffffff",
                          "margin": "xxl",
                          "height": "40px"
                        }
                      ],
                      "position": "absolute",
                      "offsetBottom": "0px",
                      "offsetStart": "0px",
                      "offsetEnd": "0px",
                      "backgroundColor": "#03303Acc",
                      "paddingAll": "20px",
                      "paddingTop": "18px"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "SALE",
                          "color": "#ffffff",
                          "align": "center",
                          "size": "xs",
                          "offsetTop": "3px"
                        }
                      ],
                      "position": "absolute",
                      "cornerRadius": "20px",
                      "offsetTop": "18px",
                      "backgroundColor": "#ff334b",
                      "offsetStart": "18px",
                      "height": "25px",
                      "width": "53px"
                    }
                  ],
                  "paddingAll": "0px"
                }
              },
              {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "image",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip2.jpg",
                      "size": "full",
                      "aspectMode": "cover",
                      "aspectRatio": "2:3",
                      "gravity": "top"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Cony's T-shirts",
                              "size": "xl",
                              "color": "#ffffff",
                              "weight": "bold"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "¥35,800",
                              "color": "#ebebeb",
                              "size": "sm",
                              "flex": 0
                            },
                            {
                              "type": "text",
                              "text": "¥75,000",
                              "color": "#ffffffcc",
                              "decoration": "line-through",
                              "gravity": "bottom",
                              "flex": 0,
                              "size": "sm"
                            }
                          ],
                          "spacing": "lg"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "filler"
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "contents": [
                                {
                                  "type": "filler"
                                },
                                {
                                  "type": "icon",
                                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
                                },
                                {
                                  "type": "text",
                                  "text": "Add to cart",
                                  "color": "#ffffff",
                                  "flex": 0,
                                  "offsetTop": "-2px"
                                },
                                {
                                  "type": "filler"
                                }
                              ],
                              "spacing": "sm"
                            },
                            {
                              "type": "filler"
                            }
                          ],
                          "borderWidth": "1px",
                          "cornerRadius": "4px",
                          "spacing": "sm",
                          "borderColor": "#ffffff",
                          "margin": "xxl",
                          "height": "40px"
                        }
                      ],
                      "position": "absolute",
                      "offsetBottom": "0px",
                      "offsetStart": "0px",
                      "offsetEnd": "0px",
                      "backgroundColor": "#9C8E7Ecc",
                      "paddingAll": "20px",
                      "paddingTop": "18px"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "SALE",
                          "color": "#ffffff",
                          "align": "center",
                          "size": "xs",
                          "offsetTop": "3px"
                        }
                      ],
                      "position": "absolute",
                      "cornerRadius": "20px",
                      "offsetTop": "18px",
                      "backgroundColor": "#ff334b",
                      "offsetStart": "18px",
                      "height": "25px",
                      "width": "53px"
                    }
                  ],
                  "paddingAll": "0px"
                }
              }
            ]            
          }
      }
    )
  }
  if(event.message.text === 'Quick reply sample'){
    return client.replyMessage(event.replyToken,
      {
        type: 'text',
        text: 'Quick reply sample',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'postback',
                label: 'osense',
                data: 'action=url&item=clarence',
                text: 'osense'
              }
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'osense home',
                text: 'https://osensetech.com/'
              }
            },
            {
              type: 'action',
              action: {
                type: 'camera',
                label: 'Send camera'
              }
            },
            {
              type: 'action',
              action: {
                type: 'cameraRoll',
                label: 'Send camera roll'
              }
            },
            {
              type: 'action',
              action: {
                type: 'location',
                label: 'Send location'
              }
            }
          ]
        },
      }
    )
  }


  // create a echoing text message
  const echo = {
    type: 'text',
    text: event.message.text
  };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

module.exports =router

// when use push message
// module.exports ={router,client}