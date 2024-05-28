import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
	const notification = useNotificationValue()

	const style = {
		backgroundColor: 'lightgrey',
		margin: '10px',
		padding: '10px',
		border: '2px solid',
		borderRadius: '5px',
	}

	if (notification) {
		return <div style={style}>{notification}</div>
	}
}

export default Notification
