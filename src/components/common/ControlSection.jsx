function ControlSection({placeholder, messageButton, onSearch, searchValue, onAdd}){
  return(
    <div className="control-section">
      <div className="search-box">
        <input 
          className="form-control" 
          type="text" 
          placeholder={placeholder} 
          id="searchInput"
          value={searchValue}
          onChange={onSearch}
        />
      </div>

      <button className="btn-add" onClick={onAdd}>
        {messageButton}
      </button>
    </div>
  );
}

export default ControlSection;