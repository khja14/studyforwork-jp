<template>
  <header>
    <div class="container">
      <div class="header__title">
        <!-- タイトル -->
        <a
          class="header__title_link"
          @click="openPage('')"
        >ヘッダータイトル</a>
      </div>
      <!-- メニュー -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="menu-btn__overwrite">
            <v-icon class="menu-btn-icon__overwrite" color="purple-darken-2" icon="mdi mdi-apps" size="x-large"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :value="index"
          >
            <div style="font-weight: 600;">{{ index + 1 }}. {{ item.cateogry }}</div>
            <v-list-item
              v-for="(item2, index2) in item.menus"
              :key="index2"
              :value="index2"
            >
              <v-list-item-title @click="openPage(item2.nextPage)">{{ item2.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </header>
</template> 

<script>
// 標準モジュール
import { useRouter } from 'vue-router';
// import { userManager, signOutRedirect } from "@/main.js";

// 外部モジュール

// 独自モジュール

export default {
  name: 'HeaderMenu',
  setup() {
  // ##########
  // 画面遷移 #
  // ##########
  // const router = useRouter()
  const openPage = async (target) => {
    alert(`画面遷移: ${target}`)
    // // ログイン
    // if (target === 'Login') {
    //   await userManager.signinRedirect();
    //   return
    // }
    // if (target === 'Logout') {
    //   await signOutRedirect();
    //   return
    // }
    // // それ以外
    // router.push(`/${target}`)
  }

  // ##########
  // メニュー #
  // ##########
  const menuItems = [
    { 
      cateogry: "マイページ", 
      menus: [
        {title: 'ログイン', nextPage: 'Login' },
        {title: 'マイページ', nextPage: 'MyPage' },
        {title: 'ログアウト', nextPage: 'Logout' },
      ]
    }
  ]

  
  return {
    // 画面遷移
    openPage,
    // メニュー
    menuItems,
  }
}
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>