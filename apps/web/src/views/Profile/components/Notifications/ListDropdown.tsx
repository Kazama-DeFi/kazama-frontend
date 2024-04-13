import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { styled } from 'styled-components';
import { CloseIcon } from '@kazamaswap/uikit';

interface NotificationsDropdownProps {
  notifications: string[];
}

const Container = styled.div`
  position: relative;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 349px;
  z-index: 49999;
  margin-left: -1px;
  margin-bottom: -1px;
  bottom: 100%;
  background: #21252b;
  border: 1px solid rgba(0, 0, 0, 0.35);
`;

const DropdownTop = styled.div`
  background-color: #1a1e23;
  padding: 15px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
`;

const ListDropdown: React.FC<NotificationsDropdownProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (dropdownRef.current && !(dropdownRef.current.contains(event.target as Node))) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
        {isOpen && (
            <Dropdown ref={dropdownRef} isOpen={isOpen}>
                <DropdownTop>
                    Notifications
                    <CloseButton onClick={() => setIsOpen(false)} />
                </DropdownTop>
                <div>
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={index} style={{ padding: '10px 15px', borderBottom: '1px solid #333' }}>
                                {notification}
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '10px 15px' }}>
                            No notifications
                        </div>
                    )}
                </div>
            </Dropdown>
        )}
    </Container>
);
};

export default ListDropdown;