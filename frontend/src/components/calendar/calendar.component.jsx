import React from 'react';
import DatePicker from 'react-datepicker';

import {
  GroupContainer,
  CalendarContainer,
  ErrorText,
} from './calendar.styles';

const Calendar = ({ className, error, ...props }) => {
  return (
    <GroupContainer className={className}>
      <CalendarContainer error={error ? 1 : 0}>
        <DatePicker {...props} />
      </CalendarContainer>

      {error ? <ErrorText>{error}</ErrorText> : null}
    </GroupContainer>
  );
};

export default Calendar;
