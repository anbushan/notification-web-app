import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link ,useLocation} from 'react-router-dom';
import logoImg from '../Assets/144.png';
import { useTranslation } from 'react-i18next';


const SidebarComponent = ({ sidebarItems, onClick }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;
      if (item.children && item.children.length > 0) {
        return (
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => {
                if (level === 0 || level === 1) {
                  return {
                    backgroundColor: active ? "blue" : undefined,
                    color: active ? "white" : undefined,
                    "&:hover": {
                      backgroundColor: "blue",
                      color: "white",
                    },
                  };
                }
              },
            }}
          >
            <SubMenu
              className="textDecoration-none"
              active={isActive}
              rootStyles={{
                backgroundColor: "white",
                color: "black",
                ":hover": {
                  color: "white",
                },
              }}
              key={item.id}
              title={item.label}
              label={item.label}
              icon={item.icon}
            >
              {renderMenuItems(item.children)}
            </SubMenu>
          </Menu>
        );
      } else {
        return(
        <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0 || level === 1) {
              return {
                backgroundColor: active ? "#5046E5" : undefined,
                color: active ? "white" : undefined,
                "&:hover": {
                  backgroundColor: "#5046E5",
                  color: "#fff",
                },
              };
            }
          },
        }}
      >
        <Link className="textDecoration-none" to={item.url}>
          <MenuItem
            onClick={onClick}
            className="textDecoration-none mt-1 mb-1 fs-15"
            active={isActive}
            rootStyles={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "15px",
              ":hover": {
                color: "black",
                backgroundColor: "blue",
              },
            }}
            hoverStyles={{
              color: "white",
              backgroundColor: "blue",
            }}
            key={item.id}
            icon={item.icon}
          >
            {t(`${item.label}` )}
          </MenuItem>
        </Link>
      </Menu>
    );
  }
});
}
  return (
    <div className="mt-3" style={{ width: '100%' }}>
      <div className="text-center">
        <a href="/">
          <img alt="logo" src={logoImg} width={'100px'} height={'100px'} />
        </a>
      </div>

      <Sidebar
        rootStyles={{
          backgroundColor: 'white',
          color: 'black',
          fontWeight: 'bolder',
          borderColor: 'white',
          borderRadius: '15px',
          marginTop: '30px',
          width: '100%', // Default width for large screens
        }}
      >
        <Menu iconShape="circle">{renderMenuItems(sidebarItems)}</Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;