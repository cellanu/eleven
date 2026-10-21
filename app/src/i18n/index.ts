// 国际化模块：集中管理英文与简体中文词条。
// 菜单、对话框等由原生层渲染的字符串通过 translateMenu()/t() 翻译；React 界面可逐步迁移到同一字典。

export type Locale = "en" | "zh-CN";

type Dict = Record<string, string>;

// key 为英文原文，value 为简体中文译文。找不到时原样返回，保证安全回退。
const ZH: Dict = {
  // ===== 菜单栏 =====
  "About Eleven": "关于 Eleven",
  "Check for Updates…": "检查更新…",
  "Settings…": "设置…",
  "Hide Eleven": "隐藏 Eleven",
  "Quit Eleven": "退出 Eleven",
  "File": "文件",
  "New Chat": "新建对话",
  "Open…": "打开…",
  "Open Recent": "最近打开",
  "Save Project": "保存项目",
  "Export": "导出",
  "Pseudocode of This Function": "当前函数的伪代码",
  "Assembly of This Function": "当前函数的汇编",
  "All Pseudocode": "全部伪代码",
  "Objective-C Classes": "Objective-C 类",
  "Compare with Another Binary…": "与另一个二进制文件比较…",
  "Write Patched Copy": "写出修补后的副本",
  "Edit": "编辑",
  "Undo": "撤销",
  "Redo": "重做",
  "Cut": "剪切",
  "Copy": "复制",
  "Paste": "粘贴",
  "Select All": "全选",
  "Find…": "查找…",
  "Find Next": "查找下一个",
  "Find Previous": "查找上一个",
  "Navigate": "导航",
  "Go to Address or Symbol…": "跳转到地址或符号…",
  "Search Everything…": "全局搜索…",
  "Back": "后退",
  "Forward": "前进",
  "Cross-References": "交叉引用",
  "Modify": "修改",
  "Rename…": "重命名…",
  "Comment…": "注释…",
  "Bookmark": "书签",
  "Patch Bytes Here…": "在此修补字节…",
  "Mark As": "标记为",
  "Code": "代码",
  "Function": "函数",
  "Data": "数据",
  "C String": "C 字符串",
  "Undefined": "未定义",
  "Show Number As": "数字显示方式",
  "Hexadecimal": "十六进制",
  "Decimal": "十进制",
  "Character": "字符",
  "Offset": "偏移",
  "Address": "地址",
  "View": "视图",
  "Pseudocode": "伪代码",
  "Graph": "流程图",
  "Strings": "字符串",
  "Split Right": "向右分屏",
  "Split Down": "向下分屏",
  "Sidebar": "侧边栏",
  "Details": "详情",
  "Terminal": "终端",
  "Agent": "智能体",
  "Agent Panel": "智能体面板",
  "Stop the Agent": "停止智能体",
  "Debug": "调试",
  "Debug This Program": "调试此程序",
  "Continue": "继续",
  "Step Over": "步过",
  "Step Into": "步入",
  "Step Out": "步出",
  "Window": "窗口",
  "Help": "帮助",
  "Keyboard Shortcuts": "键盘快捷键",
  "What’s New in Eleven": "Eleven 新功能",
  "Support Eleven…": "支持 Eleven…",
  "Report a Problem…": "报告问题…",

  // ===== 通用 UI / 窗口控件 =====
  "Home": "主页",
  "Welcome": "欢迎",
  "Get Started": "开始使用",
  "Skip": "跳过",
  "Next": "下一步",
  "Done": "完成",
  "Cancel": "取消",
  "OK": "确定",
  "Close": "关闭",
  "Maximize": "最大化",
  "Restore": "还原",
  "Minimize Window": "最小化窗口",
  "Maximize Window": "最大化窗口",
  "Restore Window": "还原窗口",
  "Close Window": "关闭窗口",
};

let current: Locale = "zh-CN";

export function setLocale(locale: Locale): void {
  current = locale;
}

export function getLocale(): Locale {
  return current;
}

/** 按指定语言翻译字符串；无词条时原样返回英文。 */
export function t(text: string, locale: Locale = current): string {
  if (locale === "en") return text;
  return ZH[text] ?? text;
}

/** 翻译整棵菜单树（label 与子项）。带 role 的项交给系统处理，不动。 */
export function translateItems(items: readonly any[], locale: Locale = current): any[] {
  return items.map((item) => {
    if (item.role) return item;
    const next = { ...item };
    if (typeof next.label === "string") next.label = t(next.label, locale);
    if (Array.isArray(next.items)) next.items = translateItems(next.items, locale);
    return next;
  });
}

/** 翻译整个菜单栏。 */
export function translateMenu(menus: readonly any[], locale: Locale = current): any[] {
  return menus.map((menu) => ({
    ...menu,
    label: typeof menu.label === "string" ? t(menu.label, locale) : menu.label,
    items: Array.isArray(menu.items) ? translateItems(menu.items, locale) : menu.items,
  }));
}
