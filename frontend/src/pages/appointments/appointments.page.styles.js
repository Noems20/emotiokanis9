import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  Sidebar,
  SidebarContainer,
  SidebarContent,
  SidebarItem,
  SidebarText,
} from '../../components/general.styles';

export const Grid = styled(motion.div)`
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns:
    [sidebar-start] 25rem [sidebar-end full-start] minmax(6rem, 1fr)
    [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];

  grid-template-rows: calc(100vh - 8rem);

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media only screen and (max-width: 1200px) {
    grid-template-columns:
      [full-start] minmax(6rem, 1fr)
      [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
      [center-end] minmax(6rem, 1fr) [full-end];
    grid-template-rows: min-content 1fr;
  }
`;

export const SideBar = styled(Sidebar)`
  grid-column: sidebar-start / sidebar-end;
  border-radius: 0 0 10px 0;

  @media only screen and (max-width: 1200px) {
    grid-column: full-start / full-end;
    border-radius: 0 0 10px 10px;
  }
`;

export const SideBarContainer = styled(SidebarContainer)``;

export const SideBarItem = styled(SidebarItem)``;

export const SideBarContent = styled(SidebarContent)``;

export const SideBarText = styled(SidebarText)``;
