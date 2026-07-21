import requests, json, re
H = {'User-Agent': 'Mozilla/5.0', 'Referer': 'http://fundf10.eastmoney.com/'}
def gz(code):
    url = f'http://fundgz.1234567.com.cn/js/{code}.js'
    s = requests.Session(); s.trust_env = False
    try:
        r = s.get(url, headers=H, timeout=10)
        m = re.search(r'jsonpgz\((.*)\)', r.text)
        if not m:
            return {'raw': r.text[:300]}
        return json.loads(m.group(1))
    except Exception as e:
        return {'err': str(e)}

out = []
for code in ['161129','162411','501018','160723','513100']:
    d = gz(code)
    if isinstance(d, dict) and 'gsz' in d:
        out.append('%s gsz(盘中估算)=%s dwjz(昨净)=%s gztime=%s' % (code, d.get('gsz'), d.get('dwjz'), d.get('gztime')))
    else:
        out.append('%s -> %s' % (code, json.dumps(d, ensure_ascii=False)[:300]))
with open('probe_gz_result.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done')
