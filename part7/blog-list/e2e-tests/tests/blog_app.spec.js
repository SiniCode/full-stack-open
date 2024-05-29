const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDatabase, login, createBlog, likeTimes } = require('./helper')

describe('Note app', () => {
	beforeEach(async ({ page, request }) => {
		await resetDatabase(request)
		await page.goto('')
	})

	test('Login form is shown', async ({ page }) => {
		await expect(page.getByText('Username:')).toBeVisible()
		await expect(page.getByText('Password:')).toBeVisible()
	})

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await page.getByTestId('username').fill('mluukkai')
			await page.getByTestId('password').fill('salainen')
			await page.getByRole('button', { name: 'Log in' }).click()

			await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
		})

		test('fails with wrong credentials', async ({ page }) => {
			await page.getByTestId('username').fill('mluukkai')
			await page.getByTestId('password').fill('wrong')
			await page.getByRole('button', { name: 'Log in' }).click()

			await expect(page.getByText('Wrong credentials')).toBeVisible()
			await expect(
				page.getByText('Matti Luukkainen logged in')
			).not.toBeVisible()
		})
	})

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await login(page, 'mluukkai', 'salainen')
		})

		test('a new blog can be created', async ({ page }) => {
			await page.getByRole('button', { name: 'create new blog' }).click()

			await page.getByTestId('title').fill('Testing with Playwright')
			await page.getByTestId('author').fill('Ted Tester')
			await page.getByTestId('url').fill('http//:example.com')
			await page.getByRole('button', { name: 'Create' }).click()

			await expect(
				page.getByText('Testing with Playwright by Ted Tester')
			).toBeVisible()
		})

		describe('and a blog exists', () => {
			beforeEach(async ({ page }) => {
				await createBlog(
					page,
					'Testing with Playwright',
					'Ted Tester',
					'http//:example.com'
				)
			})

			test('it can be liked', async ({ page }) => {
				await page
					.getByRole('Link')
					.getByText('Testing with Playwright')
					.click()
				await expect(page.getByText('This blog has 0 likes.')).toBeVisible()
				await page.getByRole('button', { name: 'Like' }).click()
				await expect(page.getByText('This blog has 1 likes.')).toBeVisible()
			})

			test('it can be deleted by the creator', async ({ page }) => {
				await page
					.getByRole('Link')
					.getByText('Testing with Playwright')
					.click()

				page.on('dialog', async (dialog) => {
					await dialog.accept()
				})
				await page.getByRole('button', { name: 'Delete' }).click()

				await expect(
					page.getByText('Blog Testing with Playwright by Ted Tester deleted')
				).toBeVisible()
				await expect(
					page.getByRole('button', { name: 'Create new blog' })
				).toBeVisible()
				await expect(
					page.getByRole('Link').getByText('Testing with Playwright')
				).toBeHidden()
			})

			test('it can not be deleted by other users', async ({ page }) => {
				await page.getByRole('button', { name: 'Log out' }).click()
				await login(page, 'ted', 'tedsecret')

				await page
					.getByRole('Link')
					.getByText('Testing with Playwright')
					.click()
				await expect(
					page.getByRole('button', { name: 'Delete' })
				).not.toBeVisible()
			})
		})
	})
})
