import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchServices,
  createService,
} from '../../../redux/services/servicesActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../form-inputs/text-input/text-input.component';
import TextAreaInput from '../../form-inputs/textarea-input/textarea-input.component';
import FileInput from '../../form-inputs/file-input/file-input.component';
import HandleAward from '../../handle-award/handle-award.component';

// STYLES
import {
  SettingsContainer,
  ServicesSettings,
  Title,
  Loader,
} from './manage-awards.styles';

import { Line, TabSubContainer, TabButton } from '../../general.styles.js';

const ManageAwards = () => {
  // -------------------------- STATE AND CONSTANTS ---------------
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    date: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const { name, description, date } = serviceData;

  const dispatch = useDispatch();
  const { servicesData } = useSelector((state) => state.services);
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
    dispatch(fetchServices());
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ------------------------- HANDLERS ---------------------
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    dispatch(createService(name, description, date, selectedFile));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setServiceData({ ...serviceData, [name]: value });
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <SettingsContainer
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
            type='text'
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
      <ServicesSettings loading={loading.fetchLoader ? 'true' : 'false'}>
        <Title>Administrar premios</Title>
        {loading.fetchLoader ? (
          <Loader />
        ) : (
          servicesData.map(({ _id, ...otherProps }) => (
            <HandleAward key={_id} id={_id} {...otherProps}></HandleAward>
          ))
        )}
      </ServicesSettings>
    </SettingsContainer>
  );
};

export default ManageAwards;
