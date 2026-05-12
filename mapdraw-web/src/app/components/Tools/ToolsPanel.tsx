import { useAtom } from "jotai";
import { activeToolAtom, toolbarCollapsedAtom } from "./state";
import { toolRegistry } from "./toolRegistry";

export function ToolsPanel() {
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const [collapsed, setCollapsed] = useAtom(toolbarCollapsedAtom);

  return (
    <div className={`flex flex-col gap-2 ${collapsed ? "w-12" : "w-64"}`}>
      {Object.entries(toolRegistry).map(([id, tool]) => (
        <button
          key={id}
          title={tool.label}
          onClick={() => setActiveTool(id as any)}
          className={`
            flex items-center gap-2 p-2 rounded
            ${activeTool === id ? "bg-gray-200" : "bg-white"}
            hover:bg-gray-100
            transition
          `}
        >
          <span className="material-symbols-outlined text-2xl">
            {tool.icon}
          </span>
          {!collapsed && <span className="text-sm">{tool.label}</span>}
        </button>
      ))}

      <button
        className="flex items-center justify-center p-2 mt-2 rounded hover:bg-gray-100"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="material-symbols-outlined">
          {collapsed ? "chevron_right" : "chevron_left"}
        </span>
      </button>
    </div>
  );
}
