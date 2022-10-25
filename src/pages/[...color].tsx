import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import ColorView from '../components/ColorView';
import SEO from '../components/SEO';
import { ColorContextProvider } from '../context/ColorContext';
import useColorMatch from '../hooks/useColorMatch';

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
      <SEO title={`${hex} - ${color}.eth`} image={`/api/og?color=${color}`} />
      <ColorView />
    </ColorContextProvider>
  );
};

export async function getServerSideProps({ params }) {
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

export default ColorPage;
