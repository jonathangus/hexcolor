type Props = {
  name: string;
  type: 'web' | 'xkcd' | 'wiki' | 'brand';
};

const GroupMatch = ({ name, type }: Props) => {
  let copy = null;

  if (type === 'web') {
    copy = (
      <div>
        The name for this color in{' '}
        <a
          href="https://www.colorabout.com/list/css/"
          target="_blank"
          rel="noreferrer"
        >
          CSS colors
        </a>{' '}
        is "{name}"
      </div>
    );
  }

  if (type === 'xkcd') {
    copy = `The 954 most common RGB monitor colors, as defined by several hundred thousand participants in the xkcd color name survey.  "${name}"`;
    copy = (
      <div>
        The name for this color in{' '}
        <a href="https://xkcd.com/color/rgb/" target="_blank" rel="noreferrer">
          XKCD colors
        </a>{' '}
        is "{name}"
      </div>
    );
  }

  if (type === 'wiki') {
    copy = (
      <div>
        The name for this color in{' '}
        <a
          href="https://en.wikipedia.org/wiki/List_of_colors_(compact)"
          target="_blank"
          rel="noreferrer"
        >
          Wikipedia list of colors
        </a>{' '}
        is "{name}"
      </div>
    );
  }

  if (type === 'brand') {
    let newName = name.replaceAll(/[0-9]/g, '');
    if (newName.endsWith('-')) {
      newName = newName.slice(0, -1);
    }
    return (
      <div>
        this color is part of the <b>{newName}</b> brand color scheme found in{' '}
        <a href="https://brand-colors.re.im/" target="_blank" rel="noreferrer">
          here
        </a>
      </div>
    );
    console.log('is brand', name);
  }
  return <div>{copy}</div>;
};

export default GroupMatch;
