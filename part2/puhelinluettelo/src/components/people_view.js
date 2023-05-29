const PersonRow = (props) => {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.number}</td>
        <td><button onClick={props.remove}>Delete</button></td>
      </tr>
    )
  }


const PeopleView = (props) => {
    if (props.people.length === 0) {
      return(<h3><i>No numbers to show</i></h3>)
    }
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th></th>
                </tr>
                {props.people.map(person =>
                    <PersonRow
                        key={person.id}
                        name={person.name}
                        number={person.number}
                        remove={() => props.remove(person.id, person.name)}
                    />
                )}
            </tbody>
        </table>
    )
}

export default PeopleView