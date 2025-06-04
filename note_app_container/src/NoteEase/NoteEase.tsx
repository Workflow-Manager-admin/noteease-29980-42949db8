import React, { useState, useCallback } from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, CATEGORIES, FONT_FAMILY } from "./constants";
import { SearchBar } from "./SearchBar";
import { CategoryFilters } from "./CategoryFilters";
import { NotesList } from "./NotesList";
import { FloatingActionButton } from "./FloatingActionButton";
import { NoteModal } from "./NoteModal";
import { z } from "zod";

// Define the Note structure
export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for notes
const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to NoteEase',
    content: 'This is a simple note-taking application built with Remotion. You can create, edit, and delete notes, as well as search and filter them by category.',
    category: 'all',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    title: 'Work Meeting Notes',
    content: 'Discuss project timeline and resource allocation. Follow up with team on deliverables.',
    category: 'work',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: '3',
    title: 'Grocery List',
    content: 'Milk, eggs, bread, fruits, vegetables, chicken, pasta, sauce',
    category: 'personal',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },
  {
    id: '4',
    title: 'App Feature Ideas',
    content: 'Add markdown support, image attachments, cloud sync, and sharing capabilities.',
    category: 'ideas',
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04'),
  },
  {
    id: '5',
    title: 'Weekly Tasks',
    content: 'Complete project proposal, review code, update documentation, client meeting on Thursday.',
    category: 'tasks',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05'),
  },
];

// Zod schema for the component props
export const noteEaseSchema = z.object({
  title: z.string().optional(),
});

// Main NoteEase component
export const NoteEase: React.FC<z.infer<typeof noteEaseSchema>> = ({ title }) => {
  // State management
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  // Filter notes based on search term and category
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle note operations
  const handleAddNote = useCallback(() => {
    setCurrentNote(null);
    setModalVisible(true);
  }, []);

  const handleEditNote = useCallback((note: Note) => {
    setCurrentNote(note);
    setModalVisible(true);
  }, []);

  const handleDeleteNote = useCallback((noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  }, []);

  const handleSaveNote = useCallback((note: Note, isNew: boolean) => {
    if (isNew) {
      setNotes(prevNotes => [
        ...prevNotes,
        { ...note, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() }
      ]);
    } else {
      setNotes(prevNotes => 
        prevNotes.map(n => n.id === note.id ? { ...note, updatedAt: new Date() } : n)
      );
    }
    setModalVisible(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setCurrentNote(null);
  }, []);

  // Main render
  return (
    <AbsoluteFill style={styles.container}>
      {/* App Header */}
      <div style={styles.header}>
        <h1 style={styles.appTitle}>{title || "NoteEase"}</h1>
      </div>

      {/* Search and Filters */}
      <div style={styles.searchAndFilters}>
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
        />
        <CategoryFilters
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Notes List */}
      <NotesList 
        notes={filteredNotes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddNote} />

      {/* Note Modal (Create/Edit) */}
      {modalVisible && (
        <NoteModal
          note={currentNote}
          visible={modalVisible}
          onClose={handleCloseModal}
          onSave={handleSaveNote}
          categories={CATEGORIES}
        />
      )}
    </AbsoluteFill>
  );
};

// Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: COLORS.BACKGROUND,
    fontFamily: FONT_FAMILY,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    padding: '20px',
    color: COLORS.SECONDARY,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  appTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold',
  },
  searchAndFilters: {
    padding: '15px 20px',
    borderBottom: `1px solid ${COLORS.DIVIDER}`,
  },
};
