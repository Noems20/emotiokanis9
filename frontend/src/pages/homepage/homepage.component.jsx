import { motion } from 'framer-motion';
import React from 'react';

import Hero from '../../components/hero/hero.component';
import Section from '../../components/section/section.component';

import { homeObjOne, homeObjTwo, homeObjThree } from './home-data.js';

const Home = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <Hero />
        <Section {...homeObjOne} />
        <Section {...homeObjTwo} />
        <Section {...homeObjThree} />
      </motion.div>
    </>
  );
};

export default Home;
