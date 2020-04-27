const puppeteer = require('puppeteer')
const _ = require('lodash')
const fs = require('fs')

// * 0 中立, 1 恶魔猎手, 2 德鲁伊, 3 猎人, 4 法师, 5 圣骑士, 6 牧师, 7 盗贼, 8 萨满, 9 术士, 10 战士
const CLASS_NAMES = [
  'demon-hunter',
  'druid',
  'hunter',
  'mage',
  'paladin',
  'priest',
  'rogue',
  'shaman',
  'warlock',
  'warrior',
  'neutral'
]
const CLASS_DISPLAY_NAMES = {
  'demon-hunter': '恶魔猎手',
  druid: '德鲁伊',
  hunter: '猎人',
  mage: '法师',
  paladin: '圣骑士',
  priest: '牧师',
  rogue: '盗贼',
  shaman: '萨满',
  warlock: '术士',
  warrior: '战士',
  neutral: '中立'
}

// * cn is class name
async function heartharena(cn) {
  console.log(`${new Date()}  [heartharena] [${cn}] Start fetching...`)

  const browser = await puppeteer.launch({
    devtools: true,
    timeout: 0,
    defaultViewport: { width: 1440, height: 900 }
  })

  const page = await browser.newPage()
  await page.goto('https://www.heartharena.com/zh-cn/tierlist', {
    waitUntil: 'load',
    timeout: 0
  })

  await page.evaluate((className) => {
    // * 选择职业
    document.querySelector(`.tierlists .${className} a`).click()
  }, cn)

  await new Promise((r) => setTimeout(r, 10000)) // * 等待10秒页面加载完成

  let cards = await page.evaluate(
    (className, classDisplayNames) => {
      let cardList = document.querySelectorAll(`#${className} dl.card`)

      let cards = []
      for (let i = 0; i < cardList.length; i++) {
        let card = cardList[i]
        let cardTextEle = card.querySelector('dt')

        if (cardTextEle) {
          let cardScoreEle = card.querySelector('dd')

          let cardName = cardTextEle.innerText.split('新')[0].trim()

          let cardClass =
            cardTextEle.className.indexOf(className) > -1
              ? classDisplayNames[className]
              : '中立'

          let ulEle =
            card.parentElement.parentElement.parentElement.parentElement
              .parentElement
          let cardRarity = '普通'
          if (ulEle.className.indexOf('rares') > -1) {
            cardRarity = '稀有'
          } else if (ulEle.className.indexOf('epics') > -1) {
            cardRarity = '史诗'
          } else if (ulEle.className.indexOf('legendaries') > -1) {
            cardRarity = '传说'
          }

          let cardScoreStr = cardScoreEle.innerText.trim().split('↓')[0]
          let cardScore = parseInt(cardScoreStr)

          let CARD_CRAGE_NAMES = [
            'great',
            'good',
            'above-average',
            'average',
            'below-average',
            'bad',
            'terrible'
          ]
          let cardGradeStr = card.parentElement.parentElement.parentElement.className.split(
            'tier '
          )[1]
          let cardGrade = CARD_CRAGE_NAMES.indexOf(cardGradeStr) + 1
          if (cardGrade === 0) {
            console.log(
              `${new Date()}  [heartharena] [${cn}] WARNING: grade of [${cardName}] is 0 !!!`
            )
          }

          let lowHigh = ''
          if (cardTextEle.className.indexOf('lower') > -1) {
            lowHigh = '不适合'
          } else if (cardTextEle.className.indexOf('higher') > -1) {
            lowHigh = '适合'
          }

          let arrow =
            cardScoreEle.innerText.trim().indexOf('↓') > -1 ? true : false

          cards.push({
            name: cardName,
            class: cardClass,
            rarity: cardRarity,
            score: cardScore,
            grade: cardGrade,
            lowHigh: lowHigh,
            copiesLowerValue: arrow
          })
        }
      }
      return cards
    },
    cn,
    CLASS_DISPLAY_NAMES
  )

  cards = _.sortBy(cards, ['name'])

  console.log(`${new Date()}  [heartharena] [${cn}] Get ${cards.length} items`)

  // * Generate JSON File
  const cardsJson = JSON.stringify(cards)
  await fs.writeFile(
    `./data/heartharena-${cn}.json`,
    cardsJson,
    'utf8',
    function(err) {
      if (err) {
        console.log(
          `${new Date()}  [heartharena] [${cn}] Error occured when saving JSON file: ${err}`
        )
      } else {
        console.log(`${new Date()}  [heartharena] [${cn}] JSON file saved`)
      }
    }
  )

  // * Generate CSV File
  const cardsCsvArr = ['名称,职业,稀有度,评分,评级,适合该职业,建议不选多张,']
  cards.forEach((c) => {
    cardsCsvArr.push(
      `${c.name},${c.class},${c.rarity},${c.score},${c.grade},${c.lowHigh},${
        c.copiesLowerValue ? '是' : ''
      },`
    )
  })
  await fs.writeFile(
    `./data/heartharena-${cn}.csv`,
    cardsCsvArr.join('\n'),
    'utf8',
    function(err) {
      if (err) {
        console.log(
          `${new Date()}  [heartharena] [${cn}] Error occured when saving CSV file: ${err}`
        )
      } else {
        console.log(`${new Date()}  [heartharena] [${cn}] CSV file saved`)
      }
    }
  )

  await browser.close()
}

exports.heartharena = heartharena
