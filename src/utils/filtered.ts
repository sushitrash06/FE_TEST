import { RowData } from "./types";


export const filterByDateAndSumPayments = (rows: RowData[]) => {
  const paymentTotals = rows.reduce(
    (totals, row) => {
      totals.BCA += row.eBca;
      totals.BRI += row.eBri;
      totals.BNI += row.eBni;
      totals.DKI += row.eDKI;
      totals.Mandiri += row.eMandiri;
      totals.DinasKary += row.DinasKary;
      totals.DinasMitra += row.DinasMitra;
      totals.DinasOpr += row.DinasOpr;
      totals.Tunai += row.Tunai;
      return totals;
    },
    {
      BCA: 0,
      BRI: 0,
      BNI: 0,
      DKI: 0,
      Mandiri: 0,
      Tunai: 0,
      DinasOpr: 0,
      DinasMitra: 0,
      DinasKary: 0,
    }
  );

  return paymentTotals;
};


export const filterByDateAndGroupByGate = (rows: RowData[]) => {
  const gateTotals = rows.reduce((totals, row) => {
    if (!totals[row.IdGerbang]) {
      totals[row.IdGerbang] = 0;
    }
    totals[row.IdGerbang] +=
      row.eMandiri +
      row.eBri +
      row.eBni +
      row.eBca +
      row.eNobu +
      row.eDKI +
      row.eMega +
      row.DinasKary +
      row.DinasMitra +
      row.DinasOpr +
      row.Tunai
    return totals;
  }, {} as { [key: number]: number });

  const result = Object.entries(gateTotals).map(([gateId, trafficCount]) => ({
    gateName: `Gate ${gateId}`,
    trafficCount,
  }));

  return result;
};


export const filterByDateAndGroupByBranch = (rows: RowData[]) => {
  const branchTotals = rows.reduce((totals, row) => {
    if (!totals[row.IdCabang]) {
      totals[row.IdCabang] = 0;
    }
    totals[row.IdCabang] +=
      row.eMandiri +
      row.eBri +
      row.eBni +
      row.eBca +
      row.eNobu +
      row.eDKI +
      row.eMega +
      row.DinasKary +
      row.DinasMitra +
      row.DinasOpr +
      row.Tunai
    return totals;
  }, {} as { [key: number]: number });

  const result = Object.entries(branchTotals).map(([branchId, trafficCount]) => ({
    branchName: `Branch ${branchId}`,
    trafficCount,
  }));

  return result;
};

export const filterByDateAndGroupByShift = (rows: RowData[]) => {
  const shiftTotals = rows.reduce(
    (totals: { [key: string]: number }, row) => {
      const shiftKey = `shift${row.Shift}`;
      if (!totals[shiftKey]) {
        totals[shiftKey] = 0;
      }
      totals[shiftKey] +=
        row.eMandiri +
        row.eBri +
        row.eBni +
        row.eBca +
        row.eNobu +
        row.eDKI +
        row.eMega +
        row.DinasKary +
        row.DinasMitra +
        row.DinasOpr +
        row.Tunai
      return totals;
    },
    { shift1: 0, shift2: 0, shift3: 0 }
  );
  const { shift1 = 0, shift2 = 0, shift3 = 0 } = shiftTotals;

  return { shift1, shift2, shift3 };
};


