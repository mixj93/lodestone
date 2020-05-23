// * HearthArena

// * 盗贼
console.log("名称,职业,稀有度,评分,评级,是否适合盗贼,评分在选择同一张卡牌后下降,")
$("#rogue dl.card").each(function() {
  $(this).find(".new").remove()
  let dt = $(this).find("dt")
  let dd = $(this).find("dd")
  let name = $(dt).html().trim()
  let cardClass = $(dt).hasClass("rogue") ? "盗贼" : "中立"
  let rarity = '普通'
  if ($(dt).hasClass("rares")) {
    rarity = "稀有"
  } else if ($(dt).hasClass("epics")) {
    rarity = "史诗"
  } else if ($(dt).hasClass("legendaries")) {
    rarity = "传说"
  }
  let score = $(dd).text().trim().split("↓")[0]
  let grade = $($(this).parents("li.tier")[0]).attr("class").split("tier ")[1]
  let lowHigh = ''
  if ($(dt).hasClass("lower")) {
    lowHigh = "不适合盗贼"
  } else if ($(dt).hasClass("higher")) {
    lowHigh = "适合盗贼"
  }
  let arrow = $(dd).text().trim().indexOf("↓") > -1 ? "是" : ""
  console.log(`${name},${cardClass},${rarity},${score},${grade},${lowHigh},${arrow},`)
})
