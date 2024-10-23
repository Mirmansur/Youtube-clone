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
            <div class="flex items-center gap-5 mt-2">
              <button
                class="flex items-center border p-2 bg-gray-700 rounded-lg border-none gap-2"
              >
                <i class="pi pi-bell text-lg"></i>
                <span class="text-md font-medium">Подписаться </span>
              </button>
              <button
                class="flex items-center gap-4 bg-gray-700 p-2 rounded-lg"
              >
                <i class="pi pi-thumbs-up"></i>
                |
                <i class="pi pi-thumbs-down"></i>
              </button>
              <button
                class="flex items-center gap-3 p-2 bg-gray-700 rounded-lg"
              >
                <i class="pi pi-download"></i>
                <span>Cкачать</span>
              </button>
              <button class="bg-gray-700 p-2 rounded-lg">
                <i class="pi pi-ellipsis-h text-md"></i>
              </button>
            </div>
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
                <h4 class="text-sm font-semibold">{{ related.title }}</h4>
                <p class="text-xs text-gray-400">
                  {{ related.channelTitle }} • {{ related.viewCount }} views
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 px-4">
        <h1 class="text-2xl font-bold mb-4">Izohlar</h1>

        <div v-if="loading" class="text-gray-400">Izohlar yuklanmoqda...</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>

        <ul v-if="comments.length > 0" class="space-y-6">
          <li
            v-for="(comment, index) in comments"
            :key="index"
            class="flex gap-4"
          >
            <div class="w-12 h-12 rounded-full bg-gray-600 flex-shrink-0">
              <img
                src="https://via.placeholder.com/150"
                alt="Profil rasmi"
                class="w-full h-full object-cover rounded-full"
              />
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold">{{ comment.authorText }}</p>
                <span class="text-xs text-gray-400">
                  {{ new Date(comment.publishedAt).toLocaleString() }}
                </span>
              </div>

              <p class="text-sm mt-1 text-gray-300">
                {{ comment.textDisplay }}
              </p>

              <div class="flex items-center gap-4 mt-2">
                <div class="flex items-center gap-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 9l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span class="text-xs">{{ comment.likesCount }}</span>
                </div>

                <button class="text-xs text-blue-400 hover:underline">
                  Javob berish
                </button>
              </div>
            </div>
          </li>
        </ul>

        <div v-else class="text-gray-400">Hozircha izohlar yo‘q</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Comment {
  authorText: string;
  commentId: string;
  likesCount: string;
  publishedAt: string;
  textDisplay: string;
}

export default {
  setup() {
    const route = useRoute();
    const videoId = route.params.id as string;
    const video = ref(null);
    const similarVideos = ref([]);
    const comments = ref<Comment[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const defaultImage = "path-to-default-image.jpg";

    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `https://yt-api.p.rapidapi.com/video/info?id=${videoId}`,
          {
            headers: {
              "x-rapidapi-key":
                "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559",
              "x-rapidapi-host": "yt-api.p.rapidapi.com",
            },
          }
        );
        video.value = response.data;
        similarVideos.value = response.data.similar || [];
      } catch (err) {
        console.error("Video data loading error:", err);
        error.value = "Video ma'lumotlarini yuklab bo'lmadi.";
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://yt-api.p.rapidapi.com/comments?id=${videoId}`,
          {
            headers: {
              "x-rapidapi-key":
                "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559",
              "x-rapidapi-host": "yt-api.p.rapidapi.com",
            },
          }
        );

        console.log(response.data.data);
        comments.value = response.data.data.map((c: any) => ({
          authorText: c.authorText,
          commentId: c.commentId,
          likesCount: c.likesCount,
          publishedAt: c.publishedAt,
          textDisplay: c.textDisplay,
        }));
      } catch (err) {
        console.error("Comments loading error:", err);
        error.value = "Izohlarni yuklab bo'lmadi.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchVideoData();
      fetchComments();
    });

    const formatTime = (seconds: number) => {
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
      comments,
      loading,
      error,
      formatTime,
      defaultImage,
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
  aspect-ratio: 16 / 9;
}
</style>
