import React from "react";
import Select from "@/components/atoms/Select";

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <Select
          key={filter.name}
          label={filter.label}
          value={filter.value}
          onChange={(e) => onFilterChange(filter.name, e.target.value)}
          options={filter.options}
          className="min-w-[200px]"
        />
      ))}
    </div>
  );
};

export default FilterBar;