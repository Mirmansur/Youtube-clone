<template>
  <div class="p-10 bg-black min-h-screen text-white mt-14">
    <!-- Carousel Filter Bo'limi -->
    <div class="mb-8">
      <Carousel :items-to-show="7" class="mb-8">
        <Slide v-for="(filter, index) in filters" :key="index">
          <button
            @click="selectedFilter = filter"
            :class="{
              'bg-white text-black': selectedFilter === filter,
              'bg-gray-700 text-white': selectedFilter !== filter,
            }"
            class="px-4 py-2 rounded-lg m-1 transition-all duration-300 hover:bg-gray-600"
          >
            {{ filter }}
          </button>
        </Slide>
      </Carousel>
    </div>

    <!-- Videolar Tizimi -->
    <div class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="w-96 bg-black rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-800"
      >
        <router-link :to="`/appsingle/${video.id}`">
          <img
            :src="video.thumbnail"
            alt="Video thumbnail"
            class="w-full h-44 rounded-t-lg"
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
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Carousel,
    Slide,
  },
  setup() {
    const filters = ref([
      "Hammasi",
      "Musiqa",
      "O'yinlar",
      "ASMR",
      "Yangiliklar",
      "Sport",
      "Rap",
      "Pazandachilik",
      "Multfilmlar",
      "Action",
      "Komediya",
      "Kinolar",
    ]);

    const videos = ref([
      {
        id: 1,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+1",
        title: "OYOG'IM YERTILIB KETGANIDAN BOSHQA YURA OLMAYMAN! 21-22 KUN",
        channel: "ISOMTV",
        views: "51k views",
        time: "2 soat oldin",
      },
      {
        id: 2,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+2",
        title: "Shakar - ommaviy narkotik. Shakarsiz 30 kun!",
        channel: "Maqsad",
        views: "966k views",
        time: "1 yil oldin",
      },
      {
        id: 3,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+3",
        title: "KAMBAG'AL vs BOY TALABA",
        channel: "A4",
        views: "67M views",
        time: "2 yil oldin",
      },
      {
        id: 4,
        thumbnail: "https://via.placeholder.com/320x180?text=Video+4",
        title:
          "Venom 3 - syujet tahlili va titrlar tugagachgi sahnalar. Knavning rejalari fosh bo'ldi!",
        channel: "Axis Comics",
        views: "6.2k views",
        time: "3 soat oldin",
      },
    ]);

    const selectedFilter = ref("Hammasi");

    return { videos, filters, selectedFilter };
  },
};
</script>

<!-- Scoped Styles -->
<style scoped></style>
