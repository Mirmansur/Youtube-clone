<template lang="html">
  <div class="p-6 bg-black min-h-screen text-white flex flex-col items-center">
    <div class="w-full max-w-screen-lg">
      <h1 class="text-3xl font-bold mb-4">
        {{ video?.title || "Loading..." }}
      </h1>

      <div class="relative w-full h-64 md:h-80 mb-4 overflow-hidden">
        <img
          :src="video?.thumbnail"
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
          <p class="text-lg text-gray-300">{{ video?.channel }}</p>
          <p class="text-sm text-gray-500">
            {{ video?.views }} • {{ video?.time }}
          </p>
        </div>
      </div>

      <p class="text-base mb-6">{{ video?.description }}</p>

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
            <h3 class="text-lg font-semibold mb-2">
              {{ similarVideo.title }}
            </h3>
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

---

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const videoId = route.params.id;
    const video = ref(null);
    const similarVideos = ref([]);

    const fetchVideoData = async () => {
      try {
        const response = await fetch("https://yt-api.p.rapidapi.com/trending", {
          headers: {
            "x-rapidapi-key":
              "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559",
            "x-rapidapi-host": "yt-api.p.rapidapi.com",
          },
        });

        const data = await response.json();
        const videos = data?.data || [];
        video.value = videos.find((v) => v.id === parseInt(videoId));
        similarVideos.value = videos.filter((v) => v.id !== parseInt(videoId));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    onMounted(fetchVideoData);

    return {
      video,
      similarVideos,
    };
  },
};
</script>

---

<style scoped>
/* Qo'shimcha kerakli stylingni bu yerda qilishingiz mumkin */
</style>
