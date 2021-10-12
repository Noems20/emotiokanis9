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
  Price,
  ButtonsContainer,
  Button,

  // Form styles
  FormContainer,
  Title,
  UpdateServiceButton,
} from './handle-award.styles';

const HandleAward = ({ id, name, description, date, image }) => {
  const imageSrc = `/img/awards/${image}`;
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [imageHash, setImageHash] = useState(Date.now());
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState({
    formName: name,
    formDescription: description,
    formDate: date,
  });

  const [selectedFile, setSelectedFile] = useState('');

  const { formName, formDescription, formDate } = serviceData;

  const dispatch = useDispatch();
  const { uiErrors, loading, success } = useSelector((state) => state.ui);

  useEffect(() => {
    if (success === true && selectedFile) {
      setImageHash(Date.now());
      dispatch(clearSuccess());
    }
  }, [success, selectedFile, dispatch]);

  const handleOpen = () => {
    dispatch(clearUiErrors());
    setModalOpen(true);
  };

  const handleClose = () => {
    dispatch(clearUiErrors());
    setServiceData({
      formName: name,
      formDescription: description,
      formDate: date,
    });
    setSelectedFile('');
    setModalOpen(false);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateService(id, formName, formDescription, formDate, selectedFile)
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
            <PriceTitle>Fecha</PriceTitle>
            <Price>{date}</Price>
            <ButtonsContainer>
              <Button primary onClick={handleOpen}>
                Editar premio
              </Button>
              <Button
                danger
                loading={deleteLoader}
                onClick={handleDelete}
                disabled={deleteLoader}
              >
                Eliminar premio
              </Button>
            </ButtonsContainer>
          </ServicePrice>
        </ContentContainer>
      </Container>

      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={handleClose}>
            <FormContainer>
              <Title>Actualizar premio</Title>
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
                  name='formDate'
                  type='text'
                  handleChange={handleChange}
                  value={formDate}
                  label='Fecha'
                  error={uiErrors.errorsOne.date}
                />
                <FileInput
                  id='awardImage'
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
                <UpdateServiceButton
                  type='submit'
                  loading={loading.secondLoader}
                  disabled={loading.firstLoader || loading.secondLoader}
                  primary
                >
                  Actualizar premio
                </UpdateServiceButton>
              </form>
            </FormContainer>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default HandleAward;
