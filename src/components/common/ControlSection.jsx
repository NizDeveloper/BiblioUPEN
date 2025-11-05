function ControlSection({ placeholder, messageButton }) {
  return(
    <div className="control-section">
      <div className="search-box">
        <input className="form-" type="text" placeholder={placeholder} id="searchInput"/>
      </div>

      <button className="btn-add" id="add-button">
        { messageButton }
      </button>
    </div>
  );  
}

export default ControlSection;