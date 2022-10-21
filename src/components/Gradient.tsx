import React from 'react';
import styled, { css } from 'styled-components';
import SimplexNoise from 'simplex-noise';

const COLORS = ['bf211e', 'ffa69e', 'ffba08', '53dd6c', '031a6b'].map(
  (col) => `#${col}`
);

type CircleProps = {
  i: number;
};

const Circle: React.FC<CircleProps> = ({ i }) => {
  return (
    <circle
      key={`blob-${i}`}
      style={{
        filter: 'url(#filter)',
      }}
      cx={Math.max(Math.floor(Math.random() * 100), 3)}
      cy={Math.max(Math.floor(Math.random() * 100), 3)}
      r={Math.max(Math.floor(Math.random() * 100), 50)}
      fill={`url(#g${i % COLORS.length})`}
    />
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  svg {
    min-height: 100vh;
    min-width: 100%;
  }
`;
const GradientMesh: React.FC = () => {
  return (
    <Wrapper>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={50}
              numOctaves="50"
            />
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
              result="map"
            />
          </filter>
          {COLORS.map((col, i) => (
            <radialGradient key={i} id={`g${i}`} r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor={col}></stop>
              <stop offset="100%" stopColor={col} stopOpacity="0"></stop>
            </radialGradient>
          ))}
        </defs>
        <rect x="0" y="0" width="100" height="100" fill={COLORS[1]} />
        {[...new Array(5)].map((_, i) => (
          <Circle i={i % COLORS.length} key={`blob-circle-${i}`} />
        ))}
      </svg>
    </Wrapper>
  );
};

export default GradientMesh;
