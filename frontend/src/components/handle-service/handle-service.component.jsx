import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess, clearUiErrors } from '../../redux/ui/uiActions';
import { setModalType } from '../../redux/modal/modalActions';
import {
  deleteService,
  updateService,
} from '../../redux/services/servicesActions';

// COMPONENTS
import Modal from '../modal/modal.component';
import TextInput from '../form-inputs/text-input/text-input.component';
import TextAreaInput from '../form-inputs/textarea-input/textarea-input.component';
import FileInput from '../form-inputs/file-input/file-input.component';

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
  UpdateServiceButton,
} from './handle-service.styles';

const HandleService = ({ id, name, description, priceLapse, price, image }) => {
  const imageSrc = `/img/services/${image}`;
  const [imageHash, setImageHash] = useState(Date.now());
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
  const { uiErrors, loading, success } = useSelector((state) => state.ui);

  useEffect(() => {
    if (success === true && selectedFile) {
      setImageHash(Date.now());
      dispatch(clearSuccess());
    }
  }, [success, selectedFile, dispatch]);

  const handleOpen = () => {
    dispatch(clearUiErrors());
    dispatch(setModalType(`serviceUpdateForm-${id}`));
  };

  const handleClose = () => {
    dispatch(clearUiErrors());
    setServiceData({
      formName: name,
      formDescription: description,
      formPriceLapse: priceLapse ? priceLapse : '',
      formPrice: price,
    });
    setSelectedFile('');
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateService(
        id,
        formName,
        formDescription,
        formPriceLapse,
        formPrice,
        selectedFile
      )
    );
  };

  const handleDelete = () => {
    dispatch(deleteService(id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setServiceData({ ...serviceData, [name]: value });
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // console.log(selectedFile);
  return (
    <>
      <Container>
        <ServiceHeading url={`${imageSrc}?${imageHash}`}>
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
              <Button primary onClick={handleOpen}>
                Editar servicio
              </Button>
              <Button primary danger={true} onClick={handleDelete}>
                Eliminar servicio
              </Button>
            </ButtonsContainer>
          </ServicePrice>
        </ContentContainer>
      </Container>

      <AnimatePresence>
        {modalType === `serviceUpdateForm-${id}` && (
          <Modal handleClose={handleClose}>
            <FormContainer>
              <Title>Actualizar servicio</Title>
              <form onSubmit={handleServiceSubmit}>
                <TextInput
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
                <TextInput
                  name='formPriceLapse'
                  type='text'
                  handleChange={handleChange}
                  value={formPriceLapse}
                  label='Lapso de precio'
                  error={uiErrors.errorsOne.priceLapse}
                />
                <TextInput
                  name='formPrice'
                  type='text'
                  handleChange={handleChange}
                  value={formPrice}
                  label='Precio'
                  error={uiErrors.errorsOne.price}
                />
                <FileInput
                  id='serviceImage'
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
                <UpdateServiceButton
                  type='submit'
                  loading={loading.secondLoader}
                  disabled={loading.firstLoader || loading.secondLoader}
                  primary
                >
                  Actualizar servicio
                </UpdateServiceButton>
              </form>
            </FormContainer>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default HandleService;
