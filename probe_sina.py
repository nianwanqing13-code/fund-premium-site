import requests
s = requests.Session(); s.trust_env = False
s.headers.update({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://finance.sina.com.cn/'})
for code in ['fu_161129', 'fu_162411', 'sh513100']:
    url = f'http://hq.sinajs.cn/list={code}'
    try:
        r = s.get(url, timeout=10)
        r.encoding = 'gbk'
        print('%s -> %s' % (code, r.text.strip()))
    except Exception as e:
        print('%s ERR %s' % (code, e))
