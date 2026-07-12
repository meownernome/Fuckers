import https from 'https';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function createRole(token: string, guildId: string, name: string, color: number): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await postRole(token, guildId, name, color);
      return;
    } catch (e: any) {
      if (e?.retryAfter) {
        await sleep(Math.ceil(e.retryAfter * 1000) + 1000);
      } else {
        if (attempt === 4) throw e;
        await sleep(5000);
      }
    }
  }
}

function postRole(token: string, guildId: string, name: string, color: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ name, color, hoist: false, mentionable: false });
    const buf = Buffer.from(body);
    const req = https.request({
      hostname: 'discord.com',
      path: `/api/v10/guilds/${guildId}/roles`,
      method: 'POST',
      agent: false,
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': buf.length,
        'Connection': 'close',
      },
    }, (res) => {
      let data = '';
      res.on('data', (c: any) => data += c);
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) resolve();
        else if (res.statusCode === 429) {
          try { const j = JSON.parse(data); reject({ status: 429, retryAfter: j.retry_after || 5 }); }
          catch { reject({ status: 429, retryAfter: 5 }); }
        } else reject({ status: res.statusCode, body: data.slice(0, 200) });
      });
    });
    const timer = setTimeout(() => { req.destroy(); reject({ status: 0, retryAfter: 10 }); }, 15000);
    req.on('close', () => clearTimeout(timer));
    req.on('error', () => { clearTimeout(timer); reject({ status: 0, retryAfter: 5 }); });
    req.write(buf);
    req.end();
  });
}
