import csv
import json
import os

CACHE_FILE = 'source/word_translations_cache.json'
with open(CACHE_FILE, 'r', encoding='utf-8') as f:
    cache = json.load(f)

# 1. Helper to update a CSV with translation column
def update_csv_with_trans(in_path, level_idx=0, unit_idx=1, word_idx=2):
    if not os.path.exists(in_path):
        return []
    rows = []
    with open(in_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for row in reader:
            if len(row) > word_idx and row[word_idx].strip():
                w = row[word_idx].strip()
                t = cache.get(w.lower(), '')
                rows.append((row[level_idx].strip(), row[unit_idx].strip(), w, t))

    # Write back
    with open(in_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['level', 'unit', 'word', 'translation'])
        for r in rows:
            writer.writerow([r[0], r[1], r[2], r[3]])
    return rows

# Update OPW files
opw_levels = {}
for i in range(1, 6):
    fn = f'source/OPW_L{i}.csv'
    rows = update_csv_with_trans(fn, 0, 1, 2)
    opw_levels[i] = rows
    print(f"Updated {fn}: {len(rows)} words")

# Update OPW L1-L5 combined
opw_all = update_csv_with_trans('source/Oxford_Phonics_World_L1_to_L5_wordlist.csv', 0, 1, 2)
print(f"Updated OPW L1-L5 combined: {len(opw_all)} words")

# Update Oxford Discover L1-L6
od_all = update_csv_with_trans('source/Oxford_Discover_L1_to_L6_wordlist.csv', 0, 1, 2)
print(f"Updated Oxford Discover: {len(od_all)} words")

# Split Oxford Discover by level
od_levels = {}
for r in od_all:
    lvl = int(r[0])
    if lvl not in od_levels:
        od_levels[lvl] = []
    od_levels[lvl].append(r)

# Generate defaultLibraries.ts
def format_words(word_rows, prefix):
    words = []
    for idx, r in enumerate(word_rows):
        w = r[2]
        t = r[3]
        item = {
            'id': f"{prefix}_{idx+1}",
            'word': w
        }
        if t:
            item['translation'] = t
        words.append(item)
    return words

libraries = []

# Section A: Oxford Phonics World Levels
opw_meta = [
    (1, '牛津自然拼读 1: 字母发音启蒙 (OPW 1)', '字母发音与初级自然拼读（Unit 1-8 全套 104 词，中英对照）', '🔤'),
    (2, '牛津自然拼读 2: 短元音拼读 (OPW 2)', '经典短元音拼读进阶（a, e, i, o, u 全套 93 词，中英对照）', '🍎'),
    (3, '牛津自然拼读 3: 长元音拼读 (OPW 3)', '长元音拼读与魔法字母 e（全套 96 词，中英对照）', '🍰'),
    (4, '牛津自然拼读 4: 辅音连缀 (OPW 4)', '双辅音连缀与复合音拼读（bl, cl, fl, br... 全套 96 词）', '🚀'),
    (5, '牛津自然拼读 5: 字母组合进阶 (OPW 5)', '高阶字母组合与多音节词汇（全套 96 词，中英双语对照）', '📚'),
]

for lvl, title, desc, emoji in opw_meta:
    rows = opw_levels.get(lvl, [])
    libraries.append({
        'id': f"opw-level-{lvl}",
        'title': title,
        'description': desc,
        'category': 'phonics',
        'badgeEmoji': emoji,
        'words': format_words(rows, f"opw{lvl}")
    })

# Section B: OPW Complete
libraries.append({
    'id': 'opw-complete',
    'title': '牛津自然拼读 L1-L5 全套大合集 (OPW Complete)',
    'description': '牛津自然拼读 1~5 级完整全收录（共 485 词，体系化拼读总复习）',
    'category': 'phonics',
    'badgeEmoji': '🏆',
    'words': format_words(opw_all, 'opwall')
})

# Section C: Oxford Discover Levels 1 to 6
od_meta = [
    (1, '牛津探索 1: 启蒙认知 (Oxford Discover 1)', '家庭、朋友、动物与日常观察（Unit 1-18 全套 284 词）', '🌿'),
    (2, '牛津探索 2: 基础进阶 (Oxford Discover 2)', '自然生灵、生活习惯与身边世界（全套 284 词，中英双语）', '🔍'),
    (3, '牛津探索 3: 科学与文化 (Oxford Discover 3)', '生态环境、历史发明与人文故事（全套 257 词，中英对照）', '🌍'),
    (4, '牛津探索 4: 深度拓展 (Oxford Discover 4)', '科技探索、自然奥秘与艺术灵感（全套 276 词，中英双语）', '🧭'),
    (5, '牛津探索 5: 高阶思辨 (Oxford Discover 5)', '前沿科学、全球视野与深度批判（全套 327 词，中英对照）', '🔭'),
    (6, '牛津探索 6: 卓越精通 (Oxford Discover 6)', '学术阅读、哲学思辨与百科领航（全套 341 词，中英对照）', '🎓'),
]

for lvl, title, desc, emoji in od_meta:
    rows = od_levels.get(lvl, [])
    libraries.append({
        'id': f"oxford-discover-{lvl}",
        'title': title,
        'description': desc,
        'category': 'discover',
        'badgeEmoji': emoji,
        'words': format_words(rows, f"od{lvl}")
    })

# Section D: Existing Classic Child Libraries
from existing_classics import CLASSIC_LIBRARIES
libraries.extend(CLASSIC_LIBRARIES)

# Write to defaultLibraries.ts
ts_header = "import { WordLibrary } from '../types/index';\n\nexport const DEFAULT_LIBRARIES: WordLibrary[] = "

with open('src/data/defaultLibraries.ts', 'w', encoding='utf-8') as f:
    f.write(ts_header)
    f.write(json.dumps(libraries, ensure_ascii=False, indent=2))
    f.write(';\n')

print(f"Successfully generated defaultLibraries.ts with {len(libraries)} libraries!")
