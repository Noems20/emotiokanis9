import React, { useEffect } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, clearUsers } from '../../../redux/user/userActions';
import HandleUser from '../../handle-user/handle-user.component';

// COMPONENTS
import TabLoader from '../../loaders/tab-loader/tab-loader.component';

// STYLES
import { Title } from '../managers.styles.js';
import {
  TabContainerModified,
  ManageItemsModified,
} from './manage-users.styles';

const ManageUsers = ({ id }) => {
  // -------------------------- STATE AND CONSTANTS ---------------
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { users } = useSelector((state) => state.user);

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
    dispatch(fetchUsers(id));
    return () => {
      dispatch(clearUsers());
    };
  }, [dispatch, id]);

  // ------------------------- HANDLERS ---------------------

  return (
    <TabContainerModified
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <ManageItemsModified loading={loading.fetchLoader ? 'true' : 'false'}>
        <Title>Administrar usuarios</Title>
        {loading.fetchLoader ? (
          <TabLoader />
        ) : (
          users.map(({ _id, ...otherProps }) => (
            <HandleUser key={_id} id={_id} {...otherProps}></HandleUser>
          ))
        )}
      </ManageItemsModified>
    </TabContainerModified>
  );
};

export default ManageUsers;
