import React from "react";
import { COLORS } from "./constants";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button 
      style={styles.fabButton} 
      onClick={onClick}
      aria-label="Add new note"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fabButton: {
    position: 'absolute',
    right: '30px',
    bottom: '30px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: COLORS.ACCENT,
    color: COLORS.SECONDARY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
