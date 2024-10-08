<template lang="html">
  <div class="p-10 bg-black min-h-screen text-white">
    <h1 class="text-2xl font-bold mb-4">{{ video.title }}</h1>
    <img
      :src="video.thumbnail"
      alt="Video thumbnail"
      class="w-full h-64 mb-4"
    />
    <p class="text-lg text-gray-400 mb-2">{{ video.channel }}</p>
    <p class="text-sm text-gray-500 mb-2">
      {{ video.views }} • {{ video.time }}
    </p>
    <p class="text-base">{{ video.description }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const videoId = route.params.id;

    const videos = ref([
      {
        id: 1,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+1",
        title: "OYOG'IM YERTILIB KETGANIDAN BOSHQA YURA OLMAYMAN! 21-22 KUN",
        channel: "ISOMTV",
        views: "51k views",
        time: "2 hours ago",
        description: "Bu video haqida batafsil ma'lumot kiritilishi mumkin...",
      },
      {
        id: 2,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+2",
        title: "Shakar - ommaviy narkotik. Shakarsiz 30 kun!",
        channel: "Maqsad",
        views: "966k views",
        time: "1 year ago",
        description: "Shakar haqida to'liq ma'lumot kiritish mumkin...",
      },
      {
        id: 3,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+3",
        title: "БЕДНЫЙ vs БОГАТЫЙ СТУДЕНТ",
        channel: "A4",
        views: "67M views",
        time: "2 years ago",
        description: "Bu yerda qiziqarli faktlar mavjud...",
      },
      {
        id: 4,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+4",
        title:
          "Веном 3 - разбор сюжета и сцены после титров. План Кнала раскрыт!",
        channel: "Axis Comics",
        views: "6.2k views",
        time: "3 hours ago",
        description: "Bu video Venom 3 filmi haqida...",
      },
    ]);

    const video = videos.value.find((v) => v.id === parseInt(videoId));

    return { video };
  },
};
</script>

<style scoped></style>
