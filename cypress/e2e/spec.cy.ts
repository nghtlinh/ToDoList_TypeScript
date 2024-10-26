describe('Todo App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clearLocalStorage()
  })

  it('should ensure the input box is present', () => {
    cy.get('input[class="input-field"]').should('exist')
  })

  it('should add a todo through input box and it should appear in the list', () => {
    const newTodo = '30-minute run'

    // Type the todo into the input box
    cy.get('input[placeholder="e.g. 10000 push ups"]').type(newTodo)

    // Click the submit button & Check if the new task is added
    cy.get('input[type="submit"]').click()

    cy.get('.todo-item')
      .find('.todo-content input')
      .should('have.value', newTodo)
  })

  it('should delete a todo task and the remaining todo list should contain only the second task', () => {
    const todoToAdd1 = '100 squats'
    const todoToAdd2 = '30-minute run'

    // Add two todos
    cy.get('input[placeholder="e.g. 10000 push ups"]').type(todoToAdd1)
    cy.get('input[type="submit"]').click()

    cy.get('input[placeholder="e.g. 10000 push ups"]').type(todoToAdd2)
    cy.get('input[type="submit"]').click()

    // Ensure both todos are present in the list
    cy.get('.todo-item').should('have.length', 2)

    // Click the delete button for the 2nd todo
    cy.get('.todo-item').first().find('button.delete').should('exist').click()

    // Assert that only the 1st todo remains
    cy.get('.todo-item').should('have.length', 1)
    cy.get('.todo-item')
      .find('.todo-content input')
      .should('have.value', todoToAdd1)
  })

  it('should mark a todo as done when the checkbox is checked', () => {
    const todoToAdd = '50 jumping jacks'

    // Add a todo
    cy.get('input[placeholder="e.g. 10000 push ups"]').type(todoToAdd)
    cy.get('input[type="submit"]').click()

    // Check the checkbox to mark the todo as done
    cy.get('.todo-item').find('label').click()

    // Verify that the todo item has the 'done' class
    cy.get('.todo-item')
      .should('have.class', 'done')
      .find('.todo-content input')
      .should(
        'have.css',
        'text-decoration',
        'line-through solid rgb(204, 204, 204)',
      )
  })

  it('should show an error message when trying to add an empty todo', () => {
    // Attempt to add an empty todo
    cy.get('input[type="submit"]').click()

    // Verify that the error message is displayed
    cy.get('p').should('have.text', 'Exercise content cannot be empty!')
  })

  it('should persist todos in local storage', () => {
    const todoToAdd = '20 push ups'

    // Add a todo
    cy.get('input[placeholder="e.g. 10000 push ups"]').type(todoToAdd)
    cy.get('input[type="submit"]').click()

    // Refresh the page to check for persistence
    cy.reload()

    // Verify that the todo still exists after reload
    cy.get('.todo-item')
      .find('.todo-content input')
      .should('have.value', todoToAdd)
  })

  it('should update the content of an existing todo', () => {
    const todoToAdd = '200 sit-ups'

    // Add a todo
    cy.get('input[placeholder="e.g. 10000 push ups"]').type(todoToAdd)
    cy.get('input[type="submit"]').click()

    // Update the content of the existing todo
    const updatedTodo = '300 sit-ups'
    cy.get('.todo-item').find('.todo-content input').clear().type(updatedTodo)

    // Verify that the todo content has been updated
    cy.get('.todo-item')
      .find('.todo-content input')
      .should('have.value', updatedTodo)
  })
})
