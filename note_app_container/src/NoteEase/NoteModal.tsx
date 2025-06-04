import React, { useState, useEffect } from "react";
import { COLORS, FONT_FAMILY } from "./constants";
import { Note } from "./NoteEase";

interface Category {
  id: string;
  label: string;
  color: string;
}

interface NoteModalProps {
  note: Note | null;
  visible: boolean;
  onClose: () => void;
  onSave: (note: Note, isNew: boolean) => void;
  categories: Category[];
}

export const NoteModal: React.FC<NoteModalProps> = ({
  note,
  visible,
  onClose,
  onSave,
  categories,
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const isNewNote = !note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    } else {
      setTitle('');
      setContent('');
      setCategory(categories[0].id);
    }
  }, [note, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedNote: Note = {
      id: note ? note.id : '',
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: note ? note.createdAt : new Date(),
      updatedAt: new Date(),
    };
    
    onSave(updatedNote, isNewNote);
  };

  if (!visible) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{isNewNote ? 'Create Note' : 'Edit Note'}</h2>
          <button 
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Close modal"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Note title"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="category" style={styles.label}>Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
              required
            >
              {categories.slice(1).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="content" style={styles.label}>Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              placeholder="Note content"
              rows={10}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={onClose} 
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.saveButton}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalHeader: {
    padding: '15px 20px',
    borderBottom: `1px solid ${COLORS.DIVIDER}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '20px',
    color: COLORS.TEXT_PRIMARY,
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    color: COLORS.TEXT_SECONDARY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: COLORS.TEXT_PRIMARY,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: `1px solid ${COLORS.DIVIDER}`,
    fontFamily: FONT_FAMILY,
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: `1px solid ${COLORS.DIVIDER}`,
    fontFamily: FONT_FAMILY,
    boxSizing: 'border-box',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: `1px solid ${COLORS.DIVIDER}`,
    fontFamily: FONT_FAMILY,
    resize: 'vertical',
    minHeight: '120px',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px',
  },
  cancelButton: {
    padding: '10px 16px',
    backgroundColor: COLORS.SECONDARY,
    color: COLORS.TEXT_PRIMARY,
    border: `1px solid ${COLORS.DIVIDER}`,
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: FONT_FAMILY,
  },
  saveButton: {
    padding: '10px 16px',
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.SECONDARY,
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: FONT_FAMILY,
  },
};
