import React from "react";
import { COLORS, FONT_FAMILY } from "./constants";

interface Category {
  id: string;
  label: string;
  color: string;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <button
          key={category.id}
          style={{
            ...styles.categoryChip,
            backgroundColor: selectedCategory === category.id 
              ? category.color 
              : COLORS.SECONDARY,
            color: selectedCategory === category.id 
              ? COLORS.SECONDARY 
              : COLORS.TEXT_PRIMARY,
            borderColor: category.color,
          }}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
  },
  categoryChip: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid',
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: 'none',
  },
};
