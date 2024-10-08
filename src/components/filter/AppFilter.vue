<template>
  <div class="bg-black p-4">
    <div class="flex space-x-2 overflow-x-auto py-2">
      <button
        v-for="(category, index) in categories"
        :key="index"
        class="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full focus:outline-none whitespace-nowrap"
        :class="{ 'bg-white text-black': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const categories = ref([
      "Все",
      "Музыка",
      "Видеоигры",
      "АСМР",
      "Новости",
      "Сейчас в эфире",
      "Скетч-шоу",
      "Футбол",
      "Рэп",
      "Кулинария",
      "Мультфильмы",
      "Экшен и приключения",
    ]);

    const selectedCategory = ref("Все");

    return {
      categories,
      selectedCategory,
    };
  },
};
</script>

<style scoped></style>
