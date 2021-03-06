import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchServices,
  createService,
} from '../../../redux/services/servicesActions';
import { clearUiErrors, clearSuccess } from '../../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../form-inputs/text-input/text-input.component';
import TextAreaInput from '../../form-inputs/textarea-input/textarea-input.component';
import FileInput from '../../form-inputs/file-input/file-input.component';
import HandleService from '../../handle-service/handle-service.component';
import TabLoader from '../../loaders/tab-loader/tab-loader.component';

import {
  Line,
  TabContainer,
  TabSubContainer,
  TabButton,
  ManageItems,
  Title,
} from '../managers.styles.js';

const ManageServices = () => {
  // -------------------------- STATE AND CONSTANTS ---------------
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    priceLapse: '',
    price: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const { name, description, priceLapse, price } = serviceData;

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
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  // ------------------------- HANDLERS ---------------------
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    dispatch(createService(name, description, priceLapse, price, selectedFile));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setServiceData({ ...serviceData, [name]: value });
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
        <Title>A??adir servicio</Title>
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
            label='Descripci??n'
            error={uiErrors.errorsOne.description}
            rows={1}
          />
          <TextInput
            name='priceLapse'
            type='text'
            handleChange={handleChange}
            value={priceLapse}
            label='Lapso de precio'
            error={uiErrors.errorsOne.priceLapse}
          />
          <TextInput
            name='price'
            type='text'
            handleChange={handleChange}
            value={price}
            label='Precio'
            error={uiErrors.errorsOne.price}
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
              : 'Seleccionar foto de servicio'}
          </FileInput>
          <TabButton
            type='submit'
            loading={loading.firstLoader}
            disabled={loading.firstLoader || loading.secondLoader}
            primary
          >
            A??adir servicio
          </TabButton>
        </form>
      </TabSubContainer>
      <Line />
      <ManageItems loading={loading.fetchLoader ? 'true' : 'false'}>
        <Title>Administrar servicios</Title>
        {loading.fetchLoader ? (
          <TabLoader />
        ) : (
          servicesData.map(({ _id, ...otherProps }) => (
            <HandleService key={_id} id={_id} {...otherProps}></HandleService>
          ))
        )}
      </ManageItems>
    </TabContainer>
  );
};

export default ManageServices;
