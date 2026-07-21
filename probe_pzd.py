import requests, re
H = {'User-Agent': 'Mozilla/5.0', 'Referer': 'http://fundf10.eastmoney.com/'}
s = requests.Session(); s.trust_env = False
for code in ['161129','162411']:
    url = f'https://fund.eastmoney.com/pingzhongdata/{code}.js'
    r = s.get(url, headers=H, timeout=15)
    t = r.text
    print('=== %s len=%d ===' % (code, len(t)))
    # 找实时估值相关变量
    for kw in ['Data_live', 'Data_estimate', 'Data_currentFundInfo', '估算', 'gsz', 'Data_netWorthTrend']:
        idx = t.find(kw)
        if idx >= 0:
            print('  含 %s @%d: %s' % (kw, idx, t[idx:idx+120].replace('\n',' ')))
        else:
            print('  不含 %s' % kw)
