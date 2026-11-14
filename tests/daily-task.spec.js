const { test, expect } = require('@playwright/test');

test('user can manage daily tasks', async ({ page }) => {
  // Step 1: Open the Todo app
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Step 2: Find the task input box
  const taskInput = page.getByPlaceholder('What needs to be done?');

  // Step 3: Add three daily tasks
  await taskInput.fill('Submit assignment');
  await taskInput.press('Enter');
  await taskInput.fill('Prepare meeting notes');
  await taskInput.press('Enter');
  await taskInput.fill('Pay electricity bill');
  await taskInput.press('Enter');

  // Step 4: Verify all three tasks are added
  await expect(page.getByText('Submit assignment')).toBeVisible();
  await expect(page.getByText('Prepare meeting notes')).toBeVisible();
  await expect(page.getByText('Pay electricity bill')).toBeVisible();

  // Step 5: Verify total task count
  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(3);

  // Step 6: Edit the second task with a double-click
  const taskToEdit = todoItems.filter({ hasText: 'Prepare meeting notes' });
  await taskToEdit.locator('label').dblclick();
  const editInput = taskToEdit.locator('input.edit');
  await editInput.fill('Review meeting notes');
  await editInput.press('Enter');
  await expect(page.getByText('Review meeting notes')).toBeVisible();
  await expect(page.getByText('Prepare meeting notes')).not.toBeVisible();

  // Step 7: Mark first task as completed
  await todoItems.nth(0).getByRole('checkbox').check();

  // Step 8: Go to Completed filter
  await page.getByRole('link', { name: 'Completed' }).click();

  // Step 9: Verify only completed task is visible
  await expect(page.getByText('Submit assignment')).toBeVisible();
  await expect(page.getByText('Review meeting notes')).not.toBeVisible();
  await expect(page.getByText('Pay electricity bill')).not.toBeVisible();

  // Step 10: Clear completed task
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 11: Verify completed task is removed
  await expect(page.getByText('Submit assignment')).not.toBeVisible();
});
