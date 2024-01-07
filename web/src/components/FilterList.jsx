function FilterList({ list, category, addFilter, searchFilter }) {
  return list.map((item, index) => (
    <div key={`${category}-${index}`} onClick={() => addFilter(item.name)}>
      <p
        className={`${
          searchFilter.includes(item.name)
            ? "bg-component-active font-bold px-4 py-2 rounded text-secondary-text "
            : ""
        }`}
      >
        {item.name}
      </p>
    </div>
  ));
}

export default FilterList;
