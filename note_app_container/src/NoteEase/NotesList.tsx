import React from "react";
import { COLORS, FONT_FAMILY, CATEGORIES } from "./constants";
import { Note } from "./NoteEase";

interface NotesListProps {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ 
  notes, 
  onEditNote, 
  onDeleteNote 
}) => {
  // Function to get category color
  const getCategoryColor = (categoryId: string): string => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.color : COLORS.PRIMARY;
  };

  // Function to format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (notes.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.TEXT_SECONDARY}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
            <polyline points="7.5 19.79 7.5 14.6 3 12" />
            <polyline points="21 12 16.5 14.6 16.5 19.79" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <p style={styles.emptyText}>No notes found</p>
        <p style={styles.emptySubtext}>Create a new note or change your search criteria</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {notes.map((note) => (
        <div key={note.id} style={styles.noteCard}>
          <div style={styles.noteHeader}>
            <h3 style={styles.noteTitle}>{note.title}</h3>
            <div style={styles.noteActions}>
              <button 
                onClick={() => onEditNote(note)} 
                style={styles.actionButton}
                aria-label="Edit note"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.TEXT_SECONDARY}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </button>
              <button 
                onClick={() => onDeleteNote(note.id)} 
                style={styles.actionButton}
                aria-label="Delete note"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.TEXT_SECONDARY}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          </div>
          <div style={styles.noteMeta}>
            <span 
              style={{
                ...styles.categoryTag,
                backgroundColor: getCategoryColor(note.category),
              }}
            >
              {CATEGORIES.find(cat => cat.id === note.category)?.label || note.category}
            </span>
            <span style={styles.dateText}>
              {formatDate(note.updatedAt)}
            </span>
          </div>
          <p style={styles.noteContent}>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    overflow: 'auto',
    flex: 1,
  },
  noteCard: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: '8px',
    boxShadow: `0 2px 8px ${COLORS.CARD_SHADOW}`,
    padding: '16px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  },
  noteTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  noteActions: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '4px',
  },
  noteMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  categoryTag: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
  },
  dateText: {
    fontSize: '12px',
    color: COLORS.TEXT_SECONDARY,
  },
  noteContent: {
    margin: '0',
    fontSize: '14px',
    color: COLORS.TEXT_SECONDARY,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 20px',
    textAlign: 'center',
    flex: 1,
  },
  emptyIcon: {
    marginBottom: '20px',
  },
  emptyText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    margin: '0 0 8px 0',
  },
  emptySubtext: {
    fontSize: '16px',
    color: COLORS.TEXT_SECONDARY,
    margin: 0,
  },
};
