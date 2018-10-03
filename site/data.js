import * as haDruid from '../data/heartharena-druid.json';
import * as haHunter from '../data/heartharena-hunter.json';
import * as haMage from '../data/heartharena-mage.json';
import * as haPaladin from '../data/heartharena-paladin.json';
import * as haPriest from '../data/heartharena-priest.json';
import * as haRogue from '../data/heartharena-rogue.json';
import * as haShaman from '../data/heartharena-shaman.json';
import * as haWarlock from '../data/heartharena-warlock.json';
import * as haWarrior from '../data/heartharena-warrior.json';

import * as lfDruid from '../data/lightforge-druid.json';
import * as lfHunter from '../data/lightforge-hunter.json';
import * as lfMage from '../data/lightforge-mage.json';
import * as lfPaladin from '../data/lightforge-paladin.json';
import * as lfPriest from '../data/lightforge-priest.json';
import * as lfRogue from '../data/lightforge-rogue.json';
import * as lfShaman from '../data/lightforge-shaman.json';
import * as lfWarlock from '../data/lightforge-warlock.json';
import * as lfWarrior from '../data/lightforge-warrior.json';


export const CARD_CLASSES = [
  {
    'name': 'druid',
    'text': '德鲁伊'
  },
  {
    'name': 'hunter',
    'text': '猎人'
  },
  {
    'name': 'mage',
    'text': '法师'
  },
  {
    'name': 'paladin',
    'text': '圣骑士'
  },
  {
    'name': 'priest',
    'text': '牧师'
  },
  {
    'name': 'rogue',
    'text': '盗贼'
  },
  {
    'name': 'shaman',
    'text': '萨满'
  },
  {
    'name': 'warlock',
    'text': '术士'
  },
  {
    'name': 'warrior',
    'text': '战士'
  }
]

export const CLASS_INFO = {
  'druid': {
    'text': '德鲁伊',
    'tagColor': 'orange'
  },
  'hunter': {
    'text': '猎人',
    'tagColor': 'green'
  },
  'mage': {
    'text': '法师',
    'tagColor': 'blue'
  },
  'paladin': {
    'text': '圣骑士',
    'tagColor': 'gold'
  },
  'priest': {
    'text': '牧师',
    'tagColor': 'magenta'
  },
  'rogue': {
    'text': '盗贼',
    'tagColor': 'cyan'
  },
  'shaman': {
    'text': '萨满',
    'tagColor': 'geekblue'
  },
  'warlock': {
    'text': '术士',
    'tagColor': 'purple'
  },
  'warrior': {
    'text': '战士',
    'tagColor': 'red'
  },
  'neutral': {
    'text': '中立',
    'tagColor': ''
  }
}

export const HA_DRUID = Object.values(haDruid).slice(0, -1);
export const HA_HUNTER = Object.values(haHunter).slice(0, -1);
export const HA_MAGE = Object.values(haMage).slice(0, -1);
export const HA_PALADIN = Object.values(haPaladin).slice(0, -1);
export const HA_PRIEST = Object.values(haPriest).slice(0, -1);
export const HA_ROGUE = Object.values(haRogue).slice(0, -1);
export const HA_SHAMAN = Object.values(haShaman).slice(0, -1);
export const HA_WARLOCK = Object.values(haWarlock).slice(0, -1);
export const HA_WARRIOR = Object.values(haWarrior).slice(0, -1);

export const LF_DRUID = Object.values(lfDruid).slice(0, -1);
export const LF_HUNTER = Object.values(lfHunter).slice(0, -1);
export const LF_MAGE = Object.values(lfMage).slice(0, -1);
export const LF_PALADIN = Object.values(lfPaladin).slice(0, -1);
export const LF_PRIEST = Object.values(lfPriest).slice(0, -1);
export const LF_ROGUE = Object.values(lfRogue).slice(0, -1);
export const LF_SHAMAN = Object.values(lfShaman).slice(0, -1);
export const LF_WARLOCK = Object.values(lfWarlock).slice(0, -1);
export const LF_WARRIOR = Object.values(lfWarrior).slice(0, -1);

export const CLASS_DATA = {
  'druid': {
    'heartharena': HA_DRUID,
    'lightforge': LF_DRUID
  },
  'hunter': {
    'heartharena': HA_HUNTER,
    'lightforge': LF_HUNTER
  },
  'mage': {
    'heartharena': HA_MAGE,
    'lightforge': LF_MAGE
  },
  'paladin': {
    'heartharena': HA_PALADIN,
    'lightforge': LF_PALADIN
  },
  'priest': {
    'heartharena': HA_PRIEST,
    'lightforge': LF_PRIEST
  },
  'rogue': {
    'heartharena': HA_ROGUE,
    'lightforge': LF_ROGUE
  },
  'shaman': {
    'heartharena': HA_SHAMAN,
    'lightforge': LF_SHAMAN
  },
  'warlock': {
    'heartharena': HA_WARLOCK,
    'lightforge': LF_WARLOCK
  },
  'warrior': {
    'heartharena': HA_WARRIOR,
    'lightforge': LF_WARRIOR
  }
}
