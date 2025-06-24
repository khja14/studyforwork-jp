<template>
  <v-app>
    <HeaderMenu />
    <v-main>
      <v-container class="mt-10">
        <!--  -->
        <br><br><br><br><br>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" color="primary">
              メニューを開く
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="showRandomString">
              <v-list-item-title>アクション1</v-list-item-title>
            </v-list-item>
            <v-list-item @click="showRandomString">
              <v-list-item-title>アクション2</v-list-item-title>
            </v-list-item>
            <v-list-item @click="showRandomString">
              <v-list-item-title>アクション3</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
        <br><br><br><br><br>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" class="menu-btn__overwrite">
              <v-icon class="menu-btn-icon__overwrite" color="purple-darken-2" icon="mdi mdi-apps" size="x-large"></v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="showRandomString">
              <v-list-item-title>アクション1</v-list-item-title>
            </v-list-item>
            <v-list-item @click="showRandomString">
              <v-list-item-title>アクション2</v-list-item-title>
            </v-list-item>
            <v-list-item @click="showRandomString">
              <v-list-item-title>アクション3</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
      <v-container class="mt-5">
        <v-btn color="secondary" @click="showRandomString">ランダムな文字列を表示</v-btn>
      </v-container>
      <br><br><br><br><br>
      <div v-if="randomString" class="mt-3" style="font-size: 1.2em;">
        {{ randomString }}
      </div>
      <!-- ToDOリストを↓に追加する -->
       <TodoList></TodoList>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import HeaderMenu from './components/HeaderMenu.vue'
import TodoList from './components/TodoList.vue'

const randomString = ref('')

function showRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  randomString.value = result
}
</script>