import Head from 'next/head';
import { FC } from 'react';

type Meta =
  | { name: string; content: string }
  | { property: string; content: string };

type Props = {
  description?: string;
  meta?: Meta[];
  keywords?: string[];
  title?: string;
  image?: string;
};
const defaultDescription = '';
const defaultTitle = 'colorclub';
const twitterHandle = '';

const SEO: FC<Props> = ({
  description,
  meta = [],
  keywords = [],
  title,
  image,
}) => {
  const metaTitle = `${title || defaultTitle} - hexcolor`;
  const metaDescription = description || defaultDescription;
  let metaImage;
  if (image) {
    if (image.startsWith('http')) {
      metaImage = image;
    } else if (image.startsWith('/')) {
      metaImage = `https://${process.env.NEXT_PUBLIC_VERCEL_UR}${image}`;
    } else {
      throw new Error('Image needs to be relative');
    }
  }
  const metaContent = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: metaTitle,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:image',
      content: metaImage,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'image',
      content: metaImage,
    },
    {
      name: 'twitter:creator',
      content: twitterHandle,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: metaImage,
    },

    {
      name: 'twitter:title',
      content: metaTitle,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },

    ...meta,
  ];

  if (keywords.length > 0) {
    metaContent.push({
      name: 'keywords',
      content: keywords.join(', '),
    });
  }

  return (
    <Head>
      <title key="title">{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaContent.map((m) => (
        <meta {...m} key={'name' in m ? m.name : m.property} />
      ))}

      <meta charSet="utf-8" />
    </Head>
  );
};

export default SEO;
