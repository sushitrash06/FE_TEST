import React, { useEffect, useState } from "react";
import { RowData } from "../../utils/types";
import { fetchLalin } from "../../services";
import PaymentMethodDataComponent from "../../component/organism/payment-method-data-component";
import GateDataComponent from "../../component/organism/gate-data-component";
import BranchDataComponent from "../../component/organism/branch-data-components";
import ShiftDataComponent from "../../component/organism/shift-data-components";
import Card from "../../component/atom/card";

const Home: React.FC = () => {
  const [lalinData, setLalinData] = useState<RowData[] | null>(null);
  const [tanggal, setTanggal] = useState<string>("2023-11");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lalinResponse = await fetchLalin(tanggal);
        setLalinData(lalinResponse.data?.rows?.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tanggal]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card title="Traffic by Payment Method">
        <PaymentMethodDataComponent data={lalinData ?? []} />
      </Card>
      <Card title="Traffic by Branch">
        <BranchDataComponent data={lalinData ?? []} />
      </Card>
      <Card title="Traffic by Gate">
        <GateDataComponent data={lalinData ?? []} />
      </Card>
      <Card title="Traffic by Shift">
        <ShiftDataComponent data={lalinData ?? []} />
      </Card>
    </div>
  );
};

export default Home;
