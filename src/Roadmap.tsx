import React, { useState } from 'react';

export interface ChecklistItem {
  text: string;
  completed: boolean;
  subitems?: string[];
}

export interface Topic {
  title: string;
  items: ChecklistItem[];
}

export interface Section {
  title: string;
  topics: Topic[];
}

export interface PriorityGroup {
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  sections: Section[];
}

export interface RoadmapData {
  priorities: PriorityGroup[];
  learningPath?: string;
  resources?: string;
}

export interface RoadmapProps {
  title?: string;
  data: RoadmapData;
}

const PRIORITY_COLORS = {
  HIGH: {
    bg: '#fef2f2',
    border: '#fca5a5',
    header: '#dc2626',
    text: '#7f1d1d',
    progress: '#f87171',
  },
  MEDIUM: {
    bg: '#fefce8',
    border: '#fde047',
    header: '#ca8a04',
    text: '#713f12',
    progress: '#eab308',
  },
  LOW: {
    bg: '#f0fdf4',
    border: '#86efac',
    header: '#16a34a',
    text: '#14532d',
    progress: '#4ade80',
  },
};

function parseRoadmapMarkdown(markdown: string): RoadmapData {
  const lines = markdown.split('\n');
  const priorities: PriorityGroup[] = [];
  let currentPriority: PriorityGroup | null = null;
  let currentSection: Section | null = null;
  let currentTopic: Topic | null = null;
  let currentItems: ChecklistItem[] = [];
  let currentSubitems: string[] = [];

  const flushTopic = () => {
    if (currentTopic && currentItems.length > 0) {
      const lastItem = currentItems[currentItems.length - 1];
      if (currentSubitems.length > 0 && !lastItem.subitems) {
        lastItem.subitems = [...currentSubitems];
      }
      currentTopic.items = [...currentTopic.items, ...currentItems];
      if (currentSection) {
        currentSection.topics.push(currentTopic);
      }
    }
    currentTopic = null;
    currentItems = [];
    currentSubitems = [];
  };

  const flushSection = () => {
    flushTopic();
    if (currentSection && currentSection.topics.length > 0) {
      if (currentPriority) {
        currentPriority.sections.push(currentSection);
      }
    }
    currentSection = null;
  };

  const flushPriority = () => {
    flushSection();
    if (currentPriority && currentPriority.sections.length > 0) {
      priorities.push(currentPriority);
    }
    currentPriority = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const priorityMatch = trimmed.match(/^##\s+Priority:\s*(HIGH|MEDIUM|LOW)\s*(?:\(([^)]+)\))?/);
    if (priorityMatch) {
      flushPriority();
      currentPriority = {
        level: priorityMatch[1] as 'HIGH' | 'MEDIUM' | 'LOW',
        title: priorityMatch[2] || priorityMatch[1],
        sections: [],
      };
      continue;
    }

    const sectionMatch = trimmed.match(/^##\s+(?:\d+\.\s+|[🚀📚🎯💡🔥⚡📌🔸🔹]\s+)?(\d+\.\s+)?(.+?)(?:\s*\(([^)]+)\))?$/);
    if (sectionMatch && currentPriority && !trimmed.includes('Priority:')) {
      flushSection();
      currentSection = {
        title: trimmed.replace(/^##\s+/, ''),
        topics: [],
      };
      continue;
    }

    const topicMatch = trimmed.match(/^###\s+(.+?):?\s*$/);
    if (topicMatch && currentSection) {
      flushTopic();
      currentTopic = {
        title: topicMatch[1],
        items: [],
      };
      continue;
    }

    const checklistMatch = trimmed.match(/^-\s+\[([ x])\]\s*\*\*(.+?)\*\*$/);
    if (checklistMatch && currentTopic) {
      flushTopic();
      currentItems = [{
        text: checklistMatch[2],
        completed: checklistMatch[1] === 'x',
        subitems: [],
      }];
      currentSubitems = [];
      continue;
    }

    const subitemMatch = trimmed.match(/^-\s+(.+?)$/);
    if (subitemMatch && currentItems.length > 0 && !trimmed.startsWith('**')) {
      currentSubitems.push(subitemMatch[1]);
      continue;
    }

    const simpleChecklist = trimmed.match(/^-\s+\[([ x])\]\s+(.+?)$/);
    if (simpleChecklist && currentTopic && !currentItems.length) {
      currentItems.push({
        text: simpleChecklist[2],
        completed: simpleChecklist[1] === 'x',
      });
      continue;
    }
  }

  flushTopic();
  flushSection();
  flushPriority();
  let learningPath = '';
  let resources = '';
  let inLearningPath = false;
  let inResources = false;

  for (const line of lines) {
    if (line.includes('## Learning Path Recommendations')) {
      inLearningPath = true;
      inResources = false;
      continue;
    }
    if (line.includes('## Resources & Next Steps')) {
      inLearningPath = false;
      inResources = true;
      continue;
    }
    if (line.startsWith('## ') && !inLearningPath && !inResources) {
      if (!line.includes('Priority:')) {
        inLearningPath = false;
        inResources = false;
      }
    }

    if (inLearningPath) {
      learningPath += line + '\n';
    }
    if (inResources) {
      resources += line + '\n';
    }
  }

  return {
    priorities,
    learningPath: learningPath.trim() || undefined,
    resources: resources.trim() || undefined,
  };
}

const CollapsibleSection: React.FC<{
  section: Section;
  isExpanded: boolean;
  onToggle: () => void;
  priorityColors: typeof PRIORITY_COLORS['HIGH'];
}> = ({ section, isExpanded, onToggle, priorityColors }) => {
  return (
    <div style={{
      border: `1px solid ${priorityColors.border}`,
      borderRadius: '8px',
      marginBottom: '12px',
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '14px 18px',
          backgroundColor: priorityColors.bg,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'inherit',
          fontSize: '16px',
          fontWeight: '600',
          color: priorityColors.header,
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = priorityColors.border + '40'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = priorityColors.bg}
      >
        <span>{section.title}</span>
        <span style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          fontSize: '18px',
        }}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div style={{ padding: '16px 18px', backgroundColor: '#fff' }}>
          {section.topics.map((topic, tIdx) => (
            <div key={tIdx} style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '10px',
                borderBottom: `2px solid ${priorityColors.border}40`,
                paddingBottom: '6px',
              }}>
                {topic.title}
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
              }}>
                {topic.items.map((item, iIdx) => (
                  <li key={iIdx} style={{ 
                    marginBottom: item.subitems && item.subitems.length > 0 ? '12px' : '6px',
                    paddingLeft: '8px',
                    borderLeft: `3px solid ${priorityColors.border}60`,
                  }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '10px',
                      cursor: 'pointer',
                    }}>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        readOnly
                        style={{ 
                          marginTop: '3px',
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                          accentColor: priorityColors.header,
                        }}
                      />
                      <span style={{ 
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? '#9ca3af' : '#1f2937',
                        lineHeight: '1.5',
                        fontSize: '14px',
                      }}>
                        {item.text}
                      </span>
                    </label>
                    {item.subitems && item.subitems.length > 0 && (
                      <ul style={{ 
                        marginLeft: '34px', 
                        marginTop: '6px',
                        listStyle: 'disc',
                      }}>
                        {item.subitems.map((subitem, sIdx) => (
                          <li key={sIdx} style={{ 
                            marginBottom: '3px', 
                            fontSize: '13px', 
                            color: '#6b7280',
                            lineHeight: '1.4',
                          }}>
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
      )}
    </div>
  );
};

const ProgressBar: React.FC<{
  completed: number;
  total: number;
  color: string;
}> = ({ completed, total, color }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      marginBottom: '16px',
    }}>
      <div style={{ 
        flex: 1, 
        height: '8px', 
        backgroundColor: '#e5e7eb', 
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease',
          borderRadius: '4px',
        }} />
      </div>
      <span style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#6b7280',
        minWidth: '60px',
        textAlign: 'right',
      }}>
        {completed}/{total} ({percentage}%)
      </span>
    </div>
  );
};

const countChecklistItems = (sections: Section[]): { completed: number; total: number } => {
  let completed = 0;
  let total = 0;
  
  for (const section of sections) {
    for (const topic of section.topics) {
      for (const item of topic.items) {
        total++;
        if (item.completed) completed++;
      }
    }
  }
  
  return { completed, total };
};

export const Roadmap: React.FC<RoadmapProps> = ({ 
  title = 'Frontend Developer Roadmap',
  data 
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const expandAll = (prioritySections: Section[]) => {
    const newExpanded: Record<string, boolean> = {};
    prioritySections.forEach(section => {
      newExpanded[section.title] = true;
    });
    setExpandedSections(prev => ({ ...prev, ...newExpanded }));
  };

  const collapseAll = (prioritySections: Section[]) => {
    const newExpanded: Record<string, boolean> = {};
    prioritySections.forEach(section => {
      newExpanded[section.title] = false;
    });
    setExpandedSections(prev => {
      const filtered = { ...prev };
      prioritySections.forEach(section => {
        delete filtered[section.title];
      });
      return filtered;
    });
  };

  return (
    <div style={{ 
      padding: '24px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
    }}>
      <div style={{
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#111827',
          marginBottom: '8px',
          letterSpacing: '-0.5px',
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
        }}>
          Track your learning journey with structured priorities
        </p>
      </div>

      {data.priorities.map((priority, pIdx) => {
        const colors = PRIORITY_COLORS[priority.level];
        const { completed, total } = countChecklistItems(priority.sections);
        
        return (
          <div key={pIdx} style={{
            marginBottom: '40px',
            backgroundColor: colors.bg,
            border: `2px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '20px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: colors.header,
                  letterSpacing: '-1px',
                }}>
                  {priority.level}
                </span>
                {priority.title !== priority.level && (
                  <span style={{
                    fontSize: '16px',
                    color: colors.text,
                    fontWeight: '500',
                  }}>
                    — {priority.title}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => expandAll(priority.sections)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: '#fff',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: colors.header,
                    fontWeight: '500',
                  }}
                >
                  Expand All
                </button>
                <button
                  onClick={() => collapseAll(priority.sections)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: '#fff',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: colors.header,
                    fontWeight: '500',
                  }}
                >
                  Collapse All
                </button>
              </div>
            </div>

            <ProgressBar 
              completed={completed} 
              total={total} 
              color={colors.progress} 
            />

            {priority.sections.map((section, sIdx) => (
              <CollapsibleSection
                key={sIdx}
                section={section}
                isExpanded={expandedSections[section.title] ?? sIdx === 0}
                onToggle={() => toggleSection(section.title)}
                priorityColors={colors}
              />
            ))}
          </div>
        );
      })}

      {data.learningPath && (
        <div style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#eff6ff',
          border: '2px solid #93c5fd',
          borderRadius: '12px',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e40af',
            marginBottom: '16px',
          }}>
            📚 Learning Path Recommendations
          </h2>
          <div style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#1e3a8a',
            whiteSpace: 'pre-wrap',
          }}>
            {data.learningPath}
          </div>
        </div>
      )}

      {data.resources && (
        <div style={{
          marginTop: '24px',
          padding: '24px',
          backgroundColor: '#fef3c7',
          border: '2px solid #fcd34d',
          borderRadius: '12px',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#92400e',
            marginBottom: '16px',
          }}>
            🎯 Resources & Next Steps
          </h2>
          <div style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#78350f',
            whiteSpace: 'pre-wrap',
          }}>
            {data.resources}
          </div>
        </div>
      )}
    </div>
  );
};

export { parseRoadmapMarkdown };