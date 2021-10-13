import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { fetchAwards, createAward } from '../../../redux/awards/awardsActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../form-inputs/text-input/text-input.component';
import TextAreaInput from '../../form-inputs/textarea-input/textarea-input.component';
import FileInput from '../../form-inputs/file-input/file-input.component';
import HandleAward from '../../handle-award/handle-award.component';
import TabLoader from '../../loaders/tab-loader/tab-loader.component';

// STYLES
import {
  Line,
  TabContainer,
  TabSubContainer,
  TabButton,
  ManageItems,
  Title,
} from '../managers.styles.js';

const ManageAwards = () => {
  // -------------------------- STATE AND CONSTANTS ---------------
  const [awardData, setAwardData] = useState({
    name: '',
    description: '',
    date: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const { name, description, date } = awardData;

  const dispatch = useDispatch();
  const { awardsData } = useSelector((state) => state.awards);
  const { uiErrors, loading } = useSelector((state) => state.ui);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
      },
    },
  };

  // ------------------------- USE EFFECT ---------------------
  useEffect(() => {
    dispatch(fetchAwards());
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ------------------------- HANDLERS ---------------------
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    dispatch(createAward(name, description, date + 'T01:00:00', selectedFile));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAwardData({ ...awardData, [name]: value });
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <TabContainer
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <TabSubContainer>
        <Title>Añadir premio</Title>
        <form onSubmit={handleServiceSubmit}>
          <TextInput
            name='name'
            type='text'
            handleChange={handleChange}
            value={name}
            label='Nombre'
            error={uiErrors.errorsOne.name}
          />
          <TextAreaInput
            name='description'
            type='text'
            handleChange={handleChange}
            value={description}
            label='Descripción'
            error={uiErrors.errorsOne.description}
            rows={1}
          />
          <TextInput
            name='date'
            type='date'
            handleChange={handleChange}
            value={date}
            label='Fecha'
            error={uiErrors.errorsOne.date}
          />
          <FileInput
            id='image'
            error={uiErrors.errorsOne.image ? true : false}
            selected={
              selectedFile ? !uiErrors.errorsOne.image && 'selected' : ''
            }
            onChange={handleFile}
          >
            {uiErrors.errorsOne.image
              ? uiErrors.errorsOne.image
              : selectedFile
              ? `${selectedFile.name}`
              : 'Seleccionar foto de premio'}
          </FileInput>
          <TabButton
            type='submit'
            loading={loading.firstLoader}
            disabled={loading.firstLoader || loading.secondLoader}
            primary
          >
            Añadir premio
          </TabButton>
        </form>
      </TabSubContainer>
      <Line />
      <ManageItems loading={loading.fetchLoader ? 'true' : 'false'}>
        <Title>Administrar premios</Title>
        {loading.fetchLoader ? (
          <TabLoader />
        ) : (
          awardsData.map(({ _id, ...otherProps }) => (
            <HandleAward key={_id} id={_id} {...otherProps}></HandleAward>
          ))
        )}
      </ManageItems>
    </TabContainer>
  );
};

export default ManageAwards;
