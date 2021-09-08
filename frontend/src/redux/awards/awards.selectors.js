import { createSelector } from 'reselect';

const selectAwards = (state) => state.awards;

export const selectCurrentAwards = createSelector(
  [selectAwards],
  (awards) => awards.cardInfo
);
