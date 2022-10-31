import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import ColorView from '../components/ColorView';
import SEO from '../components/SEO';
import { ColorContextProvider } from '../context/ColorContext';
import useColorMatch from '../hooks/useColorMatch';
import { allColors } from '../utils/extra';

type Props = {
  mounted?: boolean;
  color?: string;
  isEmptyPage?: boolean;
};

const ColorPage = ({ color, isEmptyPage }: Props) => {
  const { hex, wantedColor } = useColorMatch(color);

  if (isEmptyPage) {
    return <Error statusCode={404} />;
  }

  return (
    <ColorContextProvider color={wantedColor}>
      <SEO
        title={`${hex} - ${wantedColor}.eth`}
        image={`/api/og?color=${color}`}
      />
      <ColorView />
    </ColorContextProvider>
  );
};

export async function getStaticProps({ params }) {
  const [color] = params?.color || [];
  const hex = `#${color}`;

  if (!hex.match(/^#([A-F0-9]{3}|[A-F0-9]{6})$/i)) {
    return {
      props: {
        isEmptyPage: true,
      },
    };
  }

  return {
    props: {
      color,
    },
  };
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];

  for (let color of allColors) {
    paths.push({
      params: { color: [color.replace('#', '').toUpperCase()] },
    });
    // paths.push({
    //   params: { color: [color.replace('#', '').toUpperCase()] },
    // });
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export default ColorPage;
