const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message.messageStyle}>
        {message.messageText}
      </div>
    )
  }
  
  export default Notification