const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div>
          <b>Name:</b>
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          <b>Number:</b>
          <input value={props.newNumber} onChange={props.handleNumberChange} />
          <button type="submit" className="addButton">Add to phonebook</button>
        </div>
      </form>
    )
}

export default PersonForm