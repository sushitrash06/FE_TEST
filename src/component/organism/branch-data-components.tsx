import { filterByDateAndGroupByBranch } from '../../utils/filtered';
import { RowData } from '../../utils/types';
import BranchChart from '../molecules/traffic-chart';

interface BranchDataI {
    data: RowData[];
}

const BranchDataComponent: React.FC<BranchDataI> = ({data}) => {
  const branchData = filterByDateAndGroupByBranch(data);
  return (
    <div>
      <h2>Traffic by Branch</h2>
      <BranchChart data={branchData ?? []} />
    </div>
  );
};

export default BranchDataComponent;
