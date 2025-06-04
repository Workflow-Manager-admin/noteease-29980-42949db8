import React from "react";
import { COLORS, FONT_FAMILY } from "./constants";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={styles.searchContainer}>
      <div style={styles.searchIcon}>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={COLORS.TEXT_SECONDARY}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.searchInput}
      />
      {searchTerm && (
        <button 
          onClick={() => onSearchChange('')}
          style={styles.clearButton}
          aria-label="Clear search"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={COLORS.TEXT_SECONDARY}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  searchContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: '15px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px',
    fontSize: '16px',
    borderRadius: '8px',
    border: `1px solid ${COLORS.DIVIDER}`,
    backgroundColor: COLORS.SECONDARY,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: FONT_FAMILY,
    outline: 'none',
    boxSizing: 'border-box',
  },
  clearButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
  },
};
