import { createSelector } from 'reselect';

const selectModal = (state) => state.modal;

export const selectModalType = createSelector(
  [selectModal],
  (modal) => modal.modalType
);
