import React, { useState } from "react";
import PaymentMethodDataComponent from "../../component/organism/payment-method-data-component";
import GateDataComponent from "../../component/organism/gate-data-component";
import BranchDataComponent from "../../component/organism/branch-data-components";
import ShiftDataComponent from "../../component/organism/shift-data-components";
import Card from "../../component/atom/card";
import { DateValueType } from "react-tailwindcss-datepicker";
import CustomDatePicker from "../../component/atom/input-date";
import { useLalinData } from "../../services";

const Home: React.FC = () => {
  const [tanggal, setTanggal] = useState<DateValueType>({
    startDate: new Date("2023-11-01"),
    endDate: null,
  });

  const selectedDate = tanggal?.startDate ? tanggal.startDate.toISOString().split("T")[0] : null;
  const { data: lalinData, isLoading, isError } = useLalinData(selectedDate ?? ''); 

  const handleDateChange = (value: DateValueType) => {
    setTanggal(value);
  };

  return (
    <div className="p-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <CustomDatePicker initialValue={tanggal} onChange={handleDateChange} />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data</div>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card>
            <PaymentMethodDataComponent data={lalinData?.data?.rows?.rows ?? []} />
          </Card>
          <Card>
            <BranchDataComponent data={lalinData?.data?.rows?.rows ?? []} />
          </Card>
          <Card>
            <GateDataComponent data={lalinData?.data?.rows?.rows ?? []} />
          </Card>
          <Card>
            <ShiftDataComponent data={lalinData?.data?.rows?.rows ?? []} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Home;
