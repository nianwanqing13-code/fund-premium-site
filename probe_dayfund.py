import requests, re
s = requests.Session(); s.trust_env = False
s.headers.update({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://mfund.dayfund.com.cn/'})
for code in ['161129','162411']:
    url = f'https://mfund.dayfund.com.cn/ajs/ajaxdata.shtml?showtype=getfundvalue&fundcode={code}'
    try:
        r = s.get(url, timeout=10)
        print('%s status=%d len=%d' % (code, r.status_code, len(r.text)))
        print('  raw:', r.text[:300].replace('\n',' '))
    except Exception as e:
        print('%s ERR %s' % (code, e))
