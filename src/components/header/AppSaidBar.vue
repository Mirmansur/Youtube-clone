<template>
  <div class="relative">
    <div
      v-if="isSidebarOpen"
      class="fixed top-16 left-0 w-72 h-full bg-black text-white shadow-lg transition-transform duration-500 ease-in-out z-50"
      :class="{
        '-translate-x-full': !isSidebarOpen,
        'translate-x-0': isSidebarOpen,
      }"
    >
      <ul class="mt-4 space-y-2 px-4">
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-home text-xl"></i>
          <span class="text-lg">Главная</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-video text-xl"></i>
          <span class="text-lg">Shorts</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-users text-xl"></i>
          <span class="text-lg">Подписки</span>
        </li>
        <hr class="my-2 border-gray-600" />
        <li
          class="flex items-center justify-between hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <div class="flex items-center gap-3">
            <i class="pi pi-history text-xl"></i>
            <span class="text-lg">История</span>
          </div>
          <i class="pi pi-angle-right text-lg"></i>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-book text-xl"></i>
          <span class="text-lg">Плейлисты</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-film text-xl"></i>
          <span class="text-lg">Ваши видео</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-clock text-xl"></i>
          <span class="text-lg">Смотреть позже</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <i class="pi pi-thumbs-up text-xl"></i>
          <span class="text-lg">Понравившиеся</span>
        </li>
      </ul>
      <hr class="my-2 border-gray-600" />
      <!-- <h3 class="px-4 text-gray-400">Подписки</h3> -->
      <!-- <ul class="mt-4 space-y-2 px-4">
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <img
            src="https://placekitten.com/32/32"
            class="rounded-full"
            alt="Star TV"
          />
          <span class="text-lg">STAR TV</span>
          <span class="text-xs text-red-500">(LIVE)</span>
        </li>
        <li
          class="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all"
        >
          <img
            src="https://placekitten.com/32/32"
            class="rounded-full"
            alt="A4"
          />
          <span class="text-lg">A4</span>
          <span class="text-xs text-blue-500">•</span>
        </li>
      </ul> -->
    </div>

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

export default {
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
