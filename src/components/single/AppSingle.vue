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

<template>
  <div class="Alll">
    <div class="bg-black min-h-screen text-white flex flex-col items-center">
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
            <p class="text-sm text-gray-300">{{ video?.description }}</p>
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
  </div>
</template>

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
