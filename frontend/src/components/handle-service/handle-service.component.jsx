import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setModalType } from '../../redux/modal/modalActions';

// COMPONENTS
import Modal from '../modal/modal.component';
import FormInput from '../form-input/form-input.component';
import TextAreaInput from '../text-area-input/text-area-input.component';

// STYLES
import {
  Container,
  ServiceHeading,
  ServiceTitle,
  ContentContainer,
  ServiceDescription,
  DescriptionTitle,
  Description,
  ServicePrice,
  PriceTitle,
  PriceLapse,
  Price,
  ButtonsContainer,
  Button,

  // Form styles
  FormContainer,
  Title,
  ChangeImage,
  ImageInputLabel,
  ImageInput,
} from './handle-service.styles';

const HandleService = ({ id, name, description, priceLapse, price, image }) => {
  const [serviceData, setServiceData] = useState({
    formName: name,
    formDescription: description,
    formPriceLapse: priceLapse ? priceLapse : '',
    formPrice: price,
  });

  const [selectedFile, setSelectedFile] = useState('');

  const { formName, formDescription, formPriceLapse, formPrice } = serviceData;

  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.modal);
  const { uiErrors, loading } = useSelector((state) => state.ui);

  useEffect(() => {
    return function cleanup() {
      dispatch(setModalType(null));
    };
  }, [dispatch]);

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    // dispatch(createService(formName, formDescription, formPriceLapse, formPrice, selectedFile));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setServiceData({ ...serviceData, [name]: value });
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <Container>
        <ServiceHeading
          url={
            require(`../../../../backend/public/img/services/${image}`).default
          }
        >
          <ServiceTitle>{name}</ServiceTitle>
        </ServiceHeading>
        <ContentContainer>
          <ServiceDescription>
            <DescriptionTitle>Descripción</DescriptionTitle>
            <Description>{description}</Description>
          </ServiceDescription>
          <ServicePrice>
            <PriceTitle>Precio</PriceTitle>
            {priceLapse && <PriceLapse>{priceLapse}</PriceLapse>}

            <Price>${price}</Price>
            <ButtonsContainer>
              <Button
                primary
                onClick={() =>
                  dispatch(setModalType(`serviceUpdateForm-${id}`))
                }
              >
                Editar servicio
              </Button>
              <Button primary danger={true}>
                Eliminar servicio
              </Button>
            </ButtonsContainer>
          </ServicePrice>
        </ContentContainer>
      </Container>

      {modalType === `serviceUpdateForm-${id}` && (
        <Modal>
          <FormContainer initial={{ y: '-100vh' }} animate={{ y: 0 }}>
            <Title>Actualizar servicio</Title>
            <form onSubmit={handleServiceSubmit}>
              <FormInput
                name='formName'
                type='text'
                handleChange={handleChange}
                value={formName}
                label='Nombre'
                error={uiErrors.errorsOne.name}
              />
              <TextAreaInput
                name='formDescription'
                type='text'
                handleChange={handleChange}
                value={formDescription}
                label='Descripción'
                error={uiErrors.errorsOne.description}
                rows={3}
              />
              <FormInput
                name='formPriceLapse'
                type='text'
                handleChange={handleChange}
                value={formPriceLapse}
                label='Lapso de precio'
                error={uiErrors.errorsOne.priceLapse}
              />
              <FormInput
                name='formPrice'
                type='text'
                handleChange={handleChange}
                value={formPrice}
                label='Precio'
                error={uiErrors.errorsOne.price}
              />
              <ChangeImage>
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
                Actualizar servicio
              </Button>
            </form>
          </FormContainer>
        </Modal>
      )}
    </>
  );
};

export default HandleService;
