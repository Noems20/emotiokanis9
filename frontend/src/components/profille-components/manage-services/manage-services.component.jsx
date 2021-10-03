import React, { useEffect, useState } from 'react';
import axios from 'axios';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { createService } from '../../../redux/services/serviceActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import FormInput from '../../form-input/form-input.component';

// STYLES
import {
  SettingsContainer,
  Settings,
  ServicesSettings,
  Title,
  Line,
  ChangeImage,
  UserImage,
  ImageInputLabel,
  ImageInput,
  Button,
} from './manage-services.styles';
import HandleService from '../../handle-service/handle-service.component';

const ManageServices = () => {
  const [servicesData, setServicesData] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    priceLapse: '',
    price: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const { name, description, priceLapse, price } = serviceData;

  const fetchData = async () => {
    const res = await axios.get(`/api/v1/services`);
    setServicesData(res.data.data);
  };

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);
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

  useEffect(() => {
    // require(`../../../../../backend/public/img/services/${service.image}`).default
    fetchData();
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

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
    <SettingsContainer
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <Settings>
        <Title>Crear servicio</Title>
        <form onSubmit={handleServiceSubmit}>
          <FormInput
            name='name'
            type='text'
            handleChange={handleChange}
            value={name}
            label='Nombre'
            error={uiErrors.errorsOne.name}
          />
          <FormInput
            name='description'
            type='text'
            handleChange={handleChange}
            value={description}
            label='Descripción'
            error={uiErrors.errorsOne.description}
          />
          <FormInput
            name='priceLapse'
            type='text'
            handleChange={handleChange}
            value={priceLapse}
            label='Lapso de precio'
            error={uiErrors.errorsOne.priceLapse}
          />
          <FormInput
            name='price'
            type='text'
            handleChange={handleChange}
            value={price}
            label='Precio'
            error={uiErrors.errorsOne.price}
          />
          <ChangeImage>
            {/* <UserImage src={userPhoto} /> */}
            <ImageInputLabel
              htmlFor='photo'
              error={uiErrors.errorsOne.image ? true : false}
            >
              {uiErrors.errorsOne.image
                ? uiErrors.errorsOne.image
                : 'Seleccionar foto de servicio'}
            </ImageInputLabel>
            <ImageInput
              type='file'
              accept='image/*'
              // name='photo'
              id='photo'
              onChange={handleFile}
            />
          </ChangeImage>
          <Button
            type='submit'
            loading={loading.firstLoader}
            disabled={loading.firstLoader || loading.secondLoader}
            primary
          >
            Crear servicio
          </Button>
        </form>
      </Settings>
      <Line />

      <ServicesSettings>
        <Title>Administrar servicios</Title>
        {servicesData.map(({ _id, ...otherProps }) => (
          <HandleService key={_id} {...otherProps}></HandleService>
        ))}
      </ServicesSettings>
    </SettingsContainer>
  );
};

export default ManageServices;
