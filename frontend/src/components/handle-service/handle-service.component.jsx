import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess, clearUiErrors } from '../../redux/ui/uiActions';
import {
  deleteService,
  updateService,
} from '../../redux/services/servicesActions';

// COMPONENTS
import Modal from '../modal/modal.component';
import TextInput from '../form-inputs/text-input/text-input.component';
import TextAreaInput from '../form-inputs/textarea-input/textarea-input.component';
import FileInput from '../form-inputs/file-input/file-input.component';
import CustomButton from '../custom-button/custom-button.component';

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
  // Form styles
  FormContainer,
  Title,
  UpdateServiceButton,
} from './handle-service.styles';

const HandleService = ({ id, name, description, priceLapse, price, image }) => {
  // -------------------------------------- STATE AND CONSTANTS ----------------------
  const imageSrc = `/img/services/${image}`;
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [imageHash, setImageHash] = useState(Date.now());
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState({
    formName: name,
    formDescription: description,
    formPriceLapse: priceLapse ? priceLapse : '',
    formPrice: price,
  });

  const [selectedFile, setSelectedFile] = useState('');

  const { formName, formDescription, formPriceLapse, formPrice } = serviceData;

  const dispatch = useDispatch();
  const { uiErrors, loading, success } = useSelector((state) => state.ui);

  // -------------------------------------- USE EFFECT  ----------------------
  useEffect(() => {
    if (success === true && selectedFile) {
      setImageHash(Date.now());
      dispatch(clearSuccess());
    }
  }, [success, selectedFile, dispatch]);

  // -------------------------------------- HANDLERS ----------------------

  const handleOpen = () => {
    dispatch(clearUiErrors());
    setModalOpen(true);
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
    setModalOpen(false);
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
    setDeleteLoader(true);
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
              <CustomButton primary onClick={handleOpen}>
                Editar servicio
              </CustomButton>
              <CustomButton
                danger
                loading={deleteLoader}
                onClick={handleDelete}
                disabled={deleteLoader}
              >
                Eliminar servicio
              </CustomButton>
            </ButtonsContainer>
          </ServicePrice>
        </ContentContainer>
      </Container>

      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={handleClose}>
            <FormContainer>
              <form onSubmit={handleServiceSubmit}>
              <Title>Actualizar servicio</Title>
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
