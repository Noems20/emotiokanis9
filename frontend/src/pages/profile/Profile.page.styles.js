import styled from 'styled-components';
import {
  PageGrid,
  Sidebar,
  SidebarContainer,
  SidebarItem,
  SidebarContent,
  SidebarText,
  SidebarAdminItems,
  SidebarAdmin,
  SidebarAdminText,
  TitleSm,
} from '../../components/general.styles';

export const Grid = styled(PageGrid)``;

export const Container = styled.div`
  grid-column: center-start / center-end;
  margin: 4rem 0;
  overflow: hidden;
  height: 107rem;
  border-radius: 3px;
  box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);
  -webkit-box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);
  -moz-box-shadow: 0px 0px 8px 2px var(--color-grey-light-4);

  display: grid;
  grid-template-columns: 0.42fr 1fr;

  @media only screen and (max-width: 1200px) {
    height: auto;
    min-height: calc(100vh - 8rem);
    margin-top: 0;
    grid-column: full-start / full-end;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr;

    border-radius: 0px;
  }
`;

export const SideBar = styled(Sidebar)`
  @media only screen and (min-width: 1200px) {
    min-width: 33.5rem;
  }
`;

export const SideBarContainer = styled(SidebarContainer)``;

export const SideBarAdmin = styled(SidebarAdmin)``;

export const SideBarAdminItems = styled(SidebarAdminItems)``;

export const SideBarAdminText = styled(SidebarAdminText)``;

export const SideBarItem = styled(SidebarItem)``;

export const SideBarContent = styled(SidebarContent)``;

export const SideBarText = styled(SidebarText)``;

export const Content = styled.div`
  /* width: 100%; */
  overflow: auto;
  margin: 7rem 0;
  position: relative;
`;

export const SoonText = styled(TitleSm)`
  display: block;
  font-size: 5rem;
`;
