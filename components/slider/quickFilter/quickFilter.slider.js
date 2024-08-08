import { filterData } from '@/components/slider/quickFilter/data/filter.data';
import QuickFilterItemComponent from '@/components/slider/quickFilter/components/quickFilterItem.component';

const QuickFilterSlider = () => {
  return (
    <div className="filter-nav-list mb-28">
      <ul>
        {filterData.map(({ name, redirect, id }) => (
          <QuickFilterItemComponent key={id} name={name} redirect={redirect} />
        ))}
      </ul>
    </div>
  );
};

export default QuickFilterSlider;
