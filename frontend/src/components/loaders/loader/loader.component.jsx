import React from 'react';

import { LoaderContainer, Loading } from './loader.styles.js';

const Loader = ({ className }) => {
  return (
    <LoaderContainer className={className}>
      <Loading />
    </LoaderContainer>
  );
};

export default Loader;
