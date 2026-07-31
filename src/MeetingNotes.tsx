import React from 'react';

export interface MeetingNote {
  date: string;
  title?: string;
  content: string[];
  todos?: string[];
}

export interface MeetingNotesProps {
  title?: string;
  notes: MeetingNote[];
}

export const MeetingNotes: React.FC<MeetingNotesProps> = ({ title = 'Meeting Notes', notes }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{title}</h1>
      {notes.map((note, idx) => (
        <div 
          key={idx} 
          style={{ 
            marginBottom: '24px', 
            padding: '16px', 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px',
            backgroundColor: '#fafafa'
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>
            {note.title || note.date}
          </h2>
          {note.content.map((paragraph, pIdx) => (
            <p key={pIdx} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
              {paragraph}
            </p>
          ))}
          {note.todos && note.todos.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#555' }}>TODO:</h3>
              <ul style={{ paddingLeft: '20px' }}>
                {note.todos.map((todo, tIdx) => (
                  <li key={tIdx} style={{ marginBottom: '4px', lineHeight: '1.4' }}>
                    {todo}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};