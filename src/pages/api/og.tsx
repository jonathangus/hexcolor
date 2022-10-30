import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getEns } from '../../utils/api';
import axios from 'axios';

export const config = {
  runtime: 'experimental-edge',
};

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode('my_secret'),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign']
);

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('');
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const color = searchParams.get('color');
  const result = await getEns(color);
  let ensName;
  if (result?.owner) {
    try {
      console.log(
        result.owner,
        'get moralis',
        `https://deep-index.moralis.io/api/v2/resolve/${result.owner}/reverse`,
        process.env.MORALIS
      );
      let res = await fetch(
        `https://deep-index.moralis.io/api/v2/resolve/${result.owner}/reverse`,
        {
          headers: {
            ['X-API-KEY']: process.env.MORALIS,
          },
        }
      );
      const { name } = await res.json();
      ensName = name;
    } catch (e) {
      console.error('ERR:::', e);
    }
  }
  //   const token = searchParams.get('token');

  //   const verifyToken = toHex(
  //     await crypto.subtle.sign(
  //       'HMAC',
  //       await key,
  //       new TextEncoder().encode(JSON.stringify({ id }))
  //     )
  //   );

  //   if (token !== verifyToken) {
  //     return new Response('Invalid token.', { status: 401 });
  //   }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'white',
          background: '#' + color,
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {result.available && <h1>{color}.eth is available!</h1>}
        {!result.available && (
          <h1>
            {color}.eth is owned by {ensName || result.owner}!
          </h1>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
