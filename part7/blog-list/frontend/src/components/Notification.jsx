import { Alert } from '@mui/material'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
	const notification = useNotificationValue()

	if (notification) {
		return (
			<Alert icon={false} color='secondary'>
				{notification}
			</Alert>
		)
	}
}

export default Notification
