export function data(label: string, value: any) {
  return [
    {
      text: `${label}:`,
      style: 'label',
    },
    {
      text: `${value || 'Non spécifié'}`,
      style: 'input',
    },
  ];
}

export function header() {
  return {
    header: {
      ...text('Détails'),
    },
  };
}

export function column(...content: any) {
  return [content];
}

export function qr(data: any) {
  return {
    qr: `${data}`,
    foreground: '#003e8f',
  };
}

export function columns(
  gap?: number,
  style?: string,
  margin?: number[],
  ...content: any
) {
  const columns = {
    columns: [...content],
  } as any;

  gap ? (columns.columnGap = gap) : '';
  style ? (columns.style = style) : '';
  margin ? (columns.margin = margin) : '';

  return columns;
}

export function table(
  headerRows: number,
  widths: any[],
  style?: string,
  color?: string,
  ...content: any
) {
  const table = {
    table: {
      widths: widths,
      headerRows: headerRows,
      // keepWithHeaderRows: 1,
      body: [...content],
    },
  } as any;
  style ? (table.style = style) : '';
  color ? (table.color = color) : '';
  return table;
}

export function thead(...content: any) {
  return [...content];
}

export function tcol(colSpan?: any, ...content: any) {
  return colSpan
    ? [
        {
          text: 'Test',
        },
      ]
    : [...content];
}

export function trow(...content: any) {
  return [...content];
}

export function section(...content: any) {
  return {
    content,
  };
}

export function lineBreak() {
  return {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
  };
}

export function text(
  text: string,
  alignment?: 'left' | 'center' | 'right',
  style?: string
) {
  const tex = {
    text: text,
  } as any;
  alignment ? (tex.alignment = alignment) : '';
  style ? (tex.style = style) : '';
  return tex;
}

export function cell(
  text: string | number,
  alignment?: string,
  style?: string,
  rowSpan?: number,
  colSpan?: number
) {
  const cell = { text: `${text}` } as any;
  style ? (cell.style = style) : '';
  alignment ? (cell.alignment = alignment) : '';
  rowSpan ? (cell.rowSpan = rowSpan) : '';
  colSpan ? (cell.colSpan = colSpan) : '';
  return cell;
}
