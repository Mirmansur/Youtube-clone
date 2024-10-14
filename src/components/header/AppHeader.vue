<template lang="html">
  <div class="bg-black fixed top-0 left-0 ring-0 z-10 w-full">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-around py-3">
        <div class="flex items-center gap-4">
          <AppSaidBar />
          <router-link to="/"
            ><button class="flex items-center gap-2">
              <i class="pi pi-youtube text-red-600 text-4xl"></i>
              <h1 class="text-white text-2xl font-bold">YouTube</h1>
            </button></router-link
          >
        </div>

        <div class="flex items-center w-full max-w-2xl mx-4">
          <input
            type="text"
            placeholder="Введите запрос"
            class="w-full p-2.5 bg-black text-white rounded-l-full focus:outline-none focus:ring-2 border border-gray-600"
          />
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-r-full transition-all duration-200"
          >
            <i class="pi pi-keyboard text-white"></i>
          </button>
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-full transition-all duration-200 ml-2"
          >
            <i class="pi pi-search text-white"></i>
          </button>
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-full transition-all duration-200 ml-2"
          >
            <i class="pi pi-microphone text-white"></i>
          </button>
        </div>

        <div class="flex items-center gap-4">
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-full flex items-center gap-2 transition-all duration-200"
          >
            <i class="pi pi-plus text-white"></i>
            <span class="text-white">Создать</span>
          </button>
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-full transition-all duration-200"
          >
            <i class="pi pi-bell text-xl text-white"></i>
          </button>
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-full transition-all duration-200"
          >
            <i class="pi pi-user text-xl text-white"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AppSaidBar from "./AppSaidBar.vue";

export default {
  components: {
    AppSaidBar,
  },
  setup() {
    const store = useStore();
    const isSidebarOpen = computed(() => store.state.isSidebarOpen);

    const toggleSidebar = () => {
      store.commit("SET_SIDEBAR_OPEN", !isSidebarOpen.value);
    };

    return { isSidebarOpen, toggleSidebar };
  },
};
</script>

<style lang="css"></style>
