import React from 'react';

export interface ShortListItem {
  category: string;
  items: Array<{
    title: string;
    completed: boolean;
    subitems?: string[];
  }>;
}

export interface ShortListProps {
  title?: string;
  items: ShortListItem[];
}

export const ShortList: React.FC<ShortListProps> = ({ title = 'Short List', items }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{title}</h1>
      {items.map((category, idx) => (
        <div key={idx} style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#333' }}>
            {category.category}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {category.items.map((item, itemIdx) => (
              <li key={itemIdx} style={{ marginBottom: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    readOnly
                    style={{ marginTop: '4px' }}
                  />
                  <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                    <strong>{item.title}</strong>
                  </span>
                </label>
                {item.subitems && item.subitems.length > 0 && (
                  <ul style={{ marginLeft: '24px', marginTop: '4px' }}>
                    {item.subitems.map((subitem, subIdx) => (
                      <li key={subIdx} style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>
                        {subitem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};