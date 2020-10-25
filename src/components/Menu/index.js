import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import MouseTooltip from "react-sticky-mouse-tooltip";

const navItems = [
  {
    key: "1",
    title: "Helias",
    description: ["Brand Strategy", "Brand Design", "Interactive"],
    cursor_image:
      "https://images.freeimages.com/images/large-previews/1d4/landscape-1408578.jpg",
  },
  {
    key: "2",
    title: "Hoboken yogi",
    description: [
      "Interactive",
      "Brand Strategy",
      "Brand Design",
      "Interactive",
      "Front-end",
    ],
    cursor_image:
      "https://images.freeimages.com/images/large-previews/c85/noite-belo-horizonte-mg-02-1495661.jpg",
  },
  {
    key: "3",
    title: "Buzzworthy",
    description: ["User Experience", "Brand Design", "Front-end"],
    cursor_image:
      "https://images.freeimages.com/images/large-previews/729/noite-em-belo-horizonte-mg-0-1495658.jpg",
  },
  {
    key: "4",
    title: "Gatto",
    description: ["Brand Strategy", "Brand Design", "Interactive", "Front-end"],
    cursor_image:
      "https://images.freeimages.com/images/large-previews/47e/noite-belo-horizonte-mg-01-1495654.jpg",
  },
  {
    key: "5",
    title: "Snooze",
    description: [
      "User Experience",
      "Interactive",
      "Brand Design",
      "Front-end",
    ],
    cursor_image:
      "https://images.freeimages.com/images/large-previews/22f/elogio-del-horizonte-1561178.jpg",
  },
];

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu">
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <MenuContent isOpen={isOpen} />
    </div>
  );
}

function MenuButton(props) {
  return (
    <div
      onClick={props.onClick}
      className={classnames("menu__button", {
        "menu__button-open": props.isOpen,
      })}
    >
      {props.isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </div>
  );
}

function MenuContent(props) {
  const [selectedNavItemId, setSelectedNavItem] = useState(-1);
  const [transition, setTransition] = useState(false);
  const isNavItemSelected = selectedNavItemId >= 0;

  return (
    <div
      className={classnames("menu__content", {
        "menu__content-open": props.isOpen,
      })}
    >
      <div>
        <div className="menu__content_small-colmun">
          <ul
            className={classnames("menu__content_description-list", {
              animate: transition,
            })}
          >
            {isNavItemSelected ? (
              navItems[selectedNavItemId].description.map((desc) => (
                <li key={desc + Math.random()}>{desc}</li>
              ))
            ) : (
              <li className="transition">Service</li>
            )}
          </ul>

          {isNavItemSelected ? (
            <p className={classnames({ animate: transition })}>
              {("0" + (selectedNavItemId + 1)).slice(-2)}
            </p>
          ) : (
            <p className="inactive">05</p>
          )}
        </div>

        <div className="menu__content_nav-colmun">
          <ul>
            {navItems.map(({ key, title }, index) => (
              <NavItem
                key={key}
                title={title}
                index={index}
                setTransition={setTransition}
                setSelectedNavItem={setSelectedNavItem}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function NavItem(props) {
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);

  return (
    <li
      onMouseOver={() => {
        setMouseTooltipVisible(true);
        props.setTransition(true);
        props.setSelectedNavItem(props.index);
      }}
      onMouseLeave={() => {
        setMouseTooltipVisible(false);
        props.setTransition(false);
        props.setSelectedNavItem(-1);
      }}
      className="nav-item"
    >
      <MouseTooltip visible={isMouseTooltipVisible}>
        <img src={navItems[props.index].cursor_image} alt="mouse tooltip img" />
      </MouseTooltip>
      <p>{props.title}</p>
    </li>
  );
}

MenuButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

MenuContent.propTypes = {
  isOpen: PropTypes.bool,
};

NavItem.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  setTransition: PropTypes.func,
  setSelectedNavItem: PropTypes.func,
};

export default Menu;
