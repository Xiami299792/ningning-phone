(function initDailyNews() {
    function newsSetView(view) {
        var win = document.getElementById("win-news");
        if (!win) return;
        win.classList.remove("news-view-list", "news-view-detail", "news-view-search");
        win.classList.add("news-view-" + view);
    }
    function newsResetScroll() {
        var main = document.getElementById("news-main-scroll");
        if (main) main.scrollTop = 0;
        var wrap = document.querySelector("#win-news .window-content");
        if (wrap) wrap.scrollTop = 0;
    }
    let NEWS_DATA = [ {
        id: 1,
        title: "明安市人口数量连续下降",
        source: "明安日报讯",
        comments: 99,
        time: "2020年4月6日",
        hasImage: false,
        tag: "置顶",
        content: "近日，明安市统计事务中心发布《2019年度人口发展简报》。数据显示，截至去年11月底，全市登记人口为1,237,614人，较上年同期减少约1.8%。这是明安市连续第三年出现人口负增长现象。根据公开资料显示，2014年至2016年期间，明安市常住人口数量始终保持稳定增长。然而自2017年起，人口总量出现持续下降趋势。统计数据显示，近三年来全市人口累计减少超过五万人。针对人口减少问题，相关部门已组织多次专项调查。调查结果显示，目前尚未发现大规模人口迁出情况。全市户籍迁移、就业流动以及升学迁出等数据均处于正常范围内，与往年相比并无明显异常。与此同时，死亡率、出生率等关键指标也未出现显著变化。“从现有数据来看，我们暂时无法将人口变化归因于单一因素。”市统计事务中心负责人在接受采访时表示，“有关部门仍在进一步核查相关资料。”消息公布后，引发部分市民讨论。市民李先生表示，自己居住在城西社区已经十余年，最近两年确实感觉周围居民数量有所减少。“以前晚上广场上特别热闹，现在明显安静了不少。”他说。也有市民认为，这可能只是正常的人口流动现象。不过记者在采访过程中发现，多个社区工作人员均提到类似情况。一些小区物业表示，部分住宅长期处于无人居住状态，但相关房屋并未办理出售、出租或迁出登记手续。对此，市住房管理部门表示，目前暂未发现异常情况。据了解，市政府已成立专项工作组，对相关数据进行复核。工作组负责人表示，人口统计是一项复杂工作，不排除存在登记误差、信息同步延迟等技术性原因。截至发稿前，专项调查工作仍在进行中。有关部门呼吁市民理性看待统计结果，不信谣、不传谣，一切信息以官方发布内容为准。根据计划，下一阶段调查报告预计将在明年第一季度向社会公布。"
    }, {
        id: 2,
        title: "市博物馆举办老照片征集活动",
        source: "明安文化社",
        comments: 13,
        time: "2020年4月5日",
        hasImage: false,
        tag: "热点",
        content: "为记录城市发展历程，保存珍贵城市记忆，市博物馆近日正式启动“记忆中的明安”老照片征集活动。本次活动面向全体市民开放，征集内容包括家庭生活照片、校园活动照片、城市街景照片以及具有历史价值的影像资料和相关文献记录。博物馆方面表示，希望通过此次活动进一步丰富馆藏内容，整理和保存反映明安市发展变迁的重要历史资料。据介绍，征集作品时间范围主要覆盖上世纪八十年代至本世纪初，重点关注城市建设、居民生活、文化活动以及重要历史事件等内容。活动期间，博物馆将安排专业人员对征集到的照片进行数字化整理和信息归档，确保珍贵资料得到妥善保存。工作人员表示，部分入选作品将在年底举办的专题展览中向公众展示，同时永久收录至城市档案馆进行保存，为后续历史研究和文化传承提供参考。市博物馆呼吁广大市民积极参与活动，共同记录城市发展的点滴变化，让更多珍贵记忆得以延续和传承。目前征集活动已正式开始，相关报名及提交方式可通过博物馆服务大厅和官方网站进行查询。"
    }, {
        id: 3,
        title: "城南公交线路优化调整 方便居民日常出行",
        source: "明安日报讯",
        comments: 1303,
        time: "2020年4月5日",
        hasImage: true,
        imgSrc: "image/xw2.webp",
        content: "市交通运输部门近日发布公告，6月1日起将对13路、18路公交线路进行优化调整。其中13路公交车将新增和平社区站和城南市场站两个停靠站点，18路公交车则将延长运营时间至晚上10时。相关负责人表示，本次调整主要根据市民出行需求以及近期客流调查结果制定，预计将惠及周边近两万名居民。目前各项准备工作已基本完成，新的线路信息将在各公交站台陆续更新。"
    }, {
        id: 4,
        title: "市图书馆举办暑期阅读活动 多项公益项目面向市民开放",
        source: "明安光明网",
        comments: 12,
        time: "2020年6月10日",
        hasImage: true,
        imgSrc: "image/xw3.webp",
        content: "近日，市图书馆正式公布2020年“暑期阅读月”活动计划。本次活动将于6月10日至7月1日期间举行，面向全市市民免费开放，旨在进一步丰富群众文化生活，培养青少年阅读习惯，营造良好的全民阅读氛围。据了解，本次活动将推出读书分享会、亲子阅读课堂、优秀图书展览、儿童故事会以及阅读知识讲座等多个项目。其中，亲子阅读课堂将邀请教育工作者和儿童文学研究人员参与，通过互动交流、绘本讲解等形式帮助家长提高家庭阅读质量。市图书馆负责人表示，近年来到馆读者数量持续增长，尤其是在暑假期间，许多学生会利用假期前来借阅图书和参加文化活动。为满足不同年龄群体的阅读需求，图书馆已提前完成部分馆藏更新工作，新购入文学、历史、科学及少儿读物等图书两千余册。此外，活动期间图书馆还将开放部分平时较少对外展示的历史文献资料，并设置专题展区，向市民介绍明安市的发展历程和地方文化特色。工作人员表示，希望通过此次活动让更多年轻人了解阅读的乐趣，同时增强对本地历史文化的认识。据了解，去年暑期阅读活动累计吸引超过五千名市民参与。今年主办方预计参与人数将进一步增长。目前，各项活动报名工作已经启动，市民可通过图书馆服务大厅或官方网站进行预约登记。市图书馆提醒广大读者，在参加活动期间请遵守馆内秩序，共同维护安静舒适的阅读环境。相关活动安排及时间表将在近期陆续公布。"
    }, {
        id: 5,
        title: "魔法兔兔？",
        source: "明安日娱乐网",
        comments: 18,
        time: "2020年4月4日",
        hasImage: true,
        imgSrc: "image/xw4.webp",
        content: "近日，一款名为“魔法兔兔”的毛绒玩偶在明安市儿童群体中迅速走红。凭借可爱的外观设计和丰富的周边故事设定，该玩偶受到许多家长和孩子的喜爱。作为一部最早可追溯至2000年的动画作品，《兔子先生》凭借温馨治愈的故事内容和充满想象力的世界观，陪伴了许多孩子的成长。据了解，《兔子先生》最初于2000年在部分地区播出，随后逐渐积累起稳定的观众群体。近年来，随着网络平台的发展，不少年轻家长重新接触到这部童年时期的动画，并将其推荐给下一代观看。记者在明安市多所学校附近采访时发现，许多儿童都对动画中的角色和故事情节十分熟悉。一位家长表示，自己小时候就看过，如今孩子也成为了这部作品的忠实观众。“感觉像是两代人在看同一部动画。”该家长说道。文化研究人士认为，《兔子先生》能够持续受到关注，与其轻松温暖的叙事风格以及对友情、勇气和成长主题的描绘密不可分。尽管距离首播已经过去二十年，但这部作品依然保持着相当高的人气。目前，《兔子先生》已成为今年明安市讨论度最高的经典动画作品之一。"
    }, {
        id: 6,
        title: "明安第二中学举行2020届毕业典礼",
        source: "明安教育社",
        comments: 47,
        time: "2020年6月15日",
        hasImage: true,
        imgSrc: "image/xw7.webp",
        tag: "校园",
        content: "六月，明安第二中学如期举行2020届初中毕业典礼。校方在致辞中回顾了三年来的教学成果，并向全体毕业生送上祝福。典礼现场，师生合影留念，气氛温馨。值得一提的是，校方原计划邀请部分往届优秀毕业生返校分享经验，但据工作人员透露，2018届的数名受邀学生最终未能到场。“我们按档案上的电话一一拨打，有的提示空号，有的接通后，对方家长说……家里并没有在二中读过书的孩子。”该工作人员表示，相关情况已上报，学校仍在核实学生档案。“也许只是登记错误吧。”他补充道。截至发稿，校方暂未对外作进一步说明。"
    }, {
        id: 7,
        title: "《魔法兔兔》宣布推出特别篇 制作方信息成谜",
        source: "明安日娱乐网",
        comments: 64,
        time: "2020年4月2日",
        hasImage: true,
        imgSrc: "image/xw8.webp",
        tag: "热点",
        content: "本市经典儿童动画《魔法兔兔》近日宣布将推出一部“特别篇”。消息一出，迅速在小学生群体中引发热议。不过，与以往不同的是，这部特别篇的制作方、播出平台乃至播出时间，目前均无确切信息。记者多方查询发现，无论是电视台还是各大视频网站，均未在排播表中找到该节目，但仍有不少家长反映，自家孩子能在深夜“准时”看到它。“我半夜起来，看见孩子一个人坐在电视机前，屏幕亮着，兔先生正看着镜头。”一位家长这样描述。对此，相关部门提醒广大家长合理安排孩子的作息时间，避免长时间观看电子屏幕。"
    }, {
        id: 8,
        title: "明河樱花季落幕 市民周末踏青留影",
        source: "明安日报讯",
        comments: 9,
        time: "2020年4月1日",
        hasImage: true,
        imgSrc: "image/xw6.webp",
        content: "随着气温回升，明河两岸的樱花与海棠相继凋谢，为期半月的赏花季正式落下帷幕。连日来，不少市民趁着周末带上家人前往河畔踏青、拍照留念。市园林部门表示，今年赏花季秩序良好，并提醒市民爱护花木、文明出游。据悉，沿岸绿化带的夏季养护工作将于近期展开。"
    } ];
    const HIDDEN_NEWS = [ {
        id: 999,
        title: '"魔法兔兔"的对照表',
        source: "动画社",
        comments: 842,
        time: "2019年11月21日",
        hasImage: true,
        imgSrc: "image/对照表.webp",
        tag: "",
        content: '"在《魔法兔兔》的部分剧集中，观众偶尔会发现画面背景、书本页面、黑板、海报以及角色手中的纸张上出现一种特殊的文字系统。该系统被爱好者称为“魔法兔兔对照表”。根据动画设定，这是一套由字母与汉字相互对应组成的符号体系。每一个英文字母都对应着一个特定汉字，由于其出现频率较低，加上多数镜头停留时间极短，。动画制作组从未正式公布完整的对照表，因此网络上流传着多个不同版本。部分研究者认为，对照表最早出现于2003年的特别篇《月光森林》，而另一些观众则认为其原型可以追溯至更早的试播短片。值得注意的是，对照表并非简单的一一翻译关系。在某些剧集中，同一个字母会对应不同汉字，而部分汉字也可能对应多个字母。'
    }, {
        id: 998,
        title: "明安市",
        source: "明安教育监督网",
        comments: 2011,
        time: "2018年2月12日",
        hasImage: true,
        imgSrc: "image/xw5.webp",
        content: "明安市，简称“明”，位于中国东部地区，是一座兼具历史底蕴与现代活力的区域中心城市。全市总面积约5800平方公里，下辖5个区、3个县及1个县级市，常住人口约124万人。作为省内重要的教育、文化和交通枢纽，明安市连续多年入选全国文明城市建设试点名单。明安市建城历史可追溯至明代中期。因城区最初位于明河两岸，且当地百姓素有“崇文尚学、以德为明”的传统，故得名“明安”。在漫长的发展过程中，明安市逐渐由农业聚落发展为区域贸易中心，并于二十世纪中后期完成工业化转型。改革开放后，明安市依托优越的区位条件，大力发展制造业、教育产业和现代服务业，城市规模迅速扩大。进入二十一世纪后，明安市开始推进智慧城市建设和产业升级，逐步形成以科技创新、文化创意和现代教育为特色的发展格局。明安市地处平原与丘陵交汇地带，气候温和湿润，四季分明。境内河流众多，其中明河、青水河和南溪河贯穿城区，为城市发展提供了丰富的水资源。城区绿化覆盖率较高，拥有多个大型城市公园和生态保护区。每年春季，明河沿岸盛开的樱花和海棠花吸引大量游客前来观赏。教育一直是明安市最具代表性的城市名片之一。全市现有普通中小学两百余所，高等院校十余所。其中，明安第一中学、明安实验中学、明安区第七中学等学校在省内具有较高知名度。近年来，明安市持续加大教育投入，推进智慧校园建设，完善城乡教育资源配置，努力为学生创造更加优质的学习环境。明安市拥有丰富的文化资源和独特的地方传统。每年举办的明安文化艺术节、明河灯会以及青云书展等活动吸引了众多市民参与。与此同时，儿童文学、动画创作和青少年文化产业在明安市发展迅速。许多具有影响力的儿童读物、动画作品以及校园文化活动均诞生于此，为城市增添了浓厚的人文气息。目前，明安市已形成电子制造、新能源、新材料、现代物流和文化创意产业共同发展的经济结构。市高新技术产业开发区聚集了大量创新型企业，为区域经济增长提供了重要动力。根据近年统计数据，明安市地区生产总值保持稳定增长，居民生活水平不断提高，城市综合竞争力持续增强。未来，明安市将继续坚持“创新、开放、绿色、共享”的发展理念，努力建设成为宜居、宜业、宜学的现代化城市，为市民创造更加美好的生活环境。这座不断发展的城市，正以开放包容的姿态迎接来自全国各地的人们，共同书写属于新时代的明安故事。"
    }, {
        id: 995,
        title: "4980",
        source: "unname",
        comments: 0,
        time: "2019年10月8日",
        hasImage: false,
        content: "你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的，你跑不掉的"
    } ];
    const NEWS_DEFAULT_COMMENTS = {
        1: [ {
            author: "辞忧",
            content: "我们这栋楼19年起就空了好几户了，像是迁移走了",
            time: "2020年4月6日 09:18"
        }, {
            author: "终究错付",
            content: "迁入迁出和出生死亡都正常，总数却连续下降，真奇怪",
            time: "2020年4月6日 10:42"
        }, {
            author: "小林",
            content: "@终究错付 等下复核报告吧",
            time: "2020年4月6日 13:07"
        } ],
        2: [ {
            author: "Only晚风",
            content: "家里正好有一张老百货门口的合影，周末整理好就送过去",
            time: "2020年4月5日 08:31"
        }, {
            author: "梧桐",
            content: "请问只有电子扫描件也可以参加征集吗？原件已经有些褪色了。",
            time: "2020年4月5日 11:26"
        } ],
        3: [ {
            author: "回忆狠美",
            content: "终于！！以后去城南不用再走二十分钟了",
            time: "2020年4月5日 09:12"
        }, {
            author: "野生77",
            content: "18路延长到十点真的很好！希望末班车时间能够长期保留。",
            time: "2020年4月5日 12:44"
        }, {
            author: "柠檬不萌",
            content: "新站牌什么时候更新？今天路过还没有看到线路图。",
            time: "2020年4月5日 18:03"
        } ],
        4: [ {
            author: "晚风cc",
            content: "亲子阅读课堂已经预约上了，期待绘本讲解",
            time: "2020年6月10日 10:15"
        }, {
            author: "安然",
            content: "儿童故事会有没有年龄限制？家里孩子今年刚满3岁可以去吗？",
            time: "2020年6月10日 14:29"
        }, {
            author: "落日心动",
            content: "最期待地方历史文献展，希望能看到以前的明河地图",
            time: "2020年6月10日 19:06"
        } ],
        5: [ {
            author: "user820331",
            content: "现在孩子们怎么都叫它魔法兔兔？",
            time: "2020年4月4日 08:57"
        }, {
            author: "木木",
            content: "@user820331 新版和动画里的样子不太一样，可能叫着顺口",
            time: "2020年4月4日 15:22"
        } ],
        6: [ {
            author: "奶油Cookie",
            content: "祝学弟学妹们毕业快乐，校服和教学楼看起来真是一点没变。",
            time: "2020年6月15日 09:36"
        }, {
            author: "呀米呀",
            content: "2018届受邀学生那段有点奇怪，学校档案不是应该都有备份吗？",
            time: "2020年6月15日 12:11"
        }, {
            author: "小困",
            content: "希望校方核实清楚后再发一个说明。",
            time: "2020年6月15日 17:40"
        } ],
        7: [ {
            author: "",
            content: "很好看！我很喜欢！！",
            time: "2020年4月2日 20:17"
        }, {
            author: "桃酥bb",
            content: "@匿名用户 你在哪里看的？我为什么看不到？",
            time: "2020年4月2日 22:49"
        }, {
            author: "风替我说话",
            content: "@桃酥bb 同问！！",
            time: "2020年4月3日 02:06"
        } ],
        8: [ {
            author: "摄影社阿岚",
            content: "今年河东那一段的花开得最好，傍晚的光也很适合拍照",
            time: "2020年4月1日 10:02"
        }, {
            author: "杜悦琴",
            content: "这周已经开始长新叶了，时间过的真快。",
            time: "2020年4月1日 13:35"
        }, {
            author: "zan导师",
            content: "明年准备早点去！",
            time: "2020年4月1日 18:21"
        } ],
        999: [ {
            author: "字幕组小北",
            content: "第七码和旧版录像里的符号对不上，可能不止一套规则。",
            time: "2019年11月21日 11:08"
        }, {
            author: "月光森林",
            content: "2003年特别篇里出现过完整的一行，但最后两个字被角色挡住了。",
            time: "2019年11月21日 16:42"
        }, {
            author: "纸上迷宫",
            content: "同一个符号在不同集数里意思不同，像是故意留下的错误",
            time: "2019年11月22日 00:19"
        } ],
        998: [ {
            author: "夏夏的小猫",
            content: "小时候一直觉得明河把整座城市分成了两个完全不同的地方！",
            time: "2018年2月12日 09:45"
        }, {
            author: "小已",
            content: "来这里读书以后才发现，明安的旧城区比介绍里写的更适合居住！！",
            time: "2018年2月12日 14:20"
        } ],
        997: [ {
            author: "七排靠窗",
            content: "我记得我们班也有一个突然空下来的座位，可老师说那里一直没人。",
            time: "2019年12月30日 19:33"
        }, {
            author: "旧相册",
            content: "照片里空掉的位置，会不会原本只是曝光出了问题？",
            time: "2019年12月30日 21:05"
        }, {
            author: "无人回复",
            content: "你确定自己还记得他的名字吗？",
            time: "2019年12月31日 00:00"
        } ]
    };
    const HOT_NEWS = [ "市博物馆启动老照片征集活动", "SpaceY载人飞船成功发射", "最新多地开学时间表公布！家长直呼终于等到了", "A股三大股指全线飘红，科技板块领涨", "明安市人口数量连续第三年下降", "明安二中2020届毕业典礼圆满举行", "《魔法兔兔》特别篇引家长热议" ];
    let myNewsPosts = [];
    try {
        myNewsPosts = JSON.parse(localStorage.getItem("win10_news_my_posts")) || [];
    } catch (e) {}
    let newsArticleComments = {};
    try {
        const savedComments = JSON.parse(localStorage.getItem("win10_news_article_comments"));
        if (savedComments && typeof savedComments === "object" && !Array.isArray(savedComments)) {
            newsArticleComments = savedComments;
        }
    } catch (e) {}
    NEWS_DATA = [ ...myNewsPosts, ...NEWS_DATA ];
    let currentNewsList = [ ...NEWS_DATA ];
    let isShowingSearchResults = false;
    let activeNewsArticleId = null;
    window.newsShowToast = function(msg) {
        const toast = document.getElementById("news-toast");
        if (!toast) return;
        toast.innerText = msg;
        toast.style.opacity = "1";
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);
    };
    function newsGetPlayerComments(newsId) {
        const comments = newsArticleComments[String(newsId)];
        return Array.isArray(comments) ? comments : [];
    }
    function newsGetCommentCount(news) {
        if (news.id === 995) return 0;
        const defaults = NEWS_DEFAULT_COMMENTS[news.id] || [];
        return Math.max(Number(news.comments) || 0, defaults.length) + newsGetPlayerComments(news.id).length;
    }
    function newsEscapeHtml(value) {
        return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    function newsFormatCommentTime(date) {
        const pad = value => String(value).padStart(2, "0");
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }
    function newsRenderComments(news) {
        const detailContent = document.getElementById("news-detail-content");
        if (!detailContent) return;
        const section = document.createElement("div");
        section.id = "news-comments-section";
        section.style.cssText = "margin-top: 42px; padding-top: 26px; border-top: 1px solid #e8e8e8; text-align: left;";
        const playerComments = newsGetPlayerComments(news.id);
        const defaultComments = NEWS_DEFAULT_COMMENTS[news.id] || [];
        const comments = [ ...playerComments, ...defaultComments ];
        section.innerHTML = `\n            <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 18px;">\n                <span style="font-size: 22px; color: #222; font-weight: bold;">评论</span>\n                <span id="news-comment-total" style="font-size: 13px; color: #999;">${newsGetCommentCount(news)} 条评论</span>\n            </div>\n            <div style="border: 1px solid #e8e8e8; border-radius: 4px; background: #fff; padding: 12px; margin-bottom: 24px;">\n                <textarea id="news-article-comment-input" maxlength="300" placeholder="说点什么吧..." style="display: block; width: 100%; height: 78px; padding: 0; border: none; outline: none; resize: none; font-size: 14px; line-height: 1.7; color: #333; background: transparent; font-family: inherit; user-select: text;"></textarea>\n                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f0f0f0; padding-top: 10px;">\n                    <span id="news-comment-character-count" style="font-size: 12px; color: #aaa;">0/300</span>\n                    <button onclick="newsSubmitArticleComment()" style="background: #ed4040; color: #fff; border: none; border-radius: 3px; padding: 8px 22px; font-size: 14px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d83535'" onmouseout="this.style.background='#ed4040'">发表评论</button>\n                </div>\n            </div>\n            <div id="news-comments-list"></div>\n            <div style="display: ${newsGetCommentCount(news) > comments.length ? "block" : "none"}; padding: 18px 0 4px; text-align: center; color: #aaa; font-size: 13px;">暂时无法查看更多评论</div>\n        `;
        const list = section.querySelector("#news-comments-list");
        if (comments.length === 0) {
            list.innerHTML = '<div style="padding: 28px 0; text-align: center; color: #aaa; font-size: 14px;">还没有评论，来发表第一条吧。</div>';
        } else {
            list.innerHTML = comments.map(comment => {
                const author = newsEscapeHtml(comment.author || "匿名用户");
                const content = newsEscapeHtml(comment.content || "").replace(/\n/g, "<br>");
                const time = newsEscapeHtml(comment.time || "");
                const avatarHtml = comment.author === "宁宁" ? '<img src="image/ningning.webp" alt="" style="width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; object-fit: cover;">' : '<img src="image/user2.jpg" alt="" style="width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; object-fit: cover;">';
                return `\n                    <div style="display: flex; gap: 12px; padding: 18px 0; border-bottom: 1px solid #f0f0f0;">\n                        ${avatarHtml}\n                        <div style="flex: 1; min-width: 0;">\n                            <div style="font-size: 14px; color: #406599; margin-bottom: 7px;">${author}</div>\n                            <div style="font-size: 15px; color: #333; line-height: 1.7; word-break: break-word; user-select: text;">${content}</div>\n                            <div style="font-size: 12px; color: #aaa; margin-top: 8px;">${time}</div>\n                        </div>\n                    </div>\n                `;
            }).join("");
        }
        detailContent.appendChild(section);
        const input = section.querySelector("#news-article-comment-input");
        const characterCount = section.querySelector("#news-comment-character-count");
        input.addEventListener("input", () => {
            characterCount.innerText = `${input.value.length}/300`;
        });
        input.addEventListener("keydown", event => {
            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                newsSubmitArticleComment();
            }
        });
    }
    window.newsSubmitArticleComment = function() {
        const input = document.getElementById("news-article-comment-input");
        const text = input?.value.trim();
        if (!input || activeNewsArticleId === null) return;
        if (localStorage.getItem("win10_news_logged_in") !== "true") {
            newsShowToast("请先登录账号");
            input.value = "";
            input.blur();
            return;
        }
        if (!text) {
            newsShowToast("评论内容不能为空！");
            input.focus();
            return;
        }
        const key = String(activeNewsArticleId);
        const comments = [ ...newsGetPlayerComments(activeNewsArticleId) ];
        comments.unshift({
            id: Date.now(),
            author: "宁宁",
            content: text,
            time: newsFormatCommentTime(new Date),
            isPlayer: true
        });
        const nextArticleComments = {
            ...newsArticleComments,
            [key]: comments
        };
        try {
            localStorage.setItem("win10_news_article_comments", JSON.stringify(nextArticleComments));
            newsArticleComments = nextArticleComments;
        } catch (e) {
            newsShowToast("评论保存失败，请稍后再试。");
            return;
        }
        const news = NEWS_DATA.find(item => item.id === activeNewsArticleId) || HIDDEN_NEWS.find(item => item.id === activeNewsArticleId);
        if (!news) return;
        document.getElementById("news-comments-section")?.remove();
        newsRenderComments(news);
        document.querySelectorAll(`[data-news-comment-count="${activeNewsArticleId}"]`).forEach(element => {
            element.innerText = `${newsGetCommentCount(news)} 评论`;
        });
        newsShowToast("评论发布成功！");
    };
    window.newsSubmitPost = function() {
        const isNewsLogged = localStorage.getItem("win10_news_logged_in") === "true";
        if (!isNewsLogged) {
            newsShowToast("请先登录账号");
            return;
        }
        const inputEl = document.getElementById("news-post-input");
        if (!inputEl) return;
        const text = inputEl.value.trim();
        if (!text) {
            newsShowToast("发布内容不能为空！");
            inputEl.focus();
            return;
        }
        const newPost = {
            id: Date.now(),
            title: text.length > 25 ? text.substring(0, 25) + "..." : text,
            source: "宁宁",
            comments: 0,
            time: "刚刚",
            hasImage: false,
            tag: "微头条",
            content: text
        };
        myNewsPosts.unshift(newPost);
        localStorage.setItem("win10_news_my_posts", JSON.stringify(myNewsPosts));
        NEWS_DATA.unshift(newPost);
        inputEl.value = "";
        newsUpdateAuthUI();
        if (isShowingSearchResults) {
            newsClearSearch();
        } else {
            currentNewsList = [ ...NEWS_DATA ];
            renderNewsFeed();
            newsResetScroll();
        }
        newsShowToast("发布成功！");
    };
    window.newsTriggerLogin = function() {
        const isWechatLogged = localStorage.getItem("win10_wechat_logged_in") === "true";
        if (isWechatLogged) {
            localStorage.setItem("win10_news_logged_in", "true");
            newsShowToast("微信授权登录成功！");
            newsUpdateAuthUI();
        } else {
            newsShowToast("请先登入微信");
        }
    };
    function newsUpdateAuthUI() {
        const isNewsLogged = localStorage.getItem("win10_news_logged_in") === "true";
        document.getElementById("win-news")?.classList.toggle("news-logged", isNewsLogged);
        const unloggedUI = document.getElementById("news-unlogged-ui");
        const loggedUI = document.getElementById("news-logged-ui");
        if (unloggedUI && loggedUI) {
            if (isNewsLogged) {
                unloggedUI.style.display = "none";
                loggedUI.style.display = "flex";
                const countEl = document.getElementById("news-my-dynamics-count");
                if (countEl) countEl.innerText = myNewsPosts.length;
            } else {
                unloggedUI.style.display = "block";
                loggedUI.style.display = "none";
            }
        }
    }
    function renderNewsFeed(searchQuery = "") {
        const container = document.getElementById("news-feed-container");
        if (!container) return;
        container.innerHTML = "";
        if (searchQuery !== "") {
            isShowingSearchResults = true;
            const searchHeader = document.createElement("div");
            searchHeader.style.cssText = "padding: 15px 0 20px 0; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";
            searchHeader.innerHTML = `\n                <div style="font-size: 16px; color: #333;">关于 <span style="color:#ed4040; font-weight:bold;">“${searchQuery}”</span> 的搜索结果：共 ${currentNewsList.length} 条</div>\n                <button onclick="newsClearSearch()" style="background:#f4f5f6; border:1px solid #e8e8e8; color:#505050; padding:6px 16px; border-radius:4px; cursor:pointer; font-size:13px; transition:0.2s;" onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f4f5f6'">返回推荐首页</button>\n            `;
            container.appendChild(searchHeader);
        } else {
            isShowingSearchResults = false;
        }
        if (currentNewsList.length === 0) {
            container.innerHTML += `<div style="text-align:center; padding: 80px 0; color: #999; font-size: 15px;">抱歉，未找到相关资讯。</div>`;
            return;
        }
        currentNewsList.forEach(news => {
            let imgHTML = "";
            if (news.hasImage) {
                imgHTML = `<div style="width: 150px; height: 100px; background: #f0f0f0; flex-shrink: 0; margin-right: 18px; overflow: hidden; border: 1px solid #f0f0f0;">\n                                <img src="${news.imgSrc}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; transition: 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">\n                           </div>`;
            }
            let tagHTML = "";
            if (news.tag) {
                tagHTML = `<span style="border: 1px solid #ed4040; color: #ed4040; padding: 1px 4px; border-radius: 2px; font-size: 12px; margin-right: 8px;">${news.tag}</span>`;
            }
            const item = document.createElement("div");
            item.style.cssText = "display: flex; padding: 18px 0; border-bottom: 1px solid #f0f0f0; cursor: pointer; position: relative;";
            item.innerHTML = `\n                ${imgHTML}\n                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-right: 20px;">\n                    <div style="font-size: 20px; font-weight: bold; color: #222; margin-bottom: 12px; line-height: 1.4; transition: color 0.2s;" onmouseover="this.style.color='#135bb5'" onmouseout="this.style.color='#222'">${news.title}</div>\n                    <div style="display: flex; align-items: center; font-size: 13px; color: #999;">\n                        ${tagHTML}\n                        <span style="display: flex; align-items: center; gap: 4px; margin-right: 15px;">\n                            ${news.source.includes("央视") ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="#ed4040"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>' : ""}\n                            ${news.source}\n                        </span>\n                        <span data-news-comment-count="${news.id}" style="margin-right: 15px;">${newsGetCommentCount(news)} 评论</span>\n                        <span>${news.time}</span>\n                    </div>\n                </div>\n                <div style="position: absolute; right: 0; bottom: 25px; color: #ccc; padding: 4px; cursor: pointer;" onmouseover="this.style.color='#ed4040'" onmouseout="this.style.color='#ccc'" onclick="event.stopPropagation(); this.parentNode.style.display='none';">\n                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\n                </div>\n            `;
            item.onclick = () => newsOpenArticle(news.id);
            container.appendChild(item);
        });
    }
    function renderHotNews() {
        const container = document.getElementById("news-hot-list");
        if (!container) return;
        container.innerHTML = "";
        HOT_NEWS.forEach((title, index) => {
            const div = document.createElement("div");
            div.style.cssText = "display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #333; line-height: 1.5; cursor: pointer;";
            div.innerHTML = `\n                <div style="width: 18px; height: 18px; background: ${index < 3 ? "#ed4040" : "#d8d8d8"}; color: #fff; border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">${index + 1}</div>\n                <div style="transition: color 0.2s;" onmouseover="this.style.color='#ed4040'" onmouseout="this.style.color='#333'">${title}</div>\n            `;
            container.appendChild(div);
        });
    }
    window.newsDoSearch = function() {
        const isNewsLogged = localStorage.getItem("win10_news_logged_in") === "true";
        if (!isNewsLogged) {
            newsShowToast("请先登录账号");
            document.getElementById("news-search-input").value = "";
            return;
        }
        const query = document.getElementById("news-search-input").value.trim().toLowerCase();
        if (query === "") {
            newsShowToast("请输入要搜索的内容。");
            return;
        }
        let results = NEWS_DATA.filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));
        const addHiddenResult = id => {
            const hiddenNews = HIDDEN_NEWS.find(item => item.id === id);
            if (hiddenNews) results.unshift(hiddenNews);
        };
        if (query.includes("兔先生") || query.includes("兔") || query.includes("兔子先生") || query.includes("魔法兔兔")) {
            addHiddenResult(999);
        }
        if (query.includes("明安") || query.includes("明安市") || query.includes("明安区")) {
            addHiddenResult(998);
        }
        if (query.includes("二中") || query.includes("学校") || query.includes("同学") || query.includes("同桌")) {
            addHiddenResult(997);
        }
        if (query.includes("4980")) {
            addHiddenResult(995);
        }
        results = results.filter((n, i, arr) => arr.findIndex(x => x.id === n.id) === i);
        currentNewsList = results;
        newsBackToList();
        renderNewsFeed(query);
        newsSetView("search");
    };
    window.newsClearSearch = function() {
        document.getElementById("news-search-input").value = "";
        currentNewsList = [ ...NEWS_DATA ];
        newsBackToList();
        renderNewsFeed();
        newsSetView("list");
    };
    document.getElementById("news-search-input")?.addEventListener("keydown", e => {
        if (e.key === "Enter") newsDoSearch();
    });
    window.newsOpenArticle = function(id) {
        let news = NEWS_DATA.find(n => n.id === id) || HIDDEN_NEWS.find(n => n.id === id);
        if (!news) return;
        activeNewsArticleId = news.id;
        document.getElementById("news-list-view").style.display = "none";
        document.getElementById("news-detail-view").style.display = "block";
        newsSetView("detail");
        document.getElementById("news-detail-title").innerText = news.title;
        document.getElementById("news-detail-source").innerText = news.source;
        document.getElementById("news-detail-time").innerText = news.time;
        const formattedContent = news.content.split("\n").map(p => {
            if (!p.trim()) return "";
            return `<p style="margin-bottom: 20px; text-indent: 2em;">${p}</p>`;
        }).join("");
        let imageHtml = "";
        if (news.hasImage && news.imgSrc) {
            imageHtml = `<div style="margin: 0 0 24px; text-align: center;">\n                <img class="news-detail-img" src="${news.imgSrc}" alt="配图" style="max-width: 100%; height: auto; border-radius: 4px; display: block; margin: 0 auto;" loading="lazy">\n                <div style="font-size: 12px; color: #999; margin-top: 8px;">点击查看大图</div>\n            </div>`;
        }
        document.getElementById("news-detail-content").innerHTML = imageHtml + formattedContent;
        const detailImg = document.querySelector("#news-detail-content .news-detail-img");
        if (detailImg && typeof window.openApp === "function") {
            detailImg.style.cursor = "zoom-in";
            detailImg.onclick = () => {
                const titleEl = document.getElementById("title-photoviewer");
                if (titleEl) titleEl.innerText = "照片查看器";
                const viewerImg = document.getElementById("viewer-img");
                if (viewerImg) viewerImg.src = news.imgSrc;
                window.openApp("photoviewer");
            };
        }
        if (news.id !== 995 && news.id !== 999) {
            newsRenderComments(news);
        }
        newsResetScroll();
    };
    window.newsBackToList = function() {
        activeNewsArticleId = null;
        document.getElementById("news-detail-view").style.display = "none";
        document.getElementById("news-list-view").style.display = "block";
        newsSetView("list");
        newsResetScroll();
    };
    const origOpenApp = window.openApp;
    window.openApp = function(appId) {
        origOpenApp(appId);
        if (appId === "news") {
            newsUpdateAuthUI();
            newsClearSearch();
            renderHotNews();
        }
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            renderNewsFeed();
            renderHotNews();
            newsUpdateAuthUI();
        });
    } else {
        renderNewsFeed();
        renderHotNews();
        newsUpdateAuthUI();
    }
})();
