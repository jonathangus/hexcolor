import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import ColorView from '../components/ColorView';
import SEO from '../components/SEO';
import { ColorContextProvider } from '../context/ColorContext';
import useColorMatch from '../hooks/useColorMatch';
import { stringIsHex } from '../utils/regex';

type Props = {
  mounted?: boolean;
  color?: string;
};

const ColorPage = ({ color, mounted }: Props) => {
  const { hex, wantedColor } = useColorMatch(color);

  return (
    <ColorContextProvider color={wantedColor}>
      <SEO title={`${hex} - ${color}.eth`} image={`/api/og?color=${color}`} />
      <ColorView />

      {!mounted && process.env.NODE_ENV == 'production' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
               const base = window.location.pathname.replace('/', '');
               const match = '#' + base;
               let hex;
              if (match.match(/^#([A-F0-9]{3}|[A-F0-9]{6})$/i)) {
                hex = match;
                console.log("HEJ MATCH", hex, document.getElementById("color-title"))
                document.getElementById("color-title").innerHTML = hex;
                document.title = match + " - " + base + ".eth";
              }
             `,
          }}
        />
      )}
    </ColorContextProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [color] = params?.color || [];
  const hex = `#${color}`;

  if (!hex.match(/^#([A-F0-9]{3}|[A-F0-9]{6})$/i)) {
    return {
      props: {
        isEmptyPage: true,
      },
      revalidate: false,
    };
  }

  return {
    props: {
      color,
    },
    revalidate: false,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default ColorPage;
