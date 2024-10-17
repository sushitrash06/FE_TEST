export interface TokenPayload {
  exp: number;
  iat: number;
  id: number;
  username: string;
}

export interface RowData {
  id: number;
  IdCabang: number;
  IdGerbang: number;
  Tanggal: string;
  Shift: number;
  Golongan: number;
  eMandiri: number;
  Tunai: number;
  DinasOpr: number,
  DinasMitra: number,
  DinasKary: number,
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
}

export interface lanlinResponse {
  code: number;
  data: { total_pages: 0; current_page: 1; count: 0; rows: {count: 0, rows: RowData[]} };
  message: string;
  status: boolean;
}

export interface Gerbang {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}


