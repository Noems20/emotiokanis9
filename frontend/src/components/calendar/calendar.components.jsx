import React from 'react';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';

// STYLES
import {
  CalendarWrapper,
  ChildrenContainer,
  CalendarMonthHeader,
  CalendarMonthTitle,
  CalendarArrowButton,
} from './calendar.styles';

// ICONS
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const CalendarContainer = ({ children, className }) => {
  return (
    <CalendarWrapper className={className}>
      <ChildrenContainer>{children}</ChildrenContainer>
    </CalendarWrapper>
  );
};

export const CustomMonthHeader = (
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
) => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  return (
    <CalendarMonthHeader>
      <CalendarArrowButton
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <FaChevronLeft />
      </CalendarArrowButton>
      <CalendarMonthTitle>{`${months[getMonth(date)]} de ${getYear(
        date
      )}`}</CalendarMonthTitle>

      <CalendarArrowButton
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <FaChevronRight />
      </CalendarArrowButton>
    </CalendarMonthHeader>
  );
};
