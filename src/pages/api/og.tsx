import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getEns } from '../../utils/api';
import axios from 'axios';
import {
  getColor,
  pickTextColorBasedOnBgColorAdvanced,
} from '../../utils/extra';

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

// Make sure the font exists in the specified path:
const font = fetch(
  new URL('../../assets/SFMonoBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const color = searchParams.get('color');
  const result = await getEns(color);
  let ensName;
  const fontData = await font;

  if (result?.owner) {
    try {
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

  const match = getColor(`#${color}`) || {};

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 95,
          lineHeight: '140%',
          background: '#' + color,
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: '"MonoFont"',
          color: pickTextColorBasedOnBgColorAdvanced(
            '#' + color,
            '#ffffff',
            '#000000'
          ),
        }}
      >
        {result.available && <h1>{color.toUpperCase()}.eth is available!</h1>}
        {!result.available && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex' }}>{color}.eth</div>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              is owned by {ensName || result.owner}!
            </span>
          </div>
        )}
        {match?.name ? (
          <div style={{ display: 'flex', fontSize: 22, marginTop: 20 }}>
            this color is also known as "{match.name}"
          </div>
        ) : null}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'MonoFont',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
