import React from 'react';
import ButtonLink from '../button-link/button-link.component';

import {
  SectionContainer,
  ContentWrapper,
  ColumnOne,
  ColumnTwo,
  Subtitle,
  Heading,
  Description,
  ImageWrapper,
  Image,
  Decoration,
} from './section.styles';

const Section = ({
  img,
  lightBg,
  imgStart,
  alt,
  topLine,
  headline,
  description,
  buttonLabel,
  linkUrl,
  decoration,
}) => {
  return (
    <>
      <SectionContainer lightBg={lightBg}>
        <ContentWrapper imgStart={imgStart}>
          <ColumnOne>
            <Subtitle>{topLine}</Subtitle>
            <Heading lightBg={lightBg}>{headline}</Heading>
            <Description lightBg={lightBg}>{description}</Description>
            <ButtonLink to={linkUrl}>{buttonLabel}</ButtonLink>
          </ColumnOne>
          <ColumnTwo>
            <ImageWrapper>
              <Image src={img} alt={alt} />
            </ImageWrapper>
          </ColumnTwo>
        </ContentWrapper>
        {decoration ? <Decoration imgStart={imgStart} /> : null}
      </SectionContainer>
    </>
  );
};

export default Section;
