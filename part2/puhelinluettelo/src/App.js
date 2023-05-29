import { useState, useEffect } from 'react'
import peopleService from './services/people'
import PeopleView from './components/people_view'
import PersonForm from './components/person_form'
import FilterInput from './components/filter_input'
import Notification from './components/notification'

const App = () => {
  const [people, setPeople] = useState([])
  const [peopleToShow, setPeopleToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
        setPeopleToShow(initialPeople)
      })
  }, [])

  const updateMessage = (messageText, messageStyle) => {
    setMessage({messageText: messageText, messageStyle: messageStyle})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const names = people.map(person => person.name)
    if (names.includes(newName)) {
      if (window.confirm(
        `${newName} is already in the phonebook, replace the old number with this one?`)) {
          const person = people.find(p => p.name === newName)
          const changedPerson = { ...person, number: newNumber }
  
          peopleService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              updateMessage(
                `The number of ${returnedPerson.name} is now ${returnedPerson.number}.`,
                'success'
              )
              setPeople(people.map(p => p.id !== person.id ? p : returnedPerson))
              setPeopleToShow(peopleToShow.map(p => p.id !== person.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              updateMessage(
                `${person.name} was already deleted from server.`,
                'error'
              )
              setPeople(people.filter(p => p.id !== person.id))
              setPeopleToShow(peopleToShow.filter(p => p.id !== person.id))
            })
        }  
    }
    
    else {
      const personObject = {name: newName, number: newNumber}
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          updateMessage(
            `${returnedPerson.name} is now in the phonebook.`,
            'success'
          )
          setPeople(people.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          if (newName.toLowerCase().includes(newSearch.toLowerCase())) {
            setPeopleToShow(peopleToShow.concat(returnedPerson))
          }
        })
    }
  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => {
    const searchWord = event.target.value
    const isMatch = (personObject) => {
      const person = personObject.name.concat(personObject.number).toLowerCase()
      return person.includes(searchWord.toLowerCase())
    }
    setNewSearch(searchWord)
    setPeopleToShow(people.filter(isMatch))
  }

  const removePerson = (id, personName) => {
    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      peopleService
        .remove(id)
        .then(returnedData => {
          updateMessage(
            `${personName} was removed from the phonebook.`,
            'success'
          )
          setPeople(people.filter(person => person.name !== personName))
          setPeopleToShow(peopleToShow.filter(person => person.name !== personName))
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div className='phonebook'>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <h2>Add new number</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Search numbers</h2>
      <FilterInput
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>Numbers</h2>
      <PeopleView
        people={peopleToShow}
        remove={removePerson}
      />
    </div>
  )
}

export default App
