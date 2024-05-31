const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDatabase, login, createBlog } = require('./helper')

describe('Blog list app', () => {
	beforeEach(async ({ page, request }) => {
		await resetDatabase(request)
		await page.goto('')
	})

	test('Login form is shown', async ({ page }) => {
		await expect(page.getByTestId('username')).toBeVisible()
		await expect(page.getByTestId('password')).toBeVisible()
	})

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await page.getByTestId('username').click()
			await page.keyboard.type('mluukkai')
			await page.getByTestId('password').click()
			await page.keyboard.type('salainen')
			await page.getByRole('Button', { name: 'Log in' }).click()

			await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
		})

		test('fails with wrong credentials', async ({ page }) => {
			await page.getByTestId('username').click()
			await page.keyboard.type('mluukkai')
			await page.keyboard.press('Tab')
			await page.keyboard.type('wrong')
			await page.getByRole('Button', { name: 'Log in' }).click()

			await expect(page.getByText('Invalid credentials!')).toBeVisible()
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
			await page.getByRole('Button', { name: 'Create new blog' }).click()

			await page.getByTestId('title').click()
			await page.keyboard.type('Testing with Playwright')
			await page.keyboard.press('Tab')
			await page.keyboard.type('http//:example.com')
			await page.keyboard.press('Tab')
			await page.keyboard.type('Ted Tester')
			await page.getByRole('Button', { name: 'Create' }).click()

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
				await expect(page.getByText('Number of likes:0Like')).toBeVisible()
				await page.getByRole('Button', { name: 'Like' }).click()
				await expect(page.getByText('Number of likes:1Like')).toBeVisible()
			})

			test('it can be deleted by the creator', async ({ page }) => {
				await page
					.getByRole('Link')
					.getByText('Testing with Playwright')
					.click()

				page.on('dialog', async (dialog) => {
					await dialog.accept()
				})
				await page.getByRole('Button', { name: 'Delete' }).click()

				await expect(
					page.getByText(
						"Blog 'Testing with Playwright' by Ted Tester deleted."
					)
				).toBeVisible()
				await expect(
					page.getByRole('Button', { name: 'Create new blog' })
				).toBeVisible()
				await expect(
					page.getByRole('Link').getByText('Testing with Playwright')
				).toBeHidden()
			})

			test('it can not be deleted by other users', async ({ page }) => {
				await page.getByRole('Button', { name: 'Log out' }).click()
				await login(page, 'ted', 'tedsecret')

				await page
					.getByRole('Link')
					.getByText('Testing with Playwright')
					.click()
				await expect(
					page.getByRole('Button', { name: 'Delete' })
				).not.toBeVisible()
			})
		})
	})
})
