<template>
  <div class="relative">
    <div
      class="fixed top-16 left-0 h-full bg-black text-white shadow-lg transition-all duration-500 ease-in-out z-50"
      :class="{
        'w-16': !isSidebarOpen,
        'w-60': isSidebarOpen,
      }"
    >
      <ul class="mt-4 space-y-2 px-4">
        <router-link :to="{ name: 'AppHome' }">
          <li
            class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
          >
            <i class="pi pi-home text-xl"></i>
            <span v-if="isSidebarOpen" class="text-lg">Главная</span>
          </li>
        </router-link>
        <router-link to="/appshorts">
          <li
            class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
          >
            <i class="pi pi-video text-xl"></i>
            <span v-if="isSidebarOpen" class="text-lg">Shorts</span>
          </li>
        </router-link>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-users text-xl"></i>
          <span v-if="isSidebarOpen" class="text-lg">Подписки</span>
        </li>
        <hr class="my-2 border-gray-600" v-if="isSidebarOpen" />
        <li
          class="flex items-center justify-between hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <div class="flex items-center gap-3">
            <i class="pi pi-history text-xl"></i>
            <span v-if="isSidebarOpen" class="text-lg">История</span>
          </div>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-book text-xl"></i>
          <span v-if="isSidebarOpen" class="text-lg">Плейлисты</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-film text-xl"></i>
          <span v-if="isSidebarOpen" class="text-lg">Ваши видео</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-clock text-xl"></i>
          <span v-if="isSidebarOpen" class="text-lg">Смотреть позже</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-thumbs-up text-xl"></i>
          <span v-if="isSidebarOpen" class="text-lg">Понравившиеся</span>
        </li>
      </ul>
    </div>

    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
    >
      <i class="pi pi-align-justify text-xl text-white"></i>
    </button>

    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-transparent transition-opacity duration-500"
    ></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return {
      isSidebarOpen,
      toggleSidebar,
    };
  },
};
</script>

<style scoped></style>
