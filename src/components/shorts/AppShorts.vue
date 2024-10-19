<template>
  <div class="mt-10 p-8 bg-black text-white min-h-screen">
    <div v-if="loading" class="text-center text-xl">Loading...</div>

    <div v-else-if="error" class="text-red-500 text-center text-xl">
      {{ error }}
    </div>

    <div v-else class="max-w-md mx-auto bg-gray-800 p-4 rounded-lg shadow-md">
      <img
        :src="videoData?.thumbnail?.url"
        alt="Video Thumbnail"
        class="w-full h-48 object-cover rounded-md"
      />
      <h2 class="text-2xl font-semibold mt-4">{{ videoData?.title }}</h2>
      <p class="text-sm text-gray-400 mt-2">
        {{ videoData?.channelTitle }} • {{ videoData?.viewCount }} views
      </p>
      <p class="text-gray-300 mt-2">
        {{ videoData?.description || "No description available." }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoData: null,
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchVideoData();
  },
  methods: {
    fetchVideoData() {
      const xhr = new XMLHttpRequest();
      const videoId = "jOcyYhsc1mA";
      const apiKey = "fbc9fa0acdmsh938688ebca90b7dp148bedjsna714ab435559";
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              this.videoData = response;
              this.loading = false;
            } catch (err) {
              this.error = "Failed to parse the response.";
              this.loading = false;
            }
          } else {
            this.error = `Error: ${xhr.status} ${xhr.statusText}`;
            this.loading = false;
          }
        }
      });
      xhr.open(
        "GET",
        `https://yt-api.p.rapidapi.com/shorts/info?id=${videoId}`
      );
      xhr.setRequestHeader("x-rapidapi-key", apiKey);
      xhr.setRequestHeader("x-rapidapi-host", "yt-api.p.rapidapi.com");
      xhr.send(null);
    },
  },
};
</script>
<style>
body {
  background-color: #1a1a1a;
}
</style>
