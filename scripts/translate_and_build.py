import csv
import json
import os
import re
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

CACHE_FILE = 'source/word_translations_cache.json'

# Load existing cache if any
cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Loaded {len(cache)} cached translations.")
    except Exception as e:
        print("Cache load error:", e)

# Clean translation text for kids
def clean_translation(raw_trans):
    if not raw_trans:
        return ''
    # Remove leading part of speech tags like n. vt. vi. adj. adv.
    cleaned = re.sub(r'^[a-z]+\.\s*', '', raw_trans)
    # Remove bracketed technical qualifiers like （同父母的） or [计] or （通常指女性）
    cleaned = re.sub(r'^[（\(].*?[）\)]\s*', '', cleaned)
    # Take first meaning before semicolon or comma
    cleaned = cleaned.split(';')[0].split('；')[0].split(',')[0].split('，')[0].strip()
    return cleaned

def fetch_translation(word):
    norm_w = word.lower().strip()
    if not norm_w:
        return (word, '')
    if norm_w in cache and cache[norm_w]:
        return (word, cache[norm_w])

    url = 'https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=1&is_need_mean=1&word=' + urllib.parse.quote(norm_w)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=4) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                msg = data.get('message', [])
                if msg:
                    item = msg[0]
                    means = item.get('means', [])
                    trans = ''
                    for target_part in ['n.', 'adj.', 'v.', 'vt.', 'vi.', 'adv.']:
                        for m in means:
                            if m.get('part') == target_part and m.get('means'):
                                trans = m['means'][0]
                                break
                        if trans:
                            break
                    if not trans and means and means[0].get('means'):
                        trans = means[0]['means'][0]
                    if not trans:
                        trans = item.get('paraphrase', '')

                    final_t = clean_translation(trans)
                    if final_t:
                        cache[norm_w] = final_t
                        return (word, final_t)
            break
        except Exception:
            time.sleep(0.3)

    return (word, '')

# Gather all words from OPW files and Oxford Discover
all_words_set = set()

# 1. OPW 1 to 5
for i in range(1, 6):
    fn = f'source/OPW_L{i}.csv'
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader, None)
            for row in reader:
                if len(row) >= 3 and row[2].strip():
                    all_words_set.add(row[2].strip().lower())

# 2. Oxford Discover
od_fn = 'source/Oxford_Discover_L1_to_L6_wordlist.csv'
if os.path.exists(od_fn):
    with open(od_fn, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for row in reader:
            if len(row) >= 3 and row[2].strip():
                all_words_set.add(row[2].strip().lower())

# Check Oxford Phonics 5 existing translations
op5_fn = 'source/Oxford_Phonics_World_5_wordlist.csv'
if os.path.exists(op5_fn):
    with open(op5_fn, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for row in reader:
            if len(row) >= 3 and row[1].strip() and row[2].strip():
                cache[row[1].strip().lower()] = row[2].strip()

words_to_fetch = [w for w in all_words_set if w not in cache or not cache[w]]
print(f"Total unique words: {len(all_words_set)}, Need fetching: {len(words_to_fetch)}")

if words_to_fetch:
    print("Fetching translations with ThreadPoolExecutor...")
    with ThreadPoolExecutor(max_workers=12) as executor:
        results = list(executor.map(fetch_translation, words_to_fetch))
    print("Fetch completed!")

# Save updated cache
with open(CACHE_FILE, 'w', encoding='utf-8') as f:
    json.dump(cache, f, ensure_ascii=False, indent=2)
print(f"Saved {len(cache)} words to cache {CACHE_FILE}.")
