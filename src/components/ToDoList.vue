<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

interface Todo {
  content: string
  done: boolean
  createdAt: number
}

const todos = ref<Todo[]>([])
const name = ref<string>('')

const input_content = ref<string>('')

const todos_asc = computed(() =>
  [...todos.value].sort((a, b) => {
    if (a.done === b.done) {
      return b.createdAt - a.createdAt
    }
    return a.done ? 1 : -1
  }),
)
const errorMessage = ref<string>('')

const addToDo = () => {
  if (input_content.value.trim() === '') {
    errorMessage.value = 'Exercise content cannot be empty!'
    return
  }

  todos.value.push({
    content: input_content.value,
    done: false,
    createdAt: Date.now(),
  })

  input_content.value = ''
  errorMessage.value = ''
}

const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter(t => t !== todo)
}

watch(
  todos,
  newVal => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  { deep: true },
)

watch(name, newVal => {
  localStorage.setItem('name', newVal)
})

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
})
</script>

<template>
  <main class="app">
    <section class="create-todo">
      <h1>WORKOUTS LIST</h1>
      <form @submit.prevent="addToDo">
        <h3>ADD NEW WORKOUT</h3>
        <input
          type="text"
          placeholder="e.g. 10000 push ups"
          v-model="input_content"
        />
        <input type="submit" value="Add exercise" />
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      </form>
    </section>

    <section class="todo-list">
      <h3>WORKOUTS LIST</h3>
      <div class="list-wrapper">
        <div class="list">
          <div
            v-for="todo in todos_asc"
            :key="todo.createdAt"
            :class="`todo-item ${todo.done ? 'done' : ''}`"
          >
            <label>
              <input type="checkbox" v-model="todo.done" />
              <span :class="`bubble`"></span>
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.content" />
            </div>

            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  padding: 40px;
  max-height: 100vh;
}

.todo-list {
  margin-top: 10px;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}

h3 {
  margin-bottom: 10px;
  font-weight: bold;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
}

.options {
  margin-bottom: 10px;
}

.list-wrapper {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  background-color: #f9f9f9;
  max-height: 35vh;
  max-width: 90vw;
  min-width: 70vh;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
}

.todo-content input {
  min-width: 300px;
  margin-left: 10px;
  padding: 10px;
  font-size: 18px;
  box-sizing: border-box;
  display: flex;
}

.actions {
  margin-left: 10px;
}

button.delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
}

.done input[type='text'] {
  text-decoration: line-through;
  color: #ccc;
}
</style>
