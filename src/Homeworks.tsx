import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

type HomeworkFile = {
  key: string;
  folder: string;
  title: string;
  path: string;
};

type HomeworkTopic = {
  folder: string;
  files: HomeworkFile[];
};

const mdContext = require.context('../homeworks', true, /\.md$/);

function humanize(value: string): string {
  const spaced = value.replace(/[-_]+/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function folderNumber(folder: string): number {
  const match = folder.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}

type WithOrder = HomeworkFile & { order: number };

function buildTopics(): HomeworkTopic[] {
  const byFolder = new Map<string, WithOrder[]>();

  for (const key of mdContext.keys()) {
    const relative = key.replace(/^\.\//, '');
    const parts = relative.split('/');
    const folder = parts[parts.length - 2] ?? '';
    const base = parts[parts.length - 1]?.replace(/\.md$/i, '') ?? '';
    const isReadme = base.toUpperCase() === 'README';
    const order = isReadme ? 0 : parseInt(base.match(/^(\d+)/)?.[1] ?? '9999', 10);

    const file: WithOrder = {
      key,
      folder,
      title: isReadme ? 'Обзор (README)' : humanize(base.replace(/^\d+-/, '')),
      path: `/homeworks/${relative}`,
      order,
    };

    const list = byFolder.get(folder) ?? [];
    list.push(file);
    byFolder.set(folder, list);
  }

  return Array.from(byFolder.entries())
    .map(([folder, files]) => ({
      folder,
      files: files
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
        .map(({ order: _order, ...file }) => file),
    }))
    .sort((a, b) => folderNumber(a.folder) - folderNumber(b.folder));
}

const topics: HomeworkTopic[] = buildTopics();

const fileByKey = new Map<string, HomeworkFile>(topics.flatMap((t) => t.files).map((f) => [f.key, f]));

function toMarkdown(raw: unknown): string {
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object' && 'default' in raw) {
    return typeof (raw as { default: unknown }).default === 'string' ? (raw as { default: string }).default : '';
  }
  return '';
}

function hasMeaningfulContent(markdown: string): boolean {
  const body = markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !/^#{1,6}\s/.test(line))
    .filter((line) => !/^```/.test(line))
    .filter((line) => !/^(-{3,}|\*{3,})$/.test(line))
    .filter((line) => !/^\|.*\|$/.test(line))
    .join(' ')
    .replace(/[*_`]/g, '')
    .trim();
  return body.length >= 20;
}

const mdComponents: Components = {
  a: (props) => {
    const { node: _node, ...rest } = props;
    return <a {...rest} target="_blank" rel="noreferrer noopener" />;
  },
};

const CSS = `
.hw-root { box-sizing: border-box; display: flex; height: 100vh; width: 100%; background: #f9fafb; color: #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.65; }
.hw-root *, .hw-root *::before, .hw-root *::after { box-sizing: border-box; }

.hw-sidebar { flex: 0 0 300px; width: 300px; background: #fff; border-right: 1px solid #e5e7eb; overflow-y: auto; }
.hw-sidebar-header { padding: 20px 20px 10px; font-size: 12px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: #9ca3af; }
.hw-topic { border-bottom: 1px solid #f3f4f6; }
.hw-topic-header { display: flex; align-items: center; gap: 10px; padding: 12px 16px; cursor: pointer; user-select: none; }
.hw-topic-header:hover { background: #f9fafb; }
.hw-topic-chevron { transition: transform .15s ease; color: #9ca3af; font-size: 11px; }
.hw-topic-chevron.open { transform: rotate(90deg); }
.hw-topic-name { font-weight: 600; color: #111827; font-size: 14px; }
.hw-topic-count { margin-left: auto; font-size: 11px; color: #6b7280; background: #f3f4f6; border-radius: 999px; padding: 1px 8px; }
.hw-files { list-style: none; margin: 0; padding: 0 0 8px; }
.hw-file { display: flex; align-items: center; gap: 8px; padding: 8px 16px 8px 34px; cursor: pointer; color: #4b5563; font-size: 13.5px; border-left: 2px solid transparent; }
.hw-file:hover { background: #f9fafb; color: #111827; }
.hw-file.active { background: #eff6ff; color: #0066cc; border-left-color: #0066cc; font-weight: 600; }
.hw-file-icon { color: #9ca3af; flex-shrink: 0; }
.hw-file.active .hw-file-icon { color: #0066cc; }

.hw-main { flex: 1; overflow-y: auto; padding: 40px 56px; }
.hw-main-inner { max-width: 860px; margin: 0 auto; }
.hw-crumb { font-size: 13px; color: #6b7280; margin-bottom: 12px; }
.hw-crumb b { color: #111827; font-weight: 600; }
.hw-path { display: block; margin: 0 0 24px; padding: 10px 14px; background: #1f2937; color: #10b981;
  border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 12.5px; overflow-x: auto; word-break: break-all; }
.hw-empty-banner { margin: 0 0 20px; padding: 14px 16px; background: #fffbeb; border: 1px solid #fde68a; color: #92400e; border-radius: 8px; font-size: 13.5px; }

.hw-md { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 32px 40px; box-shadow: 0 1px 3px rgba(0,0,0,.04); }
.hw-md h1 { font-size: 28px; margin: 0 0 18px; padding-bottom: 12px; border-bottom: 1px solid #eef0f2; color: #111827; line-height: 1.3; }
.hw-md h2 { font-size: 22px; margin: 32px 0 14px; color: #111827; }
.hw-md h3 { font-size: 18px; margin: 26px 0 10px; color: #111827; }
.hw-md h4 { font-size: 15.5px; margin: 22px 0 8px; color: #111827; }
.hw-md p { margin: 0 0 14px; }
.hw-md a { color: #0066cc; text-decoration: none; }
.hw-md a:hover { text-decoration: underline; }
.hw-md ul, .hw-md ol { margin: 0 0 14px; padding-left: 24px; }
.hw-md li { margin: 4px 0; }
.hw-md li input[type="checkbox"] { margin-right: 8px; vertical-align: middle; transform: translateY(1px); }
.hw-md code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; background: #f3f4f6; color: #db2777; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
.hw-md pre { background: #1f2937; color: #e5e7eb; padding: 16px 18px; border-radius: 8px; overflow-x: auto; margin: 0 0 16px; }
.hw-md pre code { background: transparent; color: inherit; padding: 0; font-size: 13px; line-height: 1.6; }
.hw-md blockquote { border-left: 3px solid #d1d5db; margin: 0 0 14px; padding: 4px 0 4px 16px; color: #6b7280; }
.hw-md table { border-collapse: collapse; width: 100%; margin: 0 0 16px; font-size: 14px; }
.hw-md th, .hw-md td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
.hw-md th { background: #f9fafb; font-weight: 600; }
.hw-md tr:nth-child(even) td { background: #fcfcfd; }
.hw-md hr { border: none; border-top: 1px solid #e5e7eb; margin: 28px 0; }
.hw-md img { max-width: 100%; }

@media (max-width: 720px) {
  .hw-root { flex-direction: column; height: auto; min-height: 100vh; }
  .hw-sidebar { flex: none; width: 100%; border-right: none; border-bottom: 1px solid #e5e7eb; max-height: 45vh; }
  .hw-main { padding: 24px 18px; }
  .hw-md { padding: 24px 20px; }
}
`;

const Homeworks: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(topics[0]?.files[0]?.key ?? null);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() =>
    topics.reduce<Record<string, boolean>>((acc, t) => {
      acc[t.folder] = t.folder === topics[0]?.folder;
      return acc;
    }, {}),
  );

  const selected = selectedKey ? fileByKey.get(selectedKey) ?? null : null;
  const content = useMemo(
    () => (selected ? toMarkdown(mdContext(selected.key)) : ''),
    [selected],
  );

  const toggleFolder = (folder: string) =>
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));

  return (
    <div className="hw-root">
      <style>{CSS}</style>

      <aside className="hw-sidebar">
        <div className="hw-sidebar-header">Темы</div>
        {topics.map((topic) => {
          const open = Boolean(openFolders[topic.folder]);
          return (
            <div className="hw-topic" key={topic.folder}>
              <div className="hw-topic-header" onClick={() => toggleFolder(topic.folder)}>
                <span className={`hw-topic-chevron${open ? ' open' : ''}`}>▶</span>
                <span className="hw-topic-name">{humanize(topic.folder.replace(/^\d+-/, ''))}</span>
                <span className="hw-topic-count">{topic.files.length}</span>
              </div>
              {open && (
                <ul className="hw-files">
                  {topic.files.map((file) => (
                    <li
                      key={file.key}
                      className={`hw-file${file.key === selectedKey ? ' active' : ''}`}
                      onClick={() => setSelectedKey(file.key)}
                    >
                      <span className="hw-file-icon">📄</span>
                      <span>{file.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </aside>

      <main className="hw-main">
        <div className="hw-main-inner">
          {!selected ? (
            <p>Папка <code>homeworks</code> пуста. Добавьте туда любой <code>.md</code> файл.</p>
          ) : (
            <>
              <div className="hw-crumb">
                <b>{humanize(selected.folder.replace(/^\d+-/, ''))}</b>
                <span> / {selected.title}</span>
              </div>
              <code className="hw-path">{selected.path}</code>
              {!hasMeaningfulContent(content) && content.trim().length > 0 ? (
                <div className="hw-empty-banner">
                  Этот файл пока содержит только структуру (заголовки). Контент будет добавлен позже —
                  как только появится текст, он здесь отобразится.
                </div>
              ) : content.trim().length === 0 ? (
                <div className="hw-empty-banner">Файл пуст. Как только появится контент, он будет отрендерен здесь.</div>
              ) : null}
              <div className="hw-md" key={selected.key}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Homeworks;
