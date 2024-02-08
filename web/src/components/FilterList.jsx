function FilterList({ list = [], category, addFilter, searchFilter }) {
    return list.map((item, index) => (
        <div
            className=" basis-full general-component items-center justify-center "
            key={`${category}-${index}`}
            onClick={() => addFilter(item.name)}
        >
            <p
                className={`px-4 py-2 rounded text-secondary-text ${
                    searchFilter.includes(item.name)
                        ? "bg-component-active font-bold  "
                        : ""
                }`}
            >
                {item.name[0].toUpperCase() + item.name.slice(1)}
            </p>
        </div>
    ));
}

export default FilterList;
