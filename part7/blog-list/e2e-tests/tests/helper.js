const resetDatabase = async (request) => {
	await request.post('/api/testing/reset')
	await request.post('/api/users', {
		data: {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen',
		},
	})
	await request.post('/api/users', {
		data: {
			name: 'Ted Tester',
			username: 'ted',
			password: 'tedsecret',
		},
	})
}

const login = async (page, username, password) => {
	await page.getByTestId('username').click()
	await page.keyboard.type(username)
	await page.getByTestId('password').click()
	await page.keyboard.type(password)
	await page.getByRole('Button', { name: 'Log in' }).click()
}

const createBlog = async (page, title, author, url) => {
	await page.getByRole('Button', { name: 'Create new blog' }).click()
	await page.getByTestId('title').click()
	await page.keyboard.type(title)
	await page.keyboard.press('Tab')
	await page.keyboard.type(url)
	await page.keyboard.press('Tab')
	await page.keyboard.type(author)
	await page.getByRole('Button', { name: 'Create' }).click()

	await page.getByRole('Link').getByText(`${title} by ${author}`).waitFor()
}

export { resetDatabase, login, createBlog }
