// * LightForge

// * 盗贼
console.log("名称,职业,稀有度,评分,评级,评分在选择同一张卡牌后下降,")
i = 1;
$(".card").each(function() {
  let cardText = $(this).find(".cardText")
  let cardOverlay = $(this).find(".borderOverlay")
  let cardScore = $(this).find(".cardScore")
  let name = $(cardText).text().trim()
  let cardClass = $(cardText).hasClass("class") ? "盗贼" : "中立"
  let rarity = '普通'
  if ($(cardOverlay).hasClass("rare")) {
    rarity = "稀有"
  } else if ($(cardOverlay).hasClass("epic")) {
    rarity = "史诗"
  } else if ($(cardOverlay).hasClass("legendary")) {
    rarity = "传说"
  }
  let score = $(cardScore).text().trim().split("ˆ")[0]
  let grade = $($(this).parents(".cardColumn")[0]).find(".hasSubtitle").text().split("[")[0].trim()
  let arrow = $(cardScore).text().trim().indexOf("ˆ") > -1 ? "是" : ""
  if (name) {
    console.log(`${i} ${name},${cardClass},${rarity},${score},${grade},${arrow},`)
    i++
  }
})
