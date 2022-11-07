import { Fragment } from 'react';
import styled from 'styled-components';

const Reference = styled.a`
  font-size: 8px;
  color: #727272;
  vertical-align: super;
`;

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
    copy = <div>{props.name}</div>;
  }

  if (props.type === 'xkcd') {
    copy = <div>{props.name}</div>;
  }

  if (props.type === 'wiki') {
    copy = <div>{props.name}</div>;
  }

  const removeNumbers = (str: string) => str.replaceAll(/[0-9]/g, '');
  const removeTrailingDash = (str: string) =>
    str.endsWith('-') ? str.substring(0, str.length - 1) : str;

  if (props.type === 'brands') {
    const names = props.names.map(removeNumbers).map(removeTrailingDash);

    const limit = 1;

    const formatter = new Intl.ListFormat('en', {
      style: 'long',
      type: 'conjunction',
    });

    return (
      <div>
        {formatter
          .formatToParts(names.slice(0, limit))
          .map((part) =>
            part.type === 'element' ? <>{part.value}</> : part.value
          )}{' '}
        <Reference
          href="https://brand-colors.re.im/"
          target="_blank"
          rel="noreferrer"
        >
          [1]
        </Reference>
        <Reference
          href="https://brandcolors.net/"
          target="_blank"
          rel="noreferrer"
        >
          ,[2]
        </Reference>
      </div>
    );
  }
  return <div>{copy}</div>;
};

export default GroupMatch;
