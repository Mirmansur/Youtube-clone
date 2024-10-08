<template>
  <div class="p-10 bg-black min-h-screen text-white mt-14">
    <div class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="w-96 bg-black rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:bg-black"
      >
        <router-link :to="`/appsingle/${video.id}`">
          <img
            :src="video.thumbnail"
            alt="Video thumbnail"
            class="w-full h-44 rounded-lg"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ video.title }}</h3>
            <p class="text-gray-400 text-sm">{{ video.channel }}</p>
            <p class="text-gray-500 text-sm">
              {{ video.views }} • {{ video.time }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const videos = ref([
      {
        id: 1,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+1",
        title: "OYOG'IM YERTILIB KETGANIDAN BOSHQA YURA OLMAYMAN! 21-22 KUN",
        channel: "ISOMTV",
        views: "51k views",
        time: "2 hours ago",
      },
      {
        id: 2,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+2",
        title: "Shakar - ommaviy narkotik. Shakarsiz 30 kun!",
        channel: "Maqsad",
        views: "966k views",
        time: "1 year ago",
      },
      {
        id: 3,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+3",
        title: "БЕДНЫЙ vs БОГАТЫЙ СТУДЕНТ",
        channel: "A4",
        views: "67M views",
        time: "2 years ago",
      },
      {
        id: 4,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+4",
        title:
          "Веном 3 - разбор сюжета и сцены после титров. План Кнала раскрыт!",
        channel: "Axis Comics",
        views: "6.2k views",
        time: "3 hours ago",
      },
    ]);

    return { videos };
  },
};
</script>

<style scoped></style>
