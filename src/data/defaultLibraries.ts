import { WordLibrary } from '../types/index';

export const DEFAULT_LIBRARIES: WordLibrary[] = [
  {
    id: 'sight-words-starter',
    title: 'Dolch 幼小衔接高频词 (Pre-Primer)',
    description: '40 个启蒙必学视觉高频词，奠定英语自主阅读基石',
    category: 'sight-words',
    badgeEmoji: '🌟',
    words: [
      { id: 'sw1', word: 'the', translation: '这/那 (定冠词)' },
      { id: 'sw2', word: 'to', translation: '朝/向/去' },
      { id: 'sw3', word: 'and', translation: '和/并且' },
      { id: 'sw4', word: 'a', translation: '一个' },
      { id: 'sw5', word: 'I', translation: '我' },
      { id: 'sw6', word: 'you', translation: '你/你们' },
      { id: 'sw7', word: 'it', translation: '它' },
      { id: 'sw8', word: 'in', translation: '在...里面' },
      { id: 'sw9', word: 'said', translation: '说 (say过去式)' },
      { id: 'sw10', word: 'for', translation: '为了/给' },
      { id: 'sw11', word: 'up', translation: '向上' },
      { id: 'sw12', word: 'look', translation: '看' },
      { id: 'sw13', word: 'is', translation: '是' },
      { id: 'sw14', word: 'go', translation: '去/走' },
      { id: 'sw15', word: 'we', translation: '我们' },
      { id: 'sw16', word: 'little', translation: '小的/幼小的' },
      { id: 'sw17', word: 'down', translation: '向下' },
      { id: 'sw18', word: 'can', translation: '能够/会' },
      { id: 'sw19', word: 'see', translation: '看见' },
      { id: 'sw20', word: 'not', translation: '不/不是' },
      { id: 'sw21', word: 'one', translation: '一' },
      { id: 'sw22', word: 'my', translation: '我的' },
      { id: 'sw23', word: 'me', translation: '我 (宾格)' },
      { id: 'sw24', word: 'big', translation: '大的' },
      { id: 'sw25', word: 'come', translation: '来' },
      { id: 'sw26', word: 'blue', translation: '蓝色' },
      { id: 'sw27', word: 'red', translation: '红色' },
      { id: 'sw28', word: 'where', translation: '在哪里' },
      { id: 'sw29', word: 'jump', translation: '跳跃' },
      { id: 'sw30', word: 'away', translation: '离开' },
      { id: 'sw31', word: 'here', translation: '这里' },
      { id: 'sw32', word: 'help', translation: '帮助' },
      { id: 'sw33', word: 'make', translation: '制作/使得' },
      { id: 'sw34', word: 'yellow', translation: '黄色' },
      { id: 'sw35', word: 'two', translation: '二' },
      { id: 'sw36', word: 'play', translation: '玩耍/游戏' },
      { id: 'sw37', word: 'run', translation: '奔跑' },
      { id: 'sw38', word: 'find', translation: '找到/发现' },
      { id: 'sw39', word: 'three', translation: '三' },
      { id: 'sw40', word: 'funny', translation: '有趣的/滑稽的' },
    ],
  },
  {
    id: 'oxford-phonics-5',
    title: '牛津自然拼读第5级 (Oxford Phonics 5)',
    description: '牛津少儿自然拼读核心词汇（Unit 1-8 全套 96 词，中英双语对照）',
    category: 'phonics',
    badgeEmoji: '📚',
    words: [
      {
            id: "opw5_1",
            word: "car",
            translation: "小汽车"
      },
      {
            id: "opw5_2",
            word: "farm",
            translation: "农场"
      },
      {
            id: "opw5_3",
            word: "park",
            translation: "公园"
      },
      {
            id: "opw5_4",
            word: "star",
            translation: "星星"
      },
      {
            id: "opw5_5",
            word: "bird",
            translation: "小鸟"
      },
      {
            id: "opw5_6",
            word: "girl",
            translation: "女孩"
      },
      {
            id: "opw5_7",
            word: "nurse",
            translation: "护士"
      },
      {
            id: "opw5_8",
            word: "purple",
            translation: "紫色"
      },
      {
            id: "opw5_9",
            word: "teacher",
            translation: "老师"
      },
      {
            id: "opw5_10",
            word: "sister",
            translation: "姐妹"
      },
      {
            id: "opw5_11",
            word: "doctor",
            translation: "医生"
      },
      {
            id: "opw5_12",
            word: "tractor",
            translation: "拖拉机"
      },
      {
            id: "opw5_13",
            word: "mouse",
            translation: "老鼠"
      },
      {
            id: "opw5_14",
            word: "house",
            translation: "房屋"
      },
      {
            id: "opw5_15",
            word: "cow",
            translation: "奶牛"
      },
      {
            id: "opw5_16",
            word: "brown",
            translation: "棕色"
      },
      {
            id: "opw5_17",
            word: "coin",
            translation: "硬币"
      },
      {
            id: "opw5_18",
            word: "soil",
            translation: "泥土"
      },
      {
            id: "opw5_19",
            word: "toy",
            translation: "玩具"
      },
      {
            id: "opw5_20",
            word: "boy",
            translation: "男孩"
      },
      {
            id: "opw5_21",
            word: "book",
            translation: "书本"
      },
      {
            id: "opw5_22",
            word: "foot",
            translation: "脚"
      },
      {
            id: "opw5_23",
            word: "bush",
            translation: "灌木丛"
      },
      {
            id: "opw5_24",
            word: "pull",
            translation: "拉/拽"
      },
      {
            id: "opw5_25",
            word: "sauce",
            translation: "酱汁"
      },
      {
            id: "opw5_26",
            word: "august",
            translation: "八月"
      },
      {
            id: "opw5_27",
            word: "prawn",
            translation: "大虾"
      },
      {
            id: "opw5_28",
            word: "draw",
            translation: "画画"
      },
      {
            id: "opw5_29",
            word: "ball",
            translation: "球"
      },
      {
            id: "opw5_30",
            word: "tall",
            translation: "高的"
      },
      {
            id: "opw5_31",
            word: "water",
            translation: "水"
      },
      {
            id: "opw5_32",
            word: "walk",
            translation: "散步/走路"
      },
      {
            id: "opw5_33",
            word: "horse",
            translation: "马"
      },
      {
            id: "opw5_34",
            word: "fork",
            translation: "叉子"
      },
      {
            id: "opw5_35",
            word: "roar",
            translation: "吼叫/咆哮"
      },
      {
            id: "opw5_36",
            word: "board",
            translation: "木板/黑板"
      },
      {
            id: "opw5_37",
            word: "square",
            translation: "正方形"
      },
      {
            id: "opw5_38",
            word: "share",
            translation: "分享"
      },
      {
            id: "opw5_39",
            word: "chair",
            translation: "椅子"
      },
      {
            id: "opw5_40",
            word: "hair",
            translation: "头发"
      },
      {
            id: "opw5_41",
            word: "bread",
            translation: "面包"
      },
      {
            id: "opw5_42",
            word: "head",
            translation: "头"
      },
      {
            id: "opw5_43",
            word: "bear",
            translation: "熊"
      },
      {
            id: "opw5_44",
            word: "pear",
            translation: "梨"
      },
      {
            id: "opw5_45",
            word: "ear",
            translation: "耳朵"
      },
      {
            id: "opw5_46",
            word: "clear",
            translation: "清晰的/清澈的"
      },
      {
            id: "opw5_47",
            word: "deer",
            translation: "小鹿"
      },
      {
            id: "opw5_48",
            word: "cheer",
            translation: "欢呼"
      },
      {
            id: "opw5_49",
            word: "acorn",
            translation: "橡果"
      },
      {
            id: "opw5_50",
            word: "baby",
            translation: "婴儿/宝宝"
      },
      {
            id: "opw5_51",
            word: "child",
            translation: "孩子/儿童"
      },
      {
            id: "opw5_52",
            word: "cold",
            translation: "寒冷的"
      },
      {
            id: "opw5_53",
            word: "elevator",
            translation: "电梯"
      },
      {
            id: "opw5_54",
            word: "he",
            translation: "他"
      },
      {
            id: "opw5_55",
            word: "hotel",
            translation: "旅馆/酒店"
      },
      {
            id: "opw5_56",
            word: "lady",
            translation: "女士"
      },
      {
            id: "opw5_57",
            word: "music",
            translation: "音乐"
      },
      {
            id: "opw5_58",
            word: "she",
            translation: "她"
      },
      {
            id: "opw5_59",
            word: "tiger",
            translation: "老虎"
      },
      {
            id: "opw5_60",
            word: "uniform",
            translation: "校服/制服"
      },
      {
            id: "opw5_61",
            word: "banana",
            translation: "香蕉"
      },
      {
            id: "opw5_62",
            word: "chicken",
            translation: "小鸡/鸡肉"
      },
      {
            id: "opw5_63",
            word: "honey",
            translation: "蜂蜜"
      },
      {
            id: "opw5_64",
            word: "lemon",
            translation: "柠檬"
      },
      {
            id: "opw5_65",
            word: "love",
            translation: "爱/喜爱"
      },
      {
            id: "opw5_66",
            word: "monkey",
            translation: "猴子"
      },
      {
            id: "opw5_67",
            word: "panda",
            translation: "大熊猫"
      },
      {
            id: "opw5_68",
            word: "pencil",
            translation: "铅笔"
      },
      {
            id: "opw5_69",
            word: "son",
            translation: "儿子"
      },
      {
            id: "opw5_70",
            word: "surprise",
            translation: "惊喜"
      },
      {
            id: "opw5_71",
            word: "umbrella",
            translation: "雨伞"
      },
      {
            id: "opw5_72",
            word: "gorilla",
            translation: "大猩猩"
      },
      {
            id: "opw5_73",
            word: "castle",
            translation: "城堡"
      },
      {
            id: "opw5_74",
            word: "comb",
            translation: "梳子"
      },
      {
            id: "opw5_75",
            word: "glove",
            translation: "手套"
      },
      {
            id: "opw5_76",
            word: "knee",
            translation: "膝盖"
      },
      {
            id: "opw5_77",
            word: "knife",
            translation: "小刀"
      },
      {
            id: "opw5_78",
            word: "lamb",
            translation: "小羊"
      },
      {
            id: "opw5_79",
            word: "live",
            translation: "居住/生活"
      },
      {
            id: "opw5_80",
            word: "rhino",
            translation: "犀牛"
      },
      {
            id: "opw5_81",
            word: "rhubarb",
            translation: "大黄(食用植物)"
      },
      {
            id: "opw5_82",
            word: "whistle",
            translation: "口哨"
      },
      {
            id: "opw5_83",
            word: "write",
            translation: "写字"
      },
      {
            id: "opw5_84",
            word: "wrong",
            translation: "错误的"
      },
      {
            id: "opw5_85",
            word: "beautiful",
            translation: "美丽的"
      },
      {
            id: "opw5_86",
            word: "competition",
            translation: "比赛"
      },
      {
            id: "opw5_87",
            word: "dangerous",
            translation: "危险的"
      },
      {
            id: "opw5_88",
            word: "excursion",
            translation: "远足/短途旅行"
      },
      {
            id: "opw5_89",
            word: "famous",
            translation: "著名的"
      },
      {
            id: "opw5_90",
            word: "helpful",
            translation: "乐于助人的"
      },
      {
            id: "opw5_91",
            word: "measure",
            translation: "测量"
      },
      {
            id: "opw5_92",
            word: "nature",
            translation: "大自然"
      },
      {
            id: "opw5_93",
            word: "picture",
            translation: "图画/照片"
      },
      {
            id: "opw5_94",
            word: "station",
            translation: "车站"
      },
      {
            id: "opw5_95",
            word: "television",
            translation: "电视机"
      },
      {
            id: "opw5_96",
            word: "treasure",
            translation: "宝藏"
      }
],
  },
  {
    id: 'cambridge-animals',
    title: '剑桥少儿英语：奇趣动物世界',
    description: '生动有趣的自然动物单词，配有发音与中文释义',
    category: 'cambridge',
    badgeEmoji: '🦁',
    words: [
      { id: 'an1', word: 'elephant', translation: '大象', phonetic: '[ˈelɪfənt]' },
      { id: 'an2', word: 'giraffe', translation: '长颈鹿', phonetic: '[dʒəˈrɑːf]' },
      { id: 'an3', word: 'monkey', translation: '猴子', phonetic: '[ˈmʌŋki]' },
      { id: 'an4', word: 'dolphin', translation: '海豚', phonetic: '[ˈdɒlfɪn]' },
      { id: 'an5', word: 'rabbit', translation: '兔子', phonetic: '[ˈræbɪt]' },
      { id: 'an6', word: 'panda', translation: '大熊猫', phonetic: '[ˈpændə]' },
      { id: 'an7', word: 'tiger', translation: '老虎', phonetic: '[ˈtaɪɡə(r)]' },
      { id: 'an8', word: 'butterfly', translation: '蝴蝶', phonetic: '[ˈbʌtəflaɪ]' },
      { id: 'an9', word: 'kangaroo', translation: '袋鼠', phonetic: '[ˌkæŋɡəˈruː]' },
      { id: 'an10', word: 'penguin', translation: '企鹅', phonetic: '[ˈpeŋɡwɪn]' },
      { id: 'an11', word: 'puppy', translation: '小狗', phonetic: '[ˈpʌpi]' },
      { id: 'an12', word: 'kitten', translation: '小猫', phonetic: '[ˈkɪtn]' },
      { id: 'an13', word: 'squirrel', translation: '松鼠', phonetic: '[ˈskwɪrəl]' },
      { id: 'an14', word: 'peacock', translation: '孔雀', phonetic: '[ˈpiːkɒk]' },
      { id: 'an15', word: 'dinosaur', translation: '恐龙', phonetic: '[ˈdaɪnəsɔː(r)]' },
    ],
  },
  {
    id: 'story-hare-tortoise',
    title: '经典寓言：龟兔赛跑 (The Hare and the Tortoise)',
    description: '通过趣味寓言故事体验连续 RSVP 速读体验，感受速度与耐力',
    category: 'stories',
    badgeEmoji: '🐢',
    words: [
      { id: 'st1', word: 'Once' },
      { id: 'st2', word: 'upon' },
      { id: 'st3', word: 'a' },
      { id: 'st4', word: 'time,' },
      { id: 'st5', word: 'there' },
      { id: 'st6', word: 'was' },
      { id: 'st7', word: 'a' },
      { id: 'st8', word: 'speedy' },
      { id: 'st9', word: 'hare.' },
      { id: 'st10', word: 'He' },
      { id: 'st11', word: 'always' },
      { id: 'st12', word: 'boasted' },
      { id: 'st13', word: 'about' },
      { id: 'st14', word: 'how' },
      { id: 'st15', word: 'fast' },
      { id: 'st16', word: 'he' },
      { id: 'st17', word: 'could' },
      { id: 'st18', word: 'run.' },
      { id: 'st19', word: 'One' },
      { id: 'st20', word: 'sunny' },
      { id: 'st21', word: 'day,' },
      { id: 'st22', word: 'a' },
      { id: 'st23', word: 'quiet' },
      { id: 'st24', word: 'tortoise' },
      { id: 'st25', word: 'challenged' },
      { id: 'st26', word: 'him' },
      { id: 'st27', word: 'to' },
      { id: 'st28', word: 'a' },
      { id: 'st29', word: 'race.' },
      { id: 'st30', word: 'The' },
      { id: 'st31', word: 'hare' },
      { id: 'st32', word: 'laughed' },
      { id: 'st33', word: 'loudly.' },
      { id: 'st34', word: '"You' },
      { id: 'st35', word: 'are' },
      { id: 'st36', word: 'so' },
      { id: 'st37', word: 'slow!"' },
      { id: 'st38', word: 'the' },
      { id: 'st39', word: 'hare' },
      { id: 'st40', word: 'said.' },
      { id: 'st41', word: 'The' },
      { id: 'st42', word: 'race' },
      { id: 'st43', word: 'began.' },
      { id: 'st44', word: 'The' },
      { id: 'st45', word: 'hare' },
      { id: 'st46', word: 'dashed' },
      { id: 'st47', word: 'ahead' },
      { id: 'st48', word: 'quickly.' },
      { id: 'st49', word: 'Soon,' },
      { id: 'st50', word: 'he' },
      { id: 'st51', word: 'felt' },
      { id: 'st52', word: 'tired' },
      { id: 'st53', word: 'and' },
      { id: 'st54', word: 'decided' },
      { id: 'st55', word: 'to' },
      { id: 'st56', word: 'take' },
      { id: 'st57', word: 'a' },
      { id: 'st58', word: 'nap' },
      { id: 'st59', word: 'under' },
      { id: 'st60', word: 'a' },
      { id: 'st61', word: 'tree.' },
      { id: 'st62', word: 'Meanwhile,' },
      { id: 'st63', word: 'the' },
      { id: 'st64', word: 'tortoise' },
      { id: 'st65', word: 'walked' },
      { id: 'st66', word: 'slowly' },
      { id: 'st67', word: 'and' },
      { id: 'st68', word: 'steadily.' },
      { id: 'st69', word: 'He' },
      { id: 'st70', word: 'never' },
      { id: 'st71', word: 'stopped' },
      { id: 'st72', word: 'moving.' },
      { id: 'st73', word: 'When' },
      { id: 'st74', word: 'the' },
      { id: 'st75', word: 'hare' },
      { id: 'st76', word: 'woke' },
      { id: 'st77', word: 'up,' },
      { id: 'st78', word: 'the' },
      { id: 'st79', word: 'tortoise' },
      { id: 'st80', word: 'was' },
      { id: 'st81', word: 'already' },
      { id: 'st82', word: 'at' },
      { id: 'st83', word: 'the' },
      { id: 'st84', word: 'finish' },
      { id: 'st85', word: 'line!' },
      { id: 'st86', word: 'Slow' },
      { id: 'st87', word: 'and' },
      { id: 'st88', word: 'steady' },
      { id: 'st89', word: 'wins' },
      { id: 'st90', word: 'the' },
      { id: 'st91', word: 'race!' },
    ],
  },
  {
    id: 'sight-words-grade1',
    title: '小学低段进阶高频词 (Grade 1-2)',
    description: '常用阅读衔接词与转折词，提升句子理解速度',
    category: 'sight-words',
    badgeEmoji: '🚀',
    words: [
      { id: 'g1', word: 'after', translation: '在...之后' },
      { id: 'g2', word: 'again', translation: '再一次/又' },
      { id: 'g3', word: 'always', translation: '总是/一直' },
      { id: 'g4', word: 'because', translation: '因为' },
      { id: 'g5', word: 'before', translation: '在...之前' },
      { id: 'g6', word: 'best', translation: '最好的' },
      { id: 'g7', word: 'better', translation: '更好的' },
      { id: 'g8', word: 'both', translation: '两者都' },
      { id: 'g9', word: 'call', translation: '呼叫/打电话' },
      { id: 'g10', word: 'cold', translation: '寒冷的' },
      { id: 'g11', word: 'fast', translation: '快速的' },
      { id: 'g12', word: 'first', translation: '第一/首先' },
      { id: 'g13', word: 'five', translation: '五' },
      { id: 'g14', word: 'found', translation: '找到 (find过去式)' },
      { id: 'g15', word: 'gave', translation: '给予 (give过去式)' },
      { id: 'g16', word: 'goes', translation: '去 (第三人称单数)' },
      { id: 'g17', word: 'green', translation: '绿色' },
      { id: 'g18', word: 'its', translation: '它的' },
      { id: 'g19', word: 'made', translation: '制造 (make过去式)' },
      { id: 'g20', word: 'many', translation: '许多的' },
      { id: 'g21', word: 'off', translation: '离开/关闭' },
      { id: 'g22', word: 'or', translation: '或者' },
      { id: 'g23', word: 'pull', translation: '拉/扯' },
      { id: 'g24', word: 'read', translation: '阅读' },
      { id: 'g25', word: 'right', translation: '正确的/右边' },
      { id: 'g26', word: 'sing', translation: '唱歌' },
      { id: 'g27', word: 'sit', translation: '坐' },
      { id: 'g28', word: 'sleep', translation: '睡觉' },
      { id: 'g29', word: 'tell', translation: '告诉' },
      { id: 'g30', word: 'their', translation: '他们的' },
      { id: 'g31', word: 'these', translation: '这些' },
      { id: 'g32', word: 'those', translation: '那些' },
      { id: 'g33', word: 'upon', translation: '在...之上' },
      { id: 'g34', word: 'us', translation: '我们 (宾格)' },
      { id: 'g35', word: 'use', translation: '使用' },
      { id: 'g36', word: 'very', translation: '非常' },
      { id: 'g37', word: 'wash', translation: '洗涤' },
      { id: 'g38', word: 'which', translation: '哪一个' },
      { id: 'g39', word: 'why', translation: '为什么' },
      { id: 'g40', word: 'wish', translation: '希望/心愿' },
    ],
  },
];
