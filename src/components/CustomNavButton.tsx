import React from 'react';
import styled from 'styled-components';
import { LucideIcon } from 'lucide-react';

interface CustomNavButtonProps {
  text: string;
  icon?: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const CustomNavButton: React.FC<CustomNavButtonProps> = ({ text, icon: Icon, isActive, onClick }) => {
  return (
    <StyledWrapper $isActive={isActive} onClick={onClick}>
      <button className="button" type="button">
        {text}
        {/* We render the dynamic icon here instead of the hardcoded SVG arrow */}
        {Icon && <Icon className="icon" />}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $isActive?: boolean }>`
  .button {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    
    /* Logic: Use Blue if active, otherwise Dark to match website */
    background-color: ${props => props.$isActive ? 'rgb(0 107 179)' : '#171717'};
    
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    
    /* Border: Blue if active, faint white if inactive */
    border: 3px solid ${props => props.$isActive ? '#ffffff4d' : '#ffffff1a'};
    
    outline: none;
    overflow: hidden;
    font-size: 15px;
    cursor: pointer;
  }

  .icon {
    width: 20px; /* Adjusted slightly to match text */
    height: 20px;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
    border-color: #fff9;
    /* On hover, we can slightly brighten the background if it's inactive */
    background-color: ${props => props.$isActive ? 'rgb(0 107 179)' : '#262626'};
  }

  .button:hover .icon {
    /* Moves the icon slightly to the right on hover */
    transform: translate(4px);
  }

  .button:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }

    60% {
      left: 100%;
    }

    to {
      left: 100%;
    }
  }
`;

export default CustomNavButton;