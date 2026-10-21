import type { ReactElement } from "react";

import { t } from "../i18n";
import type { WindowButtons } from "../lib/native";
import { useTheme } from "../theme";

/**
 * 自绘窗口控制按钮（最小化 / 最大化-还原 / 关闭），用于 Windows/Linux 无边框窗口。
 * macOS 使用系统标题栏，不渲染此组件。
 */
export function WindowControls({ buttons }: { readonly buttons: WindowButtons | null }): ReactElement | null {
  const { p } = useTheme();
  if (buttons === null) return null;

  const quit = (): void => {
    // 原生层没有 closeWindow；退出进程与菜单"退出 Eleven"行为一致。
    process.exit(0);
  };

  const cell = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 32,
    cursor: "pointer",
    color: p.text,
    fontSize: 14,
    hover: { backgroundColor: p.sel },
  } as const;

  return (
    <div style={{ display: "flex", flexShrink: 0, userSelect: "none" }}>
      <div role="button" aria-label={t("Minimize Window")} title={t("Minimize Window")} style={cell} onClick={() => buttons.minimizeWindow()}>
        ─
      </div>
      <div role="button" aria-label={t("Maximize Window")} title={t("Maximize Window")} style={cell} onClick={() => buttons.zoomWindow()}>
        □
      </div>
      <div
        role="button"
        aria-label={t("Close Window")}
        title={t("Close Window")}
        style={{ ...cell, hover: { backgroundColor: "#e81123", color: "#ffffff" } }}
        onClick={quit}
      >
        ✕
      </div>
    </div>
  );
}
