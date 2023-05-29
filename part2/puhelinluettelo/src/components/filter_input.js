const FilterInput = (props) => {
    return (
      <div>
        <b>Filter shown with:</b>
        <input value={props.newSearch} onChange={props.handleSearchChange} />
      </div>
    )
}

export default FilterInput