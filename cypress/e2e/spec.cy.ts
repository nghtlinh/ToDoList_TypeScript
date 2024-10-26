describe('Todo App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clearLocalStorage()
  })

  it('should ensure the input box is present', () => {
    cy.get('input[placeholder="e.g. 10000 push ups"]').should('exist')
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
})
