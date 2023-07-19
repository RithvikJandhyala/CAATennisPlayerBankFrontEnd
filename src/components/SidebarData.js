import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as B from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as FaIcons from 'react-icons/fa';


export const SidebarData = [
  {
    title: (localStorage.role != 'Admin' )? 'My Players':' ',
    path: '/home',
    icon:    (localStorage.role != 'Admin' )? <AiIcons.AiOutlineUser />:<></>,
    cName: (localStorage.role != 'Admin' )? 'nav-text':' '
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
    title: 'Team Standings',
    path: '/team-standing',
    icon:  <BsIcons.BsTrophy/>,
    cName: 'nav-text'
  },
  {
    title: (localStorage.role == 'Admin' )? 'User Management':' ',
    path: '/all-users',
    icon:  (localStorage.role == 'Admin' )? <HiIcons.HiOutlineUserCircle />:<></>,
    cName: (localStorage.role == 'Admin' )? 'nav-text':' '
  },
  {
    title: (localStorage.role == 'Admin' )? 'Schools':' ',
    path: '/schools',
    icon:  (localStorage.role == 'Admin' )? <FaIcons.FaSchool/>:<></>,
    cName: (localStorage.role == 'Admin' )? 'nav-text':' '
  },
  
];
