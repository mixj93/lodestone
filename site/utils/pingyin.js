import * as _ from 'lodash';

var dict = {
  "a": "阿啊唉挨哀哎埃爱碍艾隘癌矮蔼俺安氨庵鞍岸按案暗昂肮拗熬傲澳懊袄凹奥",
  "b": "罢吧把八巴疤叭芭捌笆坝爸霸拔跋靶扒柏掰白百摆败拜拌办半扮伴瓣绊板版班般斑搬扳颁榜帮邦梆棒傍谤绑膀蚌薄堡暴包胞苞褒报抱爆豹雹饱宝保北背杯悲碑卑贝备倍辈狈惫焙被奔本笨绷崩蹦泵臂币必毕闭毙碧蔽弊避壁庇蓖痹璧比彼笔鄙匕秕逼鼻荸便扁变遍辨辩辫贬匾边编鞭蝙标彪膘镖表别瘪憋鳖宾滨彬缤濒鬓并丙柄饼秉禀冰兵病伯剥勃簸拨波玻菠播跛驳脖博搏膊舶渤簿卜不布步怖部埠补捕哺",
  "c": "擦采彩睬踩才材财裁猜菜参惨残蚕惭灿餐藏仓苍舱沧操糙槽曹草侧册厕测策曾层蹭叉杈碴岔衩插茶察茬差刹查拆柴豺孱掺颤产铲阐搀馋缠蝉厂倡场敞昌猖畅唱肠尝常偿长吵抄钞超潮巢炒嘲车彻撤澈扯臣尘辰沉陈晨忱衬趁称澄乘成呈诚承城程惩橙撑秤逞尺匙吃嗤痴斥赤翅池驰迟持弛齿耻侈冲充宠虫崇仇臭丑抽绸酬筹稠愁畴处畜出初础储楚触矗除厨锄雏橱揣传串喘川穿船创床疮窗闯吹炊垂锤捶淳春椿纯唇醇蠢绰戳刺次赐此词辞慈磁祠瓷雌从丛匆葱聪囱凑促醋簇粗窜篡催摧崔脆翠悴粹存寸村撮搓错挫措锉",
  "d": "打瘩答大搭达待代带贷怠袋逮戴呆歹担单掸丹耽旦但诞淡蛋氮胆铛当挡党荡档裆倒叨刀到盗悼道稻导岛蹈捣祷得的德凳邓瞪灯登蹬等地底弟低堤滴帝递第蒂缔抵敌笛涤嘀嫡癫甸佃典点碘电店垫殿玷淀惦奠颠掂叼雕刁碉吊钓掉叠蝶谍碟爹跌钉丁叮盯订定锭顶鼎丢东冬动冻栋洞董懂斗兜抖陡蚪豆逗痘毒读都度肚堵赌睹杜渡妒镀独牍督段断缎锻短端兑堆队对敦吨蹲墩盹盾顿钝垛堕多哆夺踱惰舵跺朵躲",
  "e": "恶蛾饿扼遏愕噩鳄厄鹅额讹俄恩儿而耳尔饵二贰",
  "f": "发乏伐罚阀筏法番繁凡烦矾樊反返帆翻犯饭泛范贩坊仿访纺放方芳防妨房肪菲匪诽翡肥肺废沸费吠飞非啡份分坟焚奋粪愤忿粉芬吩纷氛缝风冯丰封疯峰锋蜂枫凤奉讽逢佛否拂副夫服父付负妇附咐赴复傅富腹覆赋缚伏扶俘浮符幅福凫芙袱辐蝠弗抚斧府俯辅腐甫脯肤麸孵敷",
  "g": "咖盖改溉概丐钙该甘肝竿柑坩干秆赶敢感橄杆港杠钢冈刚纲缸肛岗膏告搞稿镐高糕羔篙个各胳搁葛哥鸽割歌戈革阁格隔疙给根跟更埂耿梗耕羹蚣供共工弓公功攻宫恭躬巩汞拱贡勾构购够垢沟钩狗苟估骨古谷股鼓固故顾雇孤姑辜咕沽菇箍寡挂卦褂瓜刮乖怪拐观冠关官棺贯惯灌罐馆管广光逛柜龟归规闺硅瑰贵桂跪刽轨鬼诡棍滚过国果裹锅郭聒埚",
  "h": "蛤哈还咳孩害亥骇海汗含寒函涵韩喊罕汉旱捍悍焊撼翰憾酣憨夯航杭号好毫豪壕嚎嗥耗浩蒿呵合何和喝核禾河荷盒贺赫褐鹤嘿黑很狠恨痕横哼恒衡红哄宏虹洪鸿轰烘侯后厚候吼喉猴唬糊乎呼忽互户护沪狐胡壶湖蝴弧葫虎华划化哗猾滑画话桦花坏怀槐徊淮幻换唤患宦涣焕痪欢环缓晃皇黄煌凰惶蝗蟥簧荒慌谎恍幌会回茴蛔悔毁汇绘贿惠慧讳诲晦秽喙灰挥恢辉徽混昏婚荤浑魂豁或货获祸惑霍活火伙",
  "j": "稽祭几纪济击饥圾机肌鸡积基激讥叽唧畸箕及吉级极即急疾集籍棘辑嫉己挤脊计记技忌际季剂迹既继寄绩妓荠寂鲫冀贾夹家假价加佳嘉枷迦甲钾荚颊驾架嫁稼渐溅间监见件建荐贱剑健舰践鉴键箭涧尖奸歼坚肩艰兼煎拣茧俭捡检减剪简柬碱将浆匠酱江姜僵缰讲奖桨蒋疆降剿嚼角侥缴交郊浇娇骄胶椒焦蕉礁叫轿较窖酵狡饺绞脚搅教矫芥解揭节结介戒届界借诫劫杰洁捷截竭姐皆阶接街秸仅尽禁巾斤今金津筋襟紧锦谨进近晋浸劲净颈景井警阱径竞竟敬静境镜靖茎京经惊晶睛精荆兢鲸窘九久酒玖灸韭旧救就舅臼疚纠究揪鸠句拘沮局菊橘居鞠驹巨拒具俱剧距惧锯聚炬据矩举卷倦绢眷捐鹃觉倔决绝掘诀爵菌俊峻骏竣军均君钧",
  "k": "卡楷凯慨开揩看刊堪勘砍坎扛康糠慷抗炕考烤拷靠铐苛可坷壳克刻客课渴科棵颗磕蝌肯垦恳啃吭坑空孔恐控口扣寇抠库裤酷枯哭窟骷苦挎夸垮跨胯块快筷宽款旷况矿框眶狂筐傀溃亏盔窥愧葵魁困捆昆坤括扩阔廓",
  "l": "啦拉腊喇垃蜡辣来莱赖癞兰拦栏蓝篮澜婪烂滥览懒揽缆榄郎朗浪狼廊琅榔唠烙姥劳牢捞涝酪老勒了乐肋累擂垒蕾儡泪类雷棱冷楞隶哩丽力历厉立励利例栗粒吏沥荔俐莉砾雳痢厘狸离犁梨璃黎漓篱礼李里理鲤俩练炼恋链脸敛连怜帘莲联廉镰凉量两亮谅辆晾良梁粮粱潦撩料镣辽疗僚聊寥嘹缭燎瞭裂列劣烈猎咧淋凛檩吝赁躏邻林临琳磷鳞令岭伶灵铃陵零龄玲凌菱蛉翎另领溜馏六刘留流榴琉硫瘤柳笼拢垄龙聋隆咙胧窿搂楼娄髅漏陋篓碌露绿率律虑滤氯旅屡吕侣铝缕履芦炉卢庐颅虏鲁卤陆录鹿路赂驴乱卵峦掠略抡论轮仑伦沦落络啰罗萝锣箩骡螺逻裸骆洛",
  "m": "吗蚂妈马码玛骂麻埋脉买迈麦卖瞒蔓满漫慢曼幔蛮馒氓芒忙盲茫莽蟒猫冒毛矛茅锚茂贸帽貌铆么没妹昧媚魅每美眉梅煤霉玫枚媒楣闷门们孟梦猛锰萌盟檬朦蒙秘泌糜弥眯咪密蜜觅米迷谜靡免勉娩冕缅眠绵棉面妙庙秒渺藐苗描瞄灭蔑敏皿闽悯民名明鸣铭螟命谬摩蟆抹磨模莫摸末沫漠墨默茉陌寞膜魔馍摹蘑某谋木目牧墓幕暮慕沐募睦穆母亩牡拇姆",
  "n": "那呐哪娜拿纳钠捺乃奶耐奈南难男囊恼脑挠闹呢内馁嫩能泥溺你拟妮尼逆昵匿腻捻年黏念撵碾蔫娘酿尿鸟捏聂镊孽您拧宁凝狞柠泞扭纽钮牛弄农浓脓女努奴怒暖疟虐挪诺懦糯",
  "o": "呕偶藕欧殴鸥",
  "p": "耙怕帕爬趴排拍派湃牌徘判盼叛畔攀潘盘蹒旁磅乓庞螃胖刨炮泡跑抛袍咆佩配沛胚陪培赔喷盆彭捧朋棚蓬膨硼鹏澎篷砰烹碰辟劈僻屁譬匹批披坯霹皮疲脾啤片偏篇翩骗漂票瓢飘撇频品拼聘贫屏苹乒平评凭瓶萍坪泊迫坡泼颇婆破魄剖瀑朴仆铺扑普谱圃浦葡菩蒲",
  "q": "齐其奇期岂妻契砌栖七戚欺漆柒凄嘁乞企启起气弃汽器迄泣骑棋旗歧祈脐畦崎鳍掐洽恰乾浅嵌铅前钱钳潜黔千迁牵谦签欠歉遣谴强抢呛墙枪腔悄翘俏乔侨桥瞧荞憔峭窍撬巧锹敲跷且切窃怯茄亲侵钦寝芹琴禽勤秦擒庆情晴擎青轻倾清蜻氢卿顷请穷琼丘秋蚯求球囚趋趣渠区曲去取娶驱屈岖蛆躯圈券劝权全泉拳痊犬雀却确鹊瘸缺裙群",
  "r": "染然燃嚷壤攘瓤让扰绕饶惹热任人仁刃认韧纫忍仍扔日冗荣绒容熔融茸蓉溶榕柔揉蹂肉乳辱入褥如儒蠕软蕊锐瑞润闰若弱",
  "s": "撒洒飒萨塞腮赛散三叁伞丧嗓桑扫臊骚嫂搔色涩瑟森僧沙煞莎傻啥杀纱杉砂霎晒筛扇苫善擅膳赡山删衫珊跚闪陕裳上伤商尚晌赏梢少捎稍勺芍烧绍哨摄射蛇奢赊舌设社舍涉赦沈甚什审婶申伸身深呻绅神肾渗慎盛省升生声牲笙甥圣胜剩绳石拾食氏识十时实蚀史使始驶矢屎士示世市式势事侍饰试视柿是适室逝释誓拭恃嗜尸失师诗狮施湿虱寿受授售兽瘦狩手守首收数术属书叔殊梳舒疏输蔬抒枢淑暑鼠薯黍蜀署曙束述树竖恕庶墅漱熟秫赎刷耍衰帅蟀摔甩拴栓涮双霜爽水税睡谁吮顺瞬硕说烁伺思似司丝私斯撕嘶四寺饲肆死宋送诵颂讼松耸嗽搜艘苏宿俗诉肃素速塑粟溯酥蒜算酸岁碎穗祟遂隧虽随髓孙损笋缩唆梭嗦所索锁琐",
  "t": "她他它塌塔踏蹋台苔太态泰汰抬胎弹叹炭探碳坛谈痰昙谭潭檀坦毯袒贪摊滩瘫倘淌汤趟唐堂塘膛糖棠搪烫躺套涛掏滔讨逃桃陶萄淘特疼腾誊藤提体剃惕替屉涕梯踢剔题蹄啼填天添田甜恬舔调跳挑条笤帖贴铁亭庭停蜓廷霆厅听挺艇通同桐铜童彤瞳统桶筒捅痛头偷投透吐兔图徒途涂屠土秃突凸团褪推腿退蜕颓囤屯吞臀拓唾妥椭托拖脱驼驮鸵",
  "w": "瓦娃挖蛙洼袜外歪万宛丸完玩顽弯湾豌挽晚碗惋婉腕王亡妄忘旺望汪网往枉为委尾尉伟伪苇纬萎卫未位味畏胃喂慰谓猬蔚魏危威微偎薇巍违围唯维桅纹文闻蚊温瘟稳吻紊问瓮翁嗡涡我沃卧握窝蜗乌污呜屋巫诬五午伍武侮舞捂鹉勿务物误悟雾坞晤无吴芜梧蜈",
  "x": "戏系洗习席袭媳喜徙夕西吸希析牺息悉惜稀锡溪熄膝昔晰犀熙嬉蟋蜥细隙吓厦下夏峡狭霞匣侠暇辖虾瞎纤铣鲜县仙先掀锨显险藓现限线宪陷馅羡献腺闲贤弦咸衔嫌涎舷巷相详乡香箱厢湘镶享响想向项象像橡祥翔校肖削孝笑效哮啸小晓消宵销萧硝箫嚣枭淆挟些血邪泄写协胁斜携鞋谐歇楔蝎泻卸屑械谢懈蟹信芯心辛欣新薪锌衅兴刑形型邢星腥猩杏幸行性姓醒凶兄胸匈汹雄熊休修羞朽秀袖绣锈嗅许吁序叙绪续絮蓄旭恤酗婿徐须虚需旋宣轩喧悬玄漩炫选癣穴学雪靴薛熏勋旬寻巡询循训讯迅汛驯逊殉",
  "y": "压呀哑押鸦鸭牙芽崖蚜涯衙轧亚讶雅腌奄燕研厌艳宴验雁焰砚唁谚堰延严言岩炎沿盐颜阎蜒檐掩眼演衍鼹魇烟淹仰羊养氧痒央殃秧鸯扬阳杨洋样漾要钥咬舀妖腰邀夭吆窑谣摇遥肴姚药耀叶咽掖业页夜液谒腋也冶野椰爷疑椅一衣医依伊揖壹乙已以蚁倚亿义艺忆议亦异役译易疫益谊意毅翼屹抑邑绎奕逸肄溢蜴仪宜姨移遗夷胰殷隐印因阴音姻茵引饮蚓瘾银吟淫应影颖映硬英樱鹰莺婴缨鹦迎盈营蝇赢荧莹萤哟涌佣拥庸永咏泳勇蛹踊用有优忧悠幽又右幼诱佑友尤由邮犹油游愉与予雨语于余鱼娱渔榆愚隅逾舆屿宇羽玉育狱浴预域欲遇御裕愈誉芋郁喻寓豫迂淤远员元园原圆援缘源袁猿辕冤鸳渊怨院愿约月阅悦跃越岳粤晕云匀耘允陨孕运韵酝蕴",
  "z": "杂砸载仔再在宰崽灾栽攒咱暂赞脏葬赃凿早枣澡蚤藻皂灶造燥躁噪遭糟泽择则责贼怎增憎赠喳栅扎炸榨乍诈渣眨闸铡债寨宅摘斋窄崭占战站栈绽蘸斩盏展沾粘毡瞻涨丈仗帐胀障杖账张章彰樟掌朝召兆赵照罩找沼招昭折这着哲辙浙蔗者遮诊枕疹贞针侦珍真斟榛阵振震镇正症挣争征睁筝蒸怔狰整拯证郑政枝殖只知织吱之支汁芝肢脂蜘执直侄值职植止旨址纸指趾至志帜制质治致秩智置挚掷窒滞稚蛭重种中众仲忠终钟盅衷肿粥轴宙昼皱骤咒肘帚舟州周洲助朱筑著主煮嘱拄住注驻柱祝铸贮蛀珠株诸猪蛛侏竹逐烛爪抓转专砖赚撰幢壮状撞庄装妆桩椎追坠缀赘锥准谆琢捉桌拙浊啄灼茁卓酌兹姿资滋咨子紫姊籽滓自字综纵宗棕踪鬃总奏揍走卒租足族阻组祖诅钻嘴最罪醉尊遵作坐座做左佐昨"
};

export const getPingyinInit = (str) => {
  let ziArr = str.split('');
  let pyArr = [];
  for (let i = 0; i < ziArr.length; i++) {
    let zi = ziArr[i];
    let ziKey = _.findKey(dict, (d) => d.indexOf(zi) > -1 );
    if (ziKey) {
      pyArr.push(ziKey);
    }
  }

  return pyArr.join('');
}