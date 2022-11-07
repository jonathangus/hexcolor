import styled from 'styled-components';
import { motion } from 'framer-motion';
import CardValue from './CardValue';
import Random from './Random';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: rgba(246, 247, 249, 0.85);
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  text-align: left;
  width: 100%;

  @media (min-width: 500px) {
    max-width: 500px;
  }
`;

const ColorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
  min-height: 180px;
  gap: 16px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 100%;

  &:last-child {
    padding-top: 16px;
    border-top: 1px solid #d4d4d4;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  background: rgba(199, 199, 199, 0.25);
  border-top: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
`;

const RegisterButton = styled.a`
  box-sizing: border-box;
  font-weight: 500;
  padding: 8px;
  text-align: center;
  width: 100%;
  border-radius: 8px;
  background: #0029ff;
  color: #f6f7f9;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #001EBA;
`;

type Props = {
  color: string;
  name?: ReactNode;
  registerUrl?: string;
  brand?: ReactNode;
  owner?: ReactNode;
  owns?: ReactNode;
};

const StructuredCard = ({
  color,
  name,
  registerUrl,
  brand,
  owner,
  owns,
}: Props) => {
  return (
    <Wrapper>
      <ColorSection>
        <SectionContent>
          <CardValue
            title={name ? 'Name' : 'Hex'}
            value={name || `#${color.toUpperCase()}`}
            titleCase
          />
          <CardValue title={'Brand color'} value={brand || '🤷'} titleCase />
        </SectionContent>

        <SectionContent>
          <CardValue title={'Current owner'} value={owner || '-'} truncate />
          <CardValue title={'Also owns'} value={owns || '-'} />
        </SectionContent>
      </ColorSection>

      <ButtonWrapper>
        <RegisterButton
          href={registerUrl}
        >{`Register ${color.toUpperCase()}.eth`}</RegisterButton>
        <Random />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default StructuredCard;
