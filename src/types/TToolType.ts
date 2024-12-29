type TToolType = typeof ToolTypes[number];

const ToolTypes = ['none', 'pencil', 'eraser'] as const;

export type { TToolType };
export { ToolTypes };