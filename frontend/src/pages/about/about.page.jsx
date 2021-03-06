import React, { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Aos from 'aos';
import 'aos/dist/aos.css';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { fetchAwards, clearAwards } from '../../redux/awards/awardsActions';

// COMPONENTS
import GalleryCard from '../../components/gallery-card/gallery-card.component';
import TabLoader from '../../components/loaders/tab-loader/tab-loader.component';

// STYLES
import {
  Grid,
  SectionHeading,
  SectionTitle,
  SectionDescription,
  Logo,
  SectionText,
  Gallery,
} from './about.page.styles';
import logo from './images/logo.svg';

// var date = new Date("2000-02-11T01:00:00") -> LOCAL
// var date = new Date("2000-02-11T01:00:00.000-06:00Z") -> ISO
// var date = new Date("2000-02-11T07:00:00Z") -> ISO

// const options = { year: 'numeric', month: 'long', day: 'numeric' };
// date.toLocaleDateString('es-ES', options) -> '11 de febrero de 2000'

// ----------- PROCESS TO MANAGE DATE ------------
// SAVE TO MONGODB AS LOCAL DATE new Date("2000-02-11T01:00:00")
// MONGODB WILL SAVE IT AS ISO new Date("2000-02-11T07:00:00Z")
// WE RETRIVE USING date.toLocaleDateString('es-ES', options) -> '11 de febrero de 2000'

const About = () => {
  //----------------------------- STATE AND VARIABLES -----------------------
  const dispatch = useDispatch();
  const { awardsData } = useSelector((state) => state.awards);
  const { loading } = useSelector((state) => state.ui);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  //------------------------------- USE EFFECT ------------------------
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    dispatch(fetchAwards());

    return () => {
      dispatch(clearAwards());
    };
  }, [dispatch]);

  //--------------------------------- HANDLERS --------------------------

  return (
    <>
      <Grid
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <SectionHeading>
          <SectionTitle>
            LA HISTORIA
            <br /> DE <span>EmotioKanis9</span>
          </SectionTitle>
        </SectionHeading>
        <SectionDescription>
          <Logo src={logo} data-aos='fade-right' />
          <SectionText data-aos='fade-left'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
            iste veritatis repellat rem quidem tenetur culpa sint a tempore
            accusantium beatae nulla officia iure reprehenderit accusamus? Id
            aperiam officia voluptatem! Cupiditate quia fuga adipisci facilis,
            quaerat dicta commodi. Optio eos magnam rem, facere obcaecati
            cupiditate iste ducimus reprehenderit possimus ad temporibus omnis
          </SectionText>
        </SectionDescription>
        <SectionHeading>
          <SectionTitle data-aos='flip-left'>
            PREMIOS
            <br /> DE <span>EmotioKanis9</span>
          </SectionTitle>
        </SectionHeading>
        <Gallery>
          {loading.fetchLoader ? (
            <TabLoader />
          ) : (
            <Masonry
              breakpointCols={breakpoints}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid_column'
            >
              {awardsData.map(({ _id, ...otherCardProps }) => (
                <GalleryCard key={_id} {...otherCardProps} />
              ))}
            </Masonry>
          )}
        </Gallery>
      </Grid>
    </>
  );
};

export default About;
