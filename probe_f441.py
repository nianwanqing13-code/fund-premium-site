import requests
H = {'User-Agent': 'Mozilla/5.0', 'Referer': 'https://quote.eastmoney.com/'}
def q(fs, fields, pz=10):
    url = 'https://push2delay.eastmoney.com/api/qt/clist/get'
    p = {'pn':'1','pz':str(pz),'po':'1','np':'1','ut':'bd1d9ddb04089700cf9c27f6f7426281',
         'fltt':'2','invt':'2','fid':'f3','fs':fs,'fields':fields}
    r = requests.get(url, params=p, headers=H, timeout=12, proxies={'http': None, 'https': None})
    j = r.json(); d = j.get('data') or {}
    return d.get('diff') or []

print('=== LOF 板块前 10 只：看 f441(IOPV) 是否有值 ===')
for it in q('b:MK0404,b:MK0405,b:MK0406,b:MK0407', 'f12,f14,f2,f3,f402,f441', 10):
    print('LOF', it.get('f12'), it.get('f14'), 'price=', it.get('f2'),
          'disc_f402=', it.get('f402'), 'iopv_f441=', it.get('f441'))
print()
print('=== ETF 板块前 10 只：f441 对照 ===')
for it in q('b:MK0021,b:MK0022,b:MK0023,b:MK0024,b:MK0827', 'f12,f14,f2,f3,f402,f441', 10):
    print('ETF', it.get('f12'), it.get('f14'), 'price=', it.get('f2'),
          'disc_f402=', it.get('f402'), 'iopv_f441=', it.get('f441'))
