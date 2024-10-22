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
        <h1 class="text-2xl font-bold mb-4">Comments</h1>

        <div v-if="loading" class="text-gray-400">Izohlar yuklanmoqda...</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>

        <ul v-if="comments.length > 0" class="text-white">
          <li v-for="(comment, index) in comments" :key="index" class="mb-4">
            <p class="font-semibold">{{ comment.authorText }}</p>
            <p>{{ comment.textDisplay }}</p>
            <p class="text-xs text-gray-400">Likes: {{ comment.likesCount }}</p>
            <p class="text-xs text-gray-400">
              Published: {{ new Date(comment.publishedAt).toLocaleString() }}
            </p>
          </li>
        </ul>

        <div v-else class="text-gray-400">Hozircha izohlar yo‘q</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

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
