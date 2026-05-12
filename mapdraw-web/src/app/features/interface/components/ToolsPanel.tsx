import { useAtom } from "jotai";
import { activeToolAtom, toolbarCollapsedAtom } from "../atoms";
import { toolRegistry } from "../toolRegistry";

export function ToolsPanel() {
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const [collapsed, setCollapsed] = useAtom(toolbarCollapsedAtom);

  return (
    <div className="w-full">
      <button
        className="flex p-2 rounded hover:bg-gray-100"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="material-symbols-outlined">
          {collapsed ? "chevron_right" : "chevron_left"}
        </span>
      </button>
      {Object.entries(toolRegistry).map(([id, tool]) => (
        <button
          key={id}
          title={tool.label}
          onClick={() => setActiveTool(id as any)}
          className={`
            flex items-center py-2 px-1 rounded w-full
            ${activeTool === id ? "bg-gray-200" : ""}
            hover:bg-gray-100
            transition
          `}
        >
          <span className="material-symbols-outlined text-2xl">
            {tool.icon}
          </span>
          {!collapsed && <span className="ml-2 text-sm">{tool.label}</span>}
        </button>
      ))}
    </div>
  );
}
