<template lang="html">
  <div class="p-6 bg-black min-h-screen text-white flex flex-col items-center">
    <div class="w-full max-w-screen-lg">
      <h1 class="text-3xl font-bold mb-4">{{ video.title }}</h1>

      <div class="relative w-full h-64 md:h-80 mb-4 overflow-hidden">
        <img
          :src="video.thumbnail"
          alt="Video thumbnail"
          class="w-full h-full object-cover rounded-md"
        />
        <div
          class="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-md text-sm"
        >
          NmaGap
        </div>
      </div>

      <div class="flex justify-between items-center mb-4">
        <div>
          <p class="text-lg text-gray-300">{{ video.channel }}</p>
          <p class="text-sm text-gray-500">
            {{ video.views }} • {{ video.time }}
          </p>
        </div>
      </div>

      <p class="text-base mb-6">{{ video.description }}</p>

      <div class="flex items-center gap-4 mb-6">
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Like
        </button>
        <button
          class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Share
        </button>
        <button
          class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Download
        </button>
      </div>
    </div>

    <div class="w-full max-w-screen-lg mt-8">
      <h2 class="text-2xl font-bold mb-4">Similar Videos</h2>
      <div class="flex gap-4 overflow-x-scroll">
        <div
          v-for="(similarVideo, index) in similarVideos"
          :key="index"
          class="w-60 bg-gray-800 rounded-md overflow-hidden flex-shrink-0"
        >
          <img
            :src="similarVideo.thumbnail"
            alt="Similar video thumbnail"
            class="w-full h-32 object-cover"
          />
          <div class="p-3">
            <h3 class="text-lg font-semibold mb-2">{{ similarVideo.title }}</h3>
            <p class="text-sm text-gray-400">{{ similarVideo.channel }}</p>
            <p class="text-xs text-gray-500">
              {{ similarVideo.views }} • {{ similarVideo.time }}
            </p>
          </div>
        </div>
      </div>
    </div>
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
