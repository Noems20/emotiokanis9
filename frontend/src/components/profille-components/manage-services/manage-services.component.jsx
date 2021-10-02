import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { updateMe, updateMyPassword } from '../../../redux/user/userActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import FormInput from '../../form-input/form-input.component';

// STYLES
import {
  SettingsContainer,
  Settings,
  Title,
  Line,
  ChangeImage,
  UserImage,
  ImageInputLabel,
  ImageInput,
  Button,
} from './manage-services.styles';

const ManageServices = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    priceLapse: '',
    price: '',
  });
  const [userPhoto, setUserPhoto] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const { name, description, priceLapse, price } = serviceData;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
    try {
      setUserPhoto(
        require(`../../../../../backend/public/img/users/${user.photo}`).default
      );
    } catch {
      setUserPhoto(require(`../../../public/img/users/default.jpg`).default);
    }

    return () => {
      dispatch(clearUiErrors());
    };
  }, [user, dispatch]);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setSelectedFile('');
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
        <form onSubmit={handleDetailsSubmit}>
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
            error={uiErrors.errorsOne.name}
          />
          <FormInput
            name='priceLapse'
            type='text'
            handleChange={handleChange}
            value={priceLapse}
            label='Lapso de precio'
            error={uiErrors.errorsOne.name}
          />
          <FormInput
            name='price'
            type='text'
            handleChange={handleChange}
            value={price}
            label='Precio'
            error={uiErrors.errorsOne.email}
          />
          <ChangeImage>
            <UserImage src={userPhoto} />
            <ImageInputLabel htmlFor='photo'>Cambiar foto</ImageInputLabel>
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
    </SettingsContainer>
  );
};

export default ManageServices;
