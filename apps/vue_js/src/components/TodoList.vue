<template>
  <div class="todo-list-container">
    <!-- 入力フォーム -->
    <v-form @submit.prevent="addTodo" ref="formRef" class="todo-form">
      <v-text-field
        v-model="newTodo.title"
        label="タイトル"
        required
        class="form-field"
      ></v-text-field>
      <v-text-field
        v-model="newTodo.content"
        label="内容"
        required
        class="form-field"
      ></v-text-field>
      <v-text-field
        v-model="newTodo.date"
        label="日付"
        type="date"
        required
        class="form-field"
      ></v-text-field>
      <v-btn color="primary" type="submit" class="save-btn">保存</v-btn>
    </v-form>

    <!-- Todoリスト -->
     {{ todos }}
    <v-data-table
      :headers="headers"
      :items="todos"
      item-key="id"
      class="todo-table"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      @update:sort-by="updateSort"
      @update:sort-desc="updateSortDesc"
      hide-default-footer
      dense
    >
      <template #item.actions="{ item }">
        <v-btn icon color="error" @click="deleteTodo(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template #no-data>
        <tr>
          <td colspan="4" class="text-center">Todoがありません</td>
        </tr>
      </template>
    </v-data-table>
    
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const headers = [
  { text: 'タイトル', value: 'title', sortable: true },
  { text: '内容', value: 'content', sortable: true },
  { text: '日付', value: 'date', sortable: true },
  { text: '操作', value: 'actions', sortable: false },
]

const todos = ref([])
const newTodo = reactive({
  title: '',
  content: '',
  date: '',
})

const formRef = ref(null)
const sortBy = ref('date')
const sortDesc = ref(false)

function addTodo() {
  if (!newTodo.title || !newTodo.content || !newTodo.date) return
  // 新しい配列を作成して再代入（Vue reactivityのため）
  todos.value = [
    ...todos.value,
    {
      id: Date.now(),
      title: newTodo.title,
      content: newTodo.content,
      date: newTodo.date,
    }
  ]
  newTodo.title = ''
  newTodo.content = ''
  newTodo.date = ''
  if (formRef.value) formRef.value.resetValidation()
}

function deleteTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function updateSort(val) {
  sortBy.value = val
}
function updateSortDesc(val) {
  sortDesc.value = val
}
</script>

<style scoped>
.todo-list-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.todo-form {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.form-field {
  flex: 1 1 180px;
  min-width: 120px;
}
.save-btn {
  align-self: flex-end;
  min-width: 80px;
}
.todo-table {
  width: 100%;
}
.text-center {
  text-align: center;
}
</style>