import { Fragment } from 'react';

type Props =
  | {
      name: string;
      type: 'web' | 'xkcd' | 'wiki';
    }
  | {
      names: string[];
      type: 'brands';
    };

const GroupMatch = (props: Props) => {
  let copy = null;

  if (props.type === 'web') {
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
        is "{props.name}"
      </div>
    );
  }

  if (props.type === 'xkcd') {
    copy = `The 954 most common RGB monitor colors, as defined by several hundred thousand participants in the xkcd color name survey.  "${props.name}"`;
    copy = (
      <div>
        The name for this color in{' '}
        <a href="https://xkcd.com/color/rgb/" target="_blank" rel="noreferrer">
          XKCD colors
        </a>{' '}
        is "{props.name}"
      </div>
    );
  }

  if (props.type === 'wiki') {
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
        is "{props.name}"
      </div>
    );
  }

  const removeNumbers = (str: string) => str.replaceAll(/[0-9]/g, '');
  const removeTrailingDash = (str: string) =>
    str.endsWith('-') ? str.substring(0, str.length - 1) : str;

  if (props.type === 'brands') {
    const names = props.names.map(removeNumbers).map(removeTrailingDash);

    const limit = 5;

    const formatter = new Intl.ListFormat('en', {
      style: 'long',
      type: 'conjunction',
    });

    return (
      <div>
        this color is part of the{' '}
        {formatter
          .formatToParts(names.slice(0, limit))
          .map((part) =>
            part.type === 'element' ? <b>{part.value}</b> : part.value
          )}{' '}
        brand
        {names.length !== 1 ? 's' : ''} color schemes{' '}
        {names.length > limit && `(among ${names.length - limit} other brands)`}{' '}
        found{' '}
        <a href="https://brand-colors.re.im/" target="_blank" rel="noreferrer">
          here
        </a>{' '}
        &{' '}
        <a href="https://brandcolors.net/" target="_blank" rel="noreferrer">
          here
        </a>
      </div>
    );
  }
  return <div>{copy}</div>;
};

export default GroupMatch;
