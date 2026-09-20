import csv
import json
import os
import re
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

CACHE_FILE = 'source/word_translations_cache.json'

with open(CACHE_FILE, 'r', encoding='utf-8') as f:
    cache = json.load(f)

# Collect all words from OPW 1-5 and Oxford Discover
all_words = set()
for i in range(1, 6):
    fn = f'source/OPW_L{i}.csv'
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader, None)
            for row in reader:
                if len(row) >= 3 and row[2].strip():
                    all_words.add(row[2].strip().lower())

od_fn = 'source/Oxford_Discover_L1_to_L6_wordlist.csv'
if os.path.exists(od_fn):
    with open(od_fn, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) >= 3 and row[2].strip():
                all_words.add(row[2].strip().lower())

missing = [w for w in all_words if w not in cache or not cache[w]]
print(f"Total missing to translate: {len(missing)}")

def clean_trans(raw):
    if not raw:
        return ''
    cleaned = re.sub(r'^[a-z]+\.\s*', '', raw)
    cleaned = re.sub(r'^[（\(].*?[）\)]\s*', '', cleaned)
    cleaned = cleaned.split('；')[0].split(';')[0].split('，')[0].split(',')[0].strip()
    return cleaned

def fetch_missing(w):
    norm_w = w.lower().strip()
    # 1. Try Youdao suggest
    try:
        url = 'https://dict.youdao.com/suggest?num=1&doctype=json&q=' + urllib.parse.quote(norm_w)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            entries = data.get('data', {}).get('entries', [])
            if entries:
                explain = entries[0].get('explain', '')
                t = clean_trans(explain)
                if t and not re.match(r'^[a-zA-Z\s]+$', t):
                    return (norm_w, t)
    except Exception:
        pass

    # 2. Try MyMemory
    try:
        url = f'https://api.mymemory.translated.net/get?q={urllib.parse.quote(norm_w)}&langpair=en|zh-CN'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            t = data.get('responseData', {}).get('translatedText', '')
            t = clean_trans(t)
            if t and not re.match(r'^[a-zA-Z\s]+$', t):
                return (norm_w, t)
    except Exception:
        pass

    return (norm_w, '')

if missing:
    with ThreadPoolExecutor(max_workers=12) as executor:
        results = list(executor.map(fetch_missing, missing))
    for w, t in results:
        if t:
            cache[w] = t

    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

print(f"Now total cached: {len(cache)}")
still_missing = [w for w in all_words if w not in cache or not cache[w]]
print(f"Still missing: {len(still_missing)}")
if still_missing:
    print("Samples still missing:", still_missing[:15])
