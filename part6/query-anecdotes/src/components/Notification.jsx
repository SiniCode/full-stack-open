import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notification = useNotificationValue()

  if (notification) {
    return(
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification
