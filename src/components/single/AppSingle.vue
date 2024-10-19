<template>
  <div class="Alll">
    <div class="bg-black min-h-screen text-white flex flex-col pl-28">
      <div class="w-full max-w-screen-xl flex mt-20">
        <div class="flex-1">
          <div class="aspect-w-16 aspect-h-9 bg-gray-800">
            <iframe
              class="w-full h-full"
              :src="`https://www.youtube.com/embed/${videoId}`"
              title="Video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div class="mt-4 px-4">
            <h2 class="text-2xl font-bold mb-2">{{ video?.title }}</h2>
            <p class="text-sm text-gray-400 mb-4">
              {{ video?.viewCount }} views •
              {{ formatTime(video?.lengthSeconds) }}
            </p>
            <p class="text-sm text-gray-300">
              {{ video?.description?.slice(0, 100) }}
            </p>
          </div>
        </div>

        <div class="w-96 ml-8 hidden md:block">
          <h3 class="text-lg font-semibold mb-4">Related Videos</h3>
          <div class="space-y-4">
            <div
              v-for="related in similarVideos"
              :key="related.id"
              class="flex gap-4 items-start"
            >
              <img
                :src="related.thumbnail?.[2]?.url || defaultImage"
                alt="Related video thumbnail"
                class="w-32 h-20 object-cover"
              />
              <div class="flex-1">
                <h4 class="text-sm font-semibold">
                  {{ related.title }}
                </h4>
                <p class="text-xs text-gray-400">
                  {{ related.channelTitle }} • {{ related.viewCount }} views
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-2xl font-bold mb-4">Comments</h1>
        <div v-if="loading">Loading comments...</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <ul v-if="comments.length">
          <li v-for="(comment, index) in comments" :key="index" class="mb-4">
            <p class="font-semibold">{{ comment.author }}</p>
            <p>{{ comment.text }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-black text-white flex flex-col">
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
                <h3 class="text-lg font-semibold truncate">
                  {{ video?.title }}
                </h3>
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
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const videoId = route.params.id;
    const video = ref(null);
    const similarVideos = ref([]);
    const defaultImage = "path-to-default-image.jpg";
    const comments = ref([]);
    const loading = ref(true);
    const error = ref(null);
    console.log("Route params:", route.params);
    console.log("Video ID:", videoId);

    const fetchVideoData = () => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          try {
            const response = JSON.parse(this.responseText);
            video.value = response?.data || response;
            console.log(response);

            similarVideos.value =
              response?.data?.similar || response.similar || [];
          } catch (error) {
            console.error("Error processing data:", error);
          }
        }
      });

      xhr.open("GET", `https://yt-api.p.rapidapi.com/video/info?id=${videoId}`);
      xhr.setRequestHeader(
        "x-rapidapi-key",
        "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559"
      );
      xhr.setRequestHeader("x-rapidapi-host", "yt-api.p.rapidapi.com");

      xhr.send(null);
    };
    const fetchComments = () => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          loading.value = false;
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);

            comments.value = response.data || [];
          } else {
            error.value = "Failed to load comments";
          }
        }
      });

      xhr.open("GET", `https://yt-api.p.rapidapi.com/comments?id=${videoId}`);
      xhr.setRequestHeader(
        "x-rapidapi-key",
        "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559"
      );
      xhr.setRequestHeader("x-rapidapi-host", "yt-api.p.rapidapi.com");

      xhr.send();
    };

    onMounted(fetchVideoData);
    onMounted(fetchComments);

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    };

    return {
      videoId,
      video,
      similarVideos,
      defaultImage,
      formatTime,
      comments,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.aspect-h-9 {
  aspect-ratio: 16/9;
}
</style>
