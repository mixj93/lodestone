const puppeteer = require('puppeteer')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

// * 0 德鲁伊, 1 猎人, 2 法师, 3 圣骑士, 4 牧师, 5 盗贼, 6 萨满, 7 术士, 8 战士, 9 恶魔猎手
const CLASS_NAMES = [
  'druid',
  'hunter',
  'mage',
  'paladin',
  'priest',
  'rogue',
  'shaman',
  'warlock',
  'warrior',
  'demon-hunter'
]
// const CLASS_DISPLAY_NAMES = ['德鲁伊', '猎人', '法师', '圣骑士', '牧师', '盗贼', '萨满', '术士', '战士', '恶魔猎手'];

async function yingdi(cn) {
  console.log(`${new Date()}  [yingdi] [${CLASS_NAMES[cn]}] Start fetching...`)

  const browser = await puppeteer.launch({
    devtools: true,
    timeout: 0,
    defaultViewport: { width: 1440, height: 900 }
  })

  const page = await browser.newPage()
  await page.goto('https://www.iyingdi.com/web/tools/hearthstone/arenaScore', {
    waitUntil: 'load',
    timeout: 0
  })

  await page.evaluate((classNumber) => {
    // * 选择职业
    document.querySelectorAll('.factionList li')[classNumber].click()
  }, cn)

  await new Promise((r) => setTimeout(r, 10000)) // * 等待10秒页面加载完成

  let allCards = []
  while (true) {
    let pageCards = await page.evaluate(() => {
      let cardList = document.querySelectorAll('.allCardList .card')
      let cards = []
      for (let i = 0; i < cardList.length; i++) {
        let card = cardList[i]
        let cardInfo = card.querySelector('.cardInfo')

        if (cardInfo) {
          let cardNameEle = card.querySelector('.cname')
          let cardCatchRateEle = card.querySelector('.catchRate')
          let cardScoreEle = card.querySelector('.score')

          let cardName = cardNameEle.innerText.trim()
          let cardCatchRate = cardCatchRateEle.innerText.trim()
          let cardScore = cardScoreEle.innerText.trim()

          cards.push({
            name: cardName,
            catchRate: cardCatchRate,
            score: cardScore
          })
        }
      }
      return cards
    })

    allCards = allCards.concat(pageCards)

    let clickRes = await page.evaluate(() => {
      let nextPageBtn = document.querySelector('.pageList .pageDown')
      if (nextPageBtn) {
        nextPageBtn.click()
        return true
      }
      return false
    })

    if (!clickRes) {
      break
    }

    await new Promise((r) => setTimeout(r, 2000)) // * 等待页面加载完成
  }

  allCards = _.sortBy(allCards, ['name'])

  console.log(
    `${new Date()}  [yingdi] [${CLASS_NAMES[cn]}] Get ${allCards.length} items`
  )

  // * Generate JSON File
  const cardsJson = JSON.stringify(allCards)
  await fs.writeFile(
    `./data/yingdi-${CLASS_NAMES[cn]}.json`,
    cardsJson,
    'utf8',
    function (err) {
      if (err) {
        console.log(
          `${new Date()}  [yingdi] [${
            CLASS_NAMES[cn]
          }] Error occured when saving JSON file: ${err}`
        )
      } else {
        console.log(
          `${new Date()}  [yingdi] [${CLASS_NAMES[cn]}] JSON file saved`
        )
      }
    }
  )

  // * Generate CSV File
  const cardsCsvArr = ['名称,抓取率,评分,']
  allCards.forEach((c) => {
    cardsCsvArr.push(`${c.name},${c.catchRate},${c.score},`)
  })
  await fs.writeFile(
    path.join(__dirname, `../data/yingdi-${CLASS_NAMES[cn]}.csv`),
    cardsCsvArr.join('\n'),
    'utf8',
    function (err) {
      if (err) {
        console.log(
          `${new Date()}  [yingdi] [${
            CLASS_NAMES[cn]
          }] Error occured when saving CSV file: ${err}`
        )
      } else {
        console.log(
          `${new Date()}  [yingdi] [${CLASS_NAMES[cn]}] CSV file saved`
        )
      }
    }
  )

  await browser.close()
}

exports.yingdi = yingdi
