const puppeteer = require('puppeteer');
const _ = require('lodash');
const fs = require('fs');

// * 0 中立, 1 德鲁伊 436, 2 猎人 437, 3 法师 437, 4 圣骑士 440, 5 牧师 436, 6 盗贼 439, 7 萨满 434, 8 术士 436, 9 战士 436
const CLASS_NAMES = ['neutral', 'druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
const CLASS_DISPLAY_NAMES = ['中立', '德鲁伊', '猎人', '法师', '圣骑士', '牧师', '盗贼', '萨满', '术士', '战士'];

async function lightforge(cn) {
  console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] Start fetching...`);

  const browser = await puppeteer.launch({
    // devtools: true,
    timeout: 0,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  await page.goto('http://thelightforge.com/zh-CN/TierList');

  await page.evaluate((classNumber) => {
    // * 选择分类方式：经典
    document.querySelectorAll('.groupBy .dropdown-menu li')[1].querySelector('a').click();
    // * 选择所有稀有度
    let rarityList = document.querySelectorAll('.rarity .horizontalMenu .item');
    for (let i = 0; i < rarityList.length; i++) {
      let rarityItem = rarityList[i];
      if (rarityItem.className.indexOf('selected') === -1) {
        rarityItem.click();
      }
    }
    // * 选择职业
    document.querySelectorAll('.classSelect .classItem')[classNumber].click();
  }, cn);

  await new Promise(r => setTimeout(r, 10000)); // * 等待10秒页面加载完成

  let cards = await page.evaluate((classNumber, classDisplayNames) => {
    let cardList = document.querySelectorAll('.card')

    let cards = [];
    for (let i = 0; i < cardList.length; i++) {
      let card = cardList[i];
      let cardTextEle = card.querySelector('.cardText');

      if (cardTextEle) {
        let cardCostEle = card.querySelector('.cardCost')
        let cardOverlayEle = card.querySelector('.borderOverlay')
        let cardScoreEle = card.querySelector('.cardScore')

        let cardName = cardTextEle.innerText.trim();

        let cardCostStr = cardCostEle.innerText.trim();
        let cardCost = parseInt(cardCostStr);

        let cardClass = cardTextEle.className.indexOf('class') > -1 ? classDisplayNames[classNumber] : '中立';

        let cardRarity = '普通';
        if (cardOverlayEle.className.indexOf('rare') > -1) {
          cardRarity = '稀有';
        } else if (cardOverlayEle.className.indexOf('epic') > -1) {
          cardRarity = '史诗';
        } else if (cardOverlayEle.className.indexOf('legendary') > -1) {
          cardRarity = '传说';
        }

        let cardScoreStr = cardScoreEle.innerText.trim().split('ˆ')[0];
        let cardScore = parseInt(cardScoreStr);

        let CARD_CRAGE_NAMES = ['赞', '棒', '超出平均', '平均', '低于平均', '烂', '极糟糕'];
        let cardGradeStr = card.parentElement.querySelector('.hasSubtitle').innerText.split('[')[0].split('+')[0].trim();
        let cardGrade = CARD_CRAGE_NAMES.indexOf(cardGradeStr) + 1;
        if (cardGrade === 0) {
          console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] WARNING: grade of [${cardName}] is 0 !!!`);
        }

        let arrow = cardScoreEle.innerText.trim().indexOf('ˆ') > -1 ? true : false;

        cards.push({
          'name': cardName,
          'cost': cardCost,
          'class': cardClass,
          'rarity': cardRarity,
          'score': cardScore,
          'grade': cardGrade,
          'copiesLowerValue': arrow
        });
      }
    }
    return cards;
  }, cn, CLASS_DISPLAY_NAMES);

  cards = _.sortBy(cards, ['name']);

  console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] Get ${cards.length} items`);

  // * Generate JSON File
  const cardsJson = JSON.stringify(cards);
  await fs.writeFile(`./data/lightforge-${CLASS_NAMES[cn]}.json`, cardsJson, 'utf8', function (err) {
    if (err) {
      console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] Error occured when saving JSON file: ${err}`);
    } else{
      console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] JSON file saved`);
    }
  });

  // * Generate CSV File
  const cardsCsvArr = ['名称,费用,职业,稀有度,评分,评级,建议不选多张,']
  cards.forEach(c => {
    cardsCsvArr.push(`${c.name},${c.cost},${c.class},${c.rarity},${c.score},${c.grade},${c.copiesLowerValue ? '是' : ''},`)
  });
  await fs.writeFile(`./data/lightforge-${CLASS_NAMES[cn]}.csv`, cardsCsvArr.join('\n'), 'utf8', function (err) {
    if (err) {
      console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] Error occured when saving CSV file: ${err}`);
    } else{
      console.log(`${new Date()}  [lightforge] [${CLASS_NAMES[cn]}] CSV file saved`);
    }
  });

  await browser.close();
}

exports.lightforge = lightforge
