import { filterByDateAndSumPayments } from '../../utils/filtered';
import { RowData } from '../../utils/types';
import PaymentMethodChart from '../molecules/payment-method-chart';

interface PaymentMethodI {
    data: RowData[]
}
const PaymentMethodDataComponent: React.FC<PaymentMethodI> = ({data}) => {
const paymentMethodData = filterByDateAndSumPayments(data);
console.log(paymentMethodData)
  return (
    <div>
      <PaymentMethodChart data={paymentMethodData ?? []} />
    </div>
  );
};

export default PaymentMethodDataComponent
