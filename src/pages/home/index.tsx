import React, { useEffect, useState } from "react";
import { RowData } from "../../utils/types";
import { fetchLalin } from "../../services";
import PaymentMethodDataComponent from "../../component/organism/payment-method-data-component";
import GateDataComponent from "../../component/organism/gate-data-component";
import BranchDataComponent from "../../component/organism/branch-data-components";
import ShiftDataComponent from "../../component/organism/shift-data-components";
import Card from "../../component/atom/card";
import { DateValueType } from "react-tailwindcss-datepicker";
import CustomDatePicker from "../../component/atom/input-date";

const Home: React.FC = () => {
  const [lalinData, setLalinData] = useState<RowData[] | null>(null);

  const [tanggal, setTanggal] = useState<DateValueType>({
    startDate: new Date("2023-11-01"),
    endDate: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedDate = tanggal?.startDate;
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split("T")[0]; // Format as needed
          const lalinResponse = await fetchLalin(formattedDate);
          setLalinData(lalinResponse.data?.rows?.rows);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tanggal]);

  const handleDateChange = (value: DateValueType) => {
    setTanggal(value);
  };

  console.log(JSON.stringify(tanggal), "ini"); // Log tanggal as a JSON string

  return (
    <div className="p-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <CustomDatePicker initialValue={tanggal} onChange={handleDateChange} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card>
          <PaymentMethodDataComponent data={lalinData ?? []} />
        </Card>
        <Card>
          <BranchDataComponent data={lalinData ?? []} />
        </Card>
        <Card>
          <GateDataComponent data={lalinData ?? []} />
        </Card>
        <Card>
          <ShiftDataComponent data={lalinData ?? []} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
