import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { MENU_ENTRY_HEIGHT } from "../config";
import { LinkLabel, LinkStatus as LinkStatusComponent, CategoryEntry } from "./CategoryEntry";
import { LinkStatus, PushedProps } from "../types";
import { ArrowDropDownIcon, ArrowDropUpIcon, ChevronDownIcon, ChevronUpIcon } from "../../../components/Svg";

interface Props extends PushedProps {
  label: string;
  status?: LinkStatus;
  icon: React.ReactElement;
  initialOpenState?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`;

const MenuItemWrap = styled.div<{ isOpen: boolean;}>`
background-color: ${({ isOpen }) => (isOpen ? "#21252b" : "#21252b")};
overflow: hidden;
border-radius: ${({ isOpen }) => (isOpen ? "0.25rem 0.25rem 0 0" : "0.25rem")};
-webkit-transition: background-color .3s;
transition: background-color .3s;
margin-top: 4px;
`

const ArrowWrapper = styled.div`
display: inline-flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
white-space: nowrap;
transition: all 0.1s ease 0s;
appearance: none;
border: none;
letter-spacing: 0.5px;
cursor: pointer;
user-select: none;
border-radius: 50%;
font-family: "Geogrotesque Wide", sans-serif;
font-weight: 700;
font-style: normal;
font-size: 13px;
text-transform: uppercase;
background: #1a1e23;
height: 28px;
width: 30px;
padding: 0px;
position: relative;
left: 13px;
margin-left: auto;
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  background-color: ${({ isOpen }) => (isOpen ? "#1a1e23" : "transparent")};
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "#1a1e23" : "transparent")};
  border-style: solid;
  border-width: 0px 0;
  height: auto;
  border-radius: 0 0 0.25rem 0.25rem;
`;

const Accordion: React.FC<Props> = ({
  label,
  status,
  icon,
  isPushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState);
    } else {
      pushNav(true);
      setIsOpen(true);
    }
  };

  return (
    <Container>
      <MenuItemWrap isOpen={isOpen}>
      <CategoryEntry onClick={handleClick} className={className} isActive={isActive} role="button">
        {icon}
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {status && (
          <LinkStatusComponent color={status.color}>
         {icon} {status.text}
          </LinkStatusComponent>
        )}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </CategoryEntry>
      </MenuItemWrap>

      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        
     {children}
      </AccordionContent>
    </Container>
  );
};

export default Accordion;
