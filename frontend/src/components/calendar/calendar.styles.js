import styled from 'styled-components';
import tokens from '../../tokens';

// ------------------------------------------------
// CALENDAR CONTAINER STYLES
// ------------------------------------------------

const errorColor = '#ff3333';

export const GroupContainer = styled.div`
  justify-self: center;
`;

export const CalendarContainer = styled.div`
  border-top: none;
  border-radius: 10px;
  box-shadow: ${({ error }) =>
    error
      ? `0px 0px 8px 1px ${errorColor}`
      : `0px 0px 8px 1px var(--color-grey-light-4)`};
  -webkit-box-shadow: ${({ error }) =>
    error
      ? `0px 0px 8px 1px ${errorColor}`
      : `0px 0px 8px 1px var(--color-grey-light-4)`};
  -moz-box-shadow: ${({ error }) =>
    error
      ? `0px 0px 8px 1px ${errorColor}`
      : `0px 0px 8px 1px var(--color-grey-light-4)`};
  overflow: hidden;

  & div div.react-datepicker {
    font-family: ${tokens.fontDisplay};
    border: none;
    border-radius: 0;
    display: block;
  }
`;

export const ErrorText = styled.p`
  text-align: center;
  color: ${errorColor};
  font-size: 1.4rem;
  margin-left: 5px;
  margin-top: 1rem;

  @media only screen and (max-width: 700px) {
    font-size: 1.6rem;
  }

  @media only screen and (max-width: 430px) {
    font-size: 1.8rem;
  }
`;

// ------------------------------------------------
// CALENDAR STYLES
// ------------------------------------------------

export const CalendarWrapper = styled.div``;

export const ChildrenContainer = styled.div`
  & * {
    border-radius: 0 !important;
  }

  @media only screen and (max-width: 430px) {
    display: grid;
    grid-template-rows: max-content max-content;
  }

  // HEADER
  & div.react-datepicker__header--custom {
    padding: 1.5rem;
    padding-bottom: 1rem;
    background-color: var(--color-primary);
    border: none;
    border-radius: 0;

    display: grid;
    grid-gap: 1rem;

    & * {
      color: white;

      @media only screen and (max-width: 430px) {
        font-size: 2.5rem;
      }
    }
  }

  & div.react-datepicker__header--time {
    background-color: var(--color-primary);
    border: none;

    & div {
      color: #fff;
      font-size: 1.4rem;

      @media only screen and (max-width: 430px) {
        font-size: 2.5rem;
      }
    }
  }
  // ------------------------------------------------
  // MONTH
  // ------------------------------------------------

  & div.react-datepicker__month {
    height: 100%;
    margin: 0;
    border-right: 1px solid var(--color-grey-light-4);
  }

  & div.react-datepicker__month-container {
    /* background-color: blue; */

    display: grid;
    /* grid-gap: 1rem; */
    grid-template-rows: min-content 1fr;
  }
  // ------------------------------------------------
  // DAY
  // ------------------------------------------------

  & div.react-datepicker__day,
  div.react-datepicker__day-name {
    font-size: 1.6rem;
    font-weight: 300;
    width: 3rem;
    margin: 0.4rem;

    @media only screen and (max-width: 430px) {
      font-size: 2.5rem;
      width: 4.4rem;
      margin: 1rem;
    }
  }

  & div.react-datepicker__day-name {
    padding-bottom: 3px;
  }

  & div.react-datepicker__day {
    padding: 0.7rem 0;
    height: 3rem;

    &.react-datepicker__day--selected {
      background-color: var(--color-primary);
    }

    @media only screen and (max-width: 430px) {
      height: 4.4rem;
      padding: 1.3rem 0;
    }
  }

  // ------------------------------------------------
  // TIME
  // ------------------------------------------------

  & div.react-datepicker__time-container {
    font-size: 1.6rem;
    border: none;
    width: 11rem;

    & div.react-datepicker__time {
      & .react-datepicker__time-box {
        width: auto;
        @media only screen and (max-width: 430px) {
          margin: 0;
          width: 100%;
        }
      }

      & .react-datepicker__time-box ul.react-datepicker__time-list {
        overflow: auto;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
          display: none;
        }

        & li.react-datepicker__time-list-item {
          height: auto;
          border-bottom: 1px solid var(--color-grey-light-2);

          @media only screen and (max-width: 430px) {
            font-size: 2.5rem;
          }
        }

        & li.react-datepicker__time-list-item--selected {
          background-color: var(--color-primary);
        }

        & li.react-datepicker__time-list-item--disabled {
          display: none;
        }
      }
    }

    @media only screen and (max-width: 430px) {
      width: 100%;
      /* max-height: 25rem; */
    }
  }
`;

// ------------------------------------------------
// CALENDAR MONTH HEADER
// ------------------------------------------------

export const CalendarMonthHeader = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: min-content 1fr min-content;
  justify-content: center;
  align-items: center;
`;

export const CalendarMonthTitle = styled.h3`
  font-family: ${tokens.fontDisplay};
  font-size: 1.5rem;
  color: #fff;
`;

export const CalendarArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  display: flex;
  align-content: center;

  & {
    color: #fff;
  }
`;
