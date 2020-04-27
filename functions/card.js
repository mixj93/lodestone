import haDemonHunter from '../data/heartharena-demon-hunter.json'
import haDruid from '../data/heartharena-druid.json'
import haHunter from '../data/heartharena-hunter.json'
import haMage from '../data/heartharena-mage.json'
import haPaladin from '../data/heartharena-paladin.json'
import haPriest from '../data/heartharena-priest.json'
import haRogue from '../data/heartharena-rogue.json'
import haShaman from '../data/heartharena-shaman.json'
import haWarlock from '../data/heartharena-warlock.json'
import haWarrior from '../data/heartharena-warrior.json'

import lfDemonHunter from '../data/lightforge-demon-hunter.json'
import lfDruid from '../data/lightforge-druid.json'
import lfHunter from '../data/lightforge-hunter.json'
import lfMage from '../data/lightforge-mage.json'
import lfPaladin from '../data/lightforge-paladin.json'
import lfPriest from '../data/lightforge-priest.json'
import lfRogue from '../data/lightforge-rogue.json'
import lfShaman from '../data/lightforge-shaman.json'
import lfWarlock from '../data/lightforge-warlock.json'
import lfWarrior from '../data/lightforge-warrior.json'

import ydDemonHunter from '../data/yingdi-demon-hunter.json'
import ydDruid from '../data/yingdi-druid.json'
import ydHunter from '../data/yingdi-hunter.json'
import ydMage from '../data/yingdi-mage.json'
import ydPaladin from '../data/yingdi-paladin.json'
import ydPriest from '../data/yingdi-priest.json'
import ydRogue from '../data/yingdi-rogue.json'
import ydShaman from '../data/yingdi-shaman.json'
import ydWarlock from '../data/yingdi-warlock.json'
import ydWarrior from '../data/yingdi-warrior.json'

const _ = require('lodash')

const classes = [
  'demon-hunter',
  'druid',
  'hunter',
  'mage',
  'paladin',
  'priest',
  'rogue',
  'shaman',
  'warlock',
  'warrior'
]
exports.classes = classes

const classData = {
  'demon-hunter': {
    heartharena: haDemonHunter,
    lightforge: lfDemonHunter,
    yingdi: ydDemonHunter
  },
  druid: {
    heartharena: haDruid,
    lightforge: lfDruid,
    yingdi: ydDruid
  },
  hunter: {
    heartharena: haHunter,
    lightforge: lfHunter,
    yingdi: ydHunter
  },
  mage: {
    heartharena: haMage,
    lightforge: lfMage,
    yingdi: ydMage
  },
  paladin: {
    heartharena: haPaladin,
    lightforge: lfPaladin,
    yingdi: ydPaladin
  },
  priest: {
    heartharena: haPriest,
    lightforge: lfPriest,
    yingdi: ydPriest
  },
  rogue: {
    heartharena: haRogue,
    lightforge: lfRogue,
    yingdi: ydRogue
  },
  shaman: {
    heartharena: haShaman,
    lightforge: lfShaman,
    yingdi: ydShaman
  },
  warlock: {
    heartharena: haWarlock,
    lightforge: lfWarlock,
    yingdi: ydWarlock
  },
  warrior: {
    heartharena: haWarrior,
    lightforge: lfWarrior,
    yingdi: ydWarrior
  }
}
exports.classData = classData

/*
 * {"name":"“丛林猎人”赫米特","class":"中立","rarity":"史诗","score":65,"grade":3,"lowHigh":"","copiesLowerValue":false}
 * {"name":"“丛林猎人”赫米特","cost":6,"class":"中立","rarity":"史诗","score":115,"grade":2,"copiesLowerValue":false}
 * {"name":"“丛林猎人”赫米特","catchRate":"0.4%","score":"115"}
 */

exports.handler = async (event, context) => {
  const cardName = event.queryStringParameters.name || ''
  const queryClass = event.queryStringParameters.class || ''

  if (cardName === '' || queryClass === '') {
    console.warn(
      `[BAD REQUEST] ${new Date()} [${queryClass}] Get card: ${cardName}: Not specify a card name and as class.`
    )

    return {
      statusCode: 400,
      body: `Please specify a card name and as class.`
    }
  }

  if (classes.indexOf(queryClass) === -1) {
    console.warn(
      `[NOT FOUND] ${new Date()} [${queryClass}] Get card: ${cardName}: Class not found.`
    )

    return {
      statusCode: 404,
      body: `Class not found.`
    }
  }

  let ha = _.find(classData[queryClass].heartharena, { name: cardName })
  let lf = _.find(classData[queryClass].lightforge, { name: cardName })
  let yd = _.find(classData[queryClass].yingdi, { name: cardName })

  if (!!!(ha || lf || yd)) {
    return {
      statusCode: 404,
      body: `Card(${cardName}) not found.`
    }
  }

  let cardClass = queryClass
  if (ha && ha.class) {
    cardClass = ha.class
  } else if (lf && lf.class) {
    cardClass = lf.class
  }

  let cardRarity = ''
  if (ha && ha.rarity) {
    cardRarity = ha.rarity
  } else if (lf && lf.rarity) {
    cardRarity = lf.rarity
  }

  let haScore = ha
    ? {
        score: ha.score,
        grade: ha.grade,
        lowHigh: ha.lowHigh,
        copiesLowerValue: ha.copiesLowerValue
      }
    : null

  let lfScore = lf
    ? {
        score: lf.score,
        grade: lf.grade,
        copiesLowerValue: lf.copiesLowerValue
      }
    : null

  let ydScore = yd
    ? {
        catchRate: yd.catchRate,
        score: yd.score
      }
    : null

  console.log(`[OK] ${new Date()} [${queryClass}] Get card: ${cardName}.`)

  return {
    statusCode: 200,
    body: JSON.stringify({
      name: cardName,
      class: cardClass,
      rarity: cardRarity,
      cost: lf && lf.cost,
      heartharena: haScore,
      lightforge: lfScore,
      yingdi: ydScore
    })
  }
}
