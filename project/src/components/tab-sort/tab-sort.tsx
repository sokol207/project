import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {SortList} from '../../const';
import {getSortBy} from '../../store/data-process/selectors';
import {setSort} from '../../store/data-process/data-process';

function TabSort(){
  const [isClickPopular,setIsClickPopular] = React.useState(false);
  const dispatch = useAppDispatch();
  const curSort = useAppSelector(getSortBy);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={()=>{setIsClickPopular((_isClickPopular) => !_isClickPopular);}}>
        {curSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isClickPopular &&
        <ul className="places__options places__options--custom places__options--opened">
          {SortList.map((sortName,id)=>{
            const keyValue = `${id}-${sortName}`;
            return (<li key={keyValue} onClick={()=>dispatch(setSort(sortName))} className={(curSort === sortName) ? 'places__option places__option--active' : 'places__option'} tabIndex={0}>{sortName}</li>);
          })}
        </ul>}
    </form>
  );
}
export default React.memo(TabSort);
