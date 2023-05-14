const Header = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}
  
const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
}
  
const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
}
  
const Total = ({parts}) => {
    const total = parts.reduce((result, part) => result + part.exercises, 0)
    return (
      <div>
        <p><b>Number of exercises: {total}</b></p>
      </div>
    )
}
  
const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course