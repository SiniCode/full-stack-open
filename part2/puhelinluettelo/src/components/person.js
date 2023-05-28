const Person = (props) => {
    return (
        <div>
            <p>{props.name} {props.number}</p>
            <button onClick={props.removePerson}>Delete</button>
        </div>
    )    
}

export default Person