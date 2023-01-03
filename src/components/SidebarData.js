import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
//import * as IoIcons from 'react-icons/io';
import * as B from 'react-icons/md';

import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';



export const SidebarData = [
  {
    title: 'My Players',
    path: '/home',
    icon:  <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'All Players',
    path: '/all-players',
    icon:  <RiIcons.RiTeamLine />,
    cName: 'nav-text'
  },
  {
    title: 'Past Matches',
    path: '/past-matches',
    icon: <GiIcons.GiTennisCourt />,
    cName: 'nav-text'
  },
  {
    title: 'Matches Summary',
    path: '/matches-summary',
    icon: <B.MdSportsTennis/>,
    cName: 'nav-text'
  },
  {
    title: 'Team Standing',
    path: '/team-standing',
    icon:  <BsIcons.BsTrophy/>,
    cName: 'nav-text'
  },
  
];
