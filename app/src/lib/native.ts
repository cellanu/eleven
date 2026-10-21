import type { GpuixRenderer } from "@gpuix/native";

/** The parts of the native window that live outside React: the menu bar, notifications, focus and the Dock. */
export type Desktop = Pick<
  GpuixRenderer,
  | "setMenus"
  | "setMenuAction"
  | "notificationsAvailable"
  | "showNotification"
  | "dismissNotification"
  | "setNotificationResponse"
  | "isWindowActive"
  | "setWindowActivation"
  | "setDockBadge"
  | "requestAttention"
  | "activateWindow"
>;

/** Extra window buttons for frameless Windows/Linux builds; test renderers may not carry them. */
export type WindowButtons = Pick<GpuixRenderer, "minimizeWindow" | "zoomWindow">;

const METHODS = [
  "setMenus",
  "setMenuAction",
  "notificationsAvailable",
  "showNotification",
  "dismissNotification",
  "setNotificationResponse",
  "isWindowActive",
  "setWindowActivation",
  "setDockBadge",
  "requestAttention",
  "activateWindow",
] as const satisfies readonly (keyof Desktop)[];

function isDesktop(value: unknown): value is Desktop {
  return typeof value === "object" && value !== null && METHODS.every((name) => typeof Reflect.get(value, name) === "function");
}

let desktop: Desktop | null = null;

/** Called once the window exists. Test renderers have none of this, so everything that uses it no-ops there. */
export function adoptDesktop(renderer: unknown): Desktop | null {
  desktop = isDesktop(renderer) ? renderer : null;
  return desktop;
}

export function currentDesktop(): Desktop | null {
  return desktop;
}

/** The minimize/zoom entry points, when the renderer carries them (Windows/Linux frameless builds). */
export function windowButtons(renderer: unknown): WindowButtons | null {
  if (typeof renderer !== "object" || renderer === null) return null;
  const has = (name: keyof WindowButtons): boolean => typeof Reflect.get(renderer, name) === "function";
  return has("minimizeWindow") && has("zoomWindow") ? (renderer as WindowButtons) : null;
}
