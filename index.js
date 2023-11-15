import 'dotenv/config'
import linebot from 'linebot'
import fe from './commands/fe.js'
import be from './commands/be.js'
import anime from './commands/anime.js'
import { scheduleJob } from 'node-schedule'
import * as usdtwd from './data/usdtwd.js'

// https://crontab.guru/once-a-day
// 每一天執行 function
scheduleJob('0 0 * * *', () => {
  usdtwd.update()
})
// 要再呼叫一次，剛開起的時候再開一次
// 如果要知道東西哪裡來的，按住 ctrl 再按一次就會跳頁告訴你
usdtwd.update()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  if (event.message.type === 'text') {
    if (event.message.text === '前端') {
      fe(event)
    } else if (event.message.text === '後端') {
      be(event)
    } else if (event.message.text.startsWith('動畫')) {
      anime(event)
    } else if (event.message.text === '匯率') {
      event.reply(usdtwd.exrate.toString())
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
