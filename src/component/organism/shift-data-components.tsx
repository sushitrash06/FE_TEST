import { filterByDateAndGroupByShift } from '../../utils/filtered';
import { RowData } from '../../utils/types';
import ShiftChart from '../molecules/shift-chart';

interface PaymentMethodI {
    data: RowData[]
}
const ShiftDataComponent: React.FC<PaymentMethodI> = ({data}) => {
const DataShift = filterByDateAndGroupByShift(data);
  return (
    <div>
      <ShiftChart data={DataShift ?? []} />
    </div>
  );
};

export default ShiftDataComponent
