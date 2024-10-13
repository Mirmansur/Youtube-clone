<template>
  <div class="p-10 bg-black min-h-screen text-white mt-14">
    <!-- Filterlar carousel -->
    <div class="mb-8">
      <Carousel :items-to-show="7" class="mb-8">
        <Slide v-for="(filter, index) in filters" :key="index">
          <button
            @click="selectedFilter = filter"
            :class="{
              'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-black':
                selectedFilter === filter,
              'bg-gray-800 text-gray-200': selectedFilter !== filter,
            }"
            class="px-6 py-2 rounded-full m-1 transition-all duration-300 ease-in-out hover:bg-gray-600 shadow-lg"
          >
            {{ filter }}
          </button>
        </Slide>
      </Carousel>
    </div>

    <!-- Loading holati -->
    <div v-if="loading" class="text-center">
      <p>Loading videos...</p>
    </div>

    <!-- Videolarni ko'rsatish -->
    <div v-else class="flex flex-wrap gap-6 justify-center">
      <div
        v-for="(video, index) in filteredVideos"
        :key="index"
        class="w-80 bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-800"
      >
        <!-- Video karta -->
        <router-link
          :to="`/appsingle/${video.videoId}`"
          class="block hover:no-underline"
        >
          <!-- Rasm -->
          <img
            :src="
              video?.thumbnail
                ? video.thumbnail[2]?.url
                : 'https://media.istockphoto.com/id/1452662817/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=gjZN1wPOkEsxCCKjSIBBCVOAIoWVA_z26ougAPUAB7Q='
            "
            alt="Video thumbnail"
            class="w-full h-48 object-cover rounded-t-lg"
          />

          <!-- Video tavsifi -->
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 text-white truncate">
              {{ video?.title }}
            </h3>
            <p class="text-gray-400 text-sm mb-1">{{ video?.channelTitle }}</p>
            <p class="text-gray-500 text-sm mb-2">
              {{ video?.viewCount }} views • {{ video?.publishDate }}
            </p>
            <p class="text-gray-600 text-xs">{{ video?.lengthText }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, computed } from "vue";
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

    const AllData = reactive({
      videos: [],
    });
    console.log(AllData);

    const selectedFilter = ref("Hammasi");
    const loading = ref(true);

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
        AllData.videos = data?.data || [];
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        loading.value = false;
      }
    }

    const filteredVideos = computed(() => {
      if (selectedFilter.value === "Hammasi") {
        return AllData.videos;
      }
      return AllData.videos.filter(
        (video) => video.type === selectedFilter.value
      );
    });

    onMounted(() => {
      fetchVideos();
    });

    return { filters, selectedFilter, filteredVideos, loading };
  },
};
</script>

<style scoped></style>
