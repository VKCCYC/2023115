import axios from 'axios'
import * as cheerio from 'cheerio'
import beTemplate from '../templates/be.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    const replies = []
    $('#be .card').each(function () {
      // 取出圖片和標題
      const image = $(this).find('img').attr('src')
      const imageUrl = new URL(image, 'https://wdaweb.github.io/')
      const title = $(this).find('.card-title').text().trim()
      // 產生一個新的回應訊息模板
      const templates = beTemplate()
      // 修改模板內容
      // line 只吃 https 的路徑
      templates.hero.url = imageUrl
      templates.body.contents[0].text = title
      replies.push(templates)
      console.log(image, title)
    })
    const result = await event.reply({
      // 記得改 line 不吃 bubble
      type: 'flex',
      // 替代文字 altText: '後端課程',
      altText: '後端課程',
      contents: {
        type: 'carousel',
        contents: replies
      }
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
