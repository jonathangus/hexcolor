import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const SectionContentItem = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 40%;
  overflow: visible;
`;

const ContentTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  color: #727272;
`;

const ContentValue = styled.div<{
  capitalize?: boolean;
  hideOverflow?: boolean;
}>`
  text-transform: ${(props) => (props.capitalize ? 'capitalize' : 'none')};
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #111111;
  text-align: left;
  width: 80%;
  overflow-x: ${(props) => (props.hideOverflow ? 'hidden' : 'visible')};
  text-overflow: ellipsis;
  overflow-y: scroll;
  max-height: 72px;
`;

type Props = {
  title: string;
  value: ReactNode;
  titleCase?: boolean;
  truncate?: boolean;
};

const CardValue = ({ title, value, titleCase, truncate }: Props) => {
  return (
    <SectionContentItem>
      <ContentTitle>{title}</ContentTitle>
      <ContentValue hideOverflow={truncate} capitalize={titleCase}>
        {value}
      </ContentValue>
    </SectionContentItem>
  );
};

export default CardValue;
