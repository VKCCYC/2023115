// 用 function 包住 這樣每次呼叫都是乾淨未被修改過的
export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        uri: 'http://linecorp.com/'
      }
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          size: 'xl'
        }
      ]
    }
  }
}
