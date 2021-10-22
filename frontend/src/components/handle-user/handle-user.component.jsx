import React, { useState } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { changeUserRole, deleteUser } from '../../redux/user/userActions';

// COMPONENTS
import CustomButton from '../custom-button/custom-button.component';

// STYLES
import {
  Container,
  UserHeading,
  DetailsTitle,
  Description,
  UserDetails,
  UserInfoContainer,
  UserImage,
  Username,
  ButtonsContainer,
} from './handle-user.styles';

const HandleUser = ({ id, name, email, photo, role }) => {
  // -------------------------------------- STATE AND CONSTANTS ----------------------
  const [deleteLoader, setDeleteLoader] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  // -------------------------------------- USE EFFECT  ----------------------
  // -------------------------------------- HANDLERS ----------------------
  const handleChangeRole = () => {
    if (role === 'admin') {
      dispatch(changeUserRole(id, 'user'));
    } else {
      dispatch(changeUserRole(id, 'admin'));
    }
  };

  const handleDelete = () => {
    setDeleteLoader(true);
    dispatch(deleteUser(id));
  };

  return (
    <>
      <Container>
        <UserHeading>
          <UserImage url={`/img/users/${photo}`} />
          <Username>{name}</Username>
        </UserHeading>
        <UserDetails>
          <UserInfoContainer>
            <DetailsTitle>Email</DetailsTitle>
            <Description>{email}</Description>
          </UserInfoContainer>
          <UserInfoContainer>
            <DetailsTitle>Rol</DetailsTitle>
            <Description>
              {role === 'admin' ? 'Administrador' : 'Usuario'}
            </Description>
          </UserInfoContainer>
        </UserDetails>
        <ButtonsContainer>
          <CustomButton
            primary
            onClick={handleChangeRole}
            loading={loading.firstLoader === `user-${id}` ? 1 : 0}
            disabled={loading.firstLoader === `user-${id}` ? 1 : 0}
          >
            {role === 'admin' ? 'Hacer usuario' : 'Hacer admin'}
          </CustomButton>
          <CustomButton
            danger
            onClick={handleDelete}
            loading={deleteLoader}
            disabled={deleteLoader}
          >
            Eliminar cuenta
          </CustomButton>
        </ButtonsContainer>
      </Container>
    </>
  );
};

export default HandleUser;
