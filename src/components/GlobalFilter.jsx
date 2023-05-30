import { useAsyncDebounce } from 'react-table';
import { useState } from 'react';

const GlobalFilter = ({ globalFilter, setGlobalFilter, placeholder }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  },200);
  return(
    <span className="flex justify-between pt-10 pb-10">
      <input
        value={value||""}
        onChange={e=>{
        setValue(e.target.value);
        onChange(e.target.value);
        }}
        className="w-8/12 rounded-xl border p-4 text-gray-500 cursor-pointer"
        type="search"
        placeholder='Buscar dan...'
      />
    </span>
  );
};

export default GlobalFilter;
