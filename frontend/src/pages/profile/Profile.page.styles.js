import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PageGrid,
  TitleSm,
  Sidebar,
  SidebarContainer,
  SidebarItem,
  SidebarContent,
  SidebarText,
} from '../../components/general.styles';

export const Grid = styled(PageGrid)``;

export const Container = styled.div`
  grid-column: center-start / center-end;
  margin: 4rem 0;
  overflow: hidden;
  min-height: 100vh;
  border-radius: 3px;
  box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);

  display: grid;
  grid-template-columns: 0.35fr 1fr;
`;

export const SideBar = styled(Sidebar)``;

export const SideBarContainer = styled(SidebarContainer)``;

export const SideBarItem = styled(SidebarItem)``;

export const SideBarContent = styled(SidebarContent)``;

export const SideBarText = styled(SidebarText)``;

export const Content = styled.div`
  /* width: 100%; */
  margin: 7rem 0;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content 1fr;
`;

export const AccountSettings = styled.div`
  padding: 0 18rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
  align-items: start;
  align-content: start;

  & form {
    display: grid;
    grid-gap: 4.5rem;
  }
`;

export const Title = styled(TitleSm)`
  justify-self: start;
  font-size: 2.6rem;
  text-transform: uppercase;
`;

export const Line = styled.div`
  margin: 6rem 0;
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

export const ChangeImage = styled.div`
  display: flex;
  align-items: center;
`;

export const UserImage = styled.img`
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 50%;
  margin-right: 2rem;
`;

export const ImageButton = styled(Link)`
  color: var(--color-primary);
  font-size: 1.5rem;
  /* display: inline-block; */
  text-decoration: none;
  border-bottom: 1px solid var(--color-primary);
  padding: 3px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
`;
