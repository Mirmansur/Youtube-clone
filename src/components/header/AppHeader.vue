<template lang="html">
  <div class="bg-black fixed top-0 left-0 z-10 w-full">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between py-3">
        <div class="flex items-center gap-4">
          <AppSaidBar />
          <router-link to="/">
            <button class="flex items-center gap-2">
              <i class="pi pi-youtube text-red-600 text-3xl md:text-4xl"></i>
              <h1 class="text-white text-xl md:text-2xl font-bold">YouTube</h1>
            </button>
          </router-link>
        </div>

        <div
          class="flex items-center w-full max-w-full md:max-w-2xl mx-4 mt-3 md:mt-0"
        >
          <form action="" class="flex w-full">
            <input
              type="text"
              placeholder="Введите запрос"
              class="w-full p-2 bg-black text-white rounded-l-full focus:outline-none focus:ring-2 border border-gray-600"
            />
            <button
              class="bg-gray-700 hover:bg-gray-600 p-2.5 rounded-r-full transition-all duration-200"
            >
              <i class="pi pi-search text-white"></i>
            </button>
          </form>

          <button
            class="bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-200 ml-2"
          >
            <i class="pi pi-microphone text-white p-3 text-2xl"></i>
          </button>
        </div>

        <div class="flex items-center gap-2 md:gap-4 mt-3 md:mt-0">
          <button
            class="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm md:text-base"
          >
            <i class="pi pi-plus text-white"></i>
            <span class="text-white hidden md:block text-xl">Создать</span>
          </button>
          <button
            class="hover:bg-gray-600 p-2 rounded-full transition-all duration-200"
          >
            <i class="pi pi-bell text-lg md:text-xl text-white"></i>
          </button>
          <button
            class="hover:bg-gray-700 p-2 rounded-full transition-all duration-200"
          >
            <i class="pi pi-user text-lg md:text-xl text-white"></i>
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
