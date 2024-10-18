<template>
  <div
    class="min-h-screen bg-black text-white flex items-center justify-center p-6"
  >
    <div class="w-full max-w-7xl mt-10">
      <div class="mb-6 overflow-x-auto">
        <Carousel :items-to-show="7" wrap-around class="flex gap-2">
          <Slide v-for="(filter, index) in filters" :key="index">
            <button
              @click="selectedFilter = filter"
              :class="{
                'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-black':
                  selectedFilter === filter,
                'bg-gray-800 text-gray-200': selectedFilter !== filter,
              }"
              class="px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition"
            >
              {{ filter }}
            </button>
          </Slide>
        </Carousel>
      </div>

      <div v-if="loading" class="text-center">
        <p>Loading videos...</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="(video, index) in filteredVideos"
          :key="index"
          class="bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:bg-gray-800"
        >
          <router-link :to="`/appsingle/${video.videoId}`" class="block">
            <img
              :src="video?.thumbnail ? video.thumbnail[2]?.url : defaultImage"
              alt="Video thumbnail"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold truncate">{{ video?.title }}</h3>
              <p class="text-gray-400 text-sm">{{ video?.channelTitle }}</p>
              <p class="text-gray-500 text-sm">
                {{ video?.viewCount }} views • {{ video?.publishDate }}
              </p>
              <p class="text-gray-600 text-xs">{{ video?.lengthText }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Carousel,
    Slide,
    RouterLink,
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

    const AllData = reactive({ videos: [] });
    const selectedFilter = ref("Hammasi");
    const loading = ref(true);
    const defaultImage =
      "https://media.istockphoto.com/id/1452662817/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=gjZN1wPOkEsxCCKjSIBBCVOAIoWVA_z26ougAPUAB7Q=";

    async function fetchVideos() {
      try {
        const response = await fetch("https://yt-api.p.rapidapi.com/trending", {
          headers: {
            "x-rapidapi-key":
              "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559",
            "x-rapidapi-host": "yt-api.p.rapidapi.com",
          },
        });
        const data = await response.json();
        console.log(data);

        AllData.videos = data?.data || [];
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        loading.value = false;
      }
    }

    const filteredVideos = computed(() =>
      selectedFilter.value === "Hammasi"
        ? AllData.videos
        : AllData.videos.filter((video) => video.type === selectedFilter.value)
    );

    onMounted(() => {
      fetchVideos();
    });

    return { filters, selectedFilter, filteredVideos, loading, defaultImage };
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}
</style>
