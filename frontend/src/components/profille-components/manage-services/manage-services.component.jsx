import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchServices,
  createService,
} from '../../../redux/services/servicesActions';
import { setModalType } from '../../../redux/modal/modalActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import FormInput from '../../form-input/form-input.component';
import TextAreaInput from '../../text-area-input/text-area-input.component';
import HandleService from '../../handle-service/handle-service.component';

// STYLES
import {
  SettingsContainer,
  Settings,
  ServicesSettings,
  Title,
  Line,
  ChangeImage,
  // UserImage,
  ImageInputLabel,
  ImageInput,
  Button,
  Loader,
} from './manage-services.styles';

const ManageServices = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    priceLapse: '',
    price: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const { name, description, priceLapse, price } = serviceData;

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);
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

  useEffect(() => {
    // require(`../../../../../backend/public/img/services/${service.image}`).default
    dispatch(fetchServices());
    return () => {
      dispatch(setModalType(null));
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
          <TextAreaInput
            name='description'
            type='text'
            handleChange={handleChange}
            value={description}
            label='Descripción'
            error={uiErrors.errorsOne.description}
            rows={1}
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
              className={selectedFile ? 'selected' : ''}
            >
              {uiErrors.errorsOne.image
                ? uiErrors.errorsOne.image
                : selectedFile
                ? `${selectedFile.name}`
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

      <ServicesSettings loading={loading.fetchLoader ? 'true' : 'false'}>
        <Title>Administrar servicios</Title>
        {loading.fetchLoader ? (
          <Loader />
        ) : (
          servicesData.map(({ _id, ...otherProps }) => (
            <HandleService key={_id} id={_id} {...otherProps}></HandleService>
          ))
        )}
      </ServicesSettings>
    </SettingsContainer>
  );
};

export default ManageServices;
