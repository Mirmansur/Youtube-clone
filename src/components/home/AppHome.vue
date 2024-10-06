<template>
  <div class="p-4 bg-black min-h-screen text-white">
    <div class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="w-80 bg-black rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:bg-black"
      >
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        {
          thumbnail: "https://via.placeholder.com/320x180?text=Video+1",
          title: "OYOG'IM YERTILIB KETGANIDAN BOSHQA YURA OLMAYMAN! 21-22 KUN",
          channel: "ISOMTV",
          views: "51k views",
          time: "2 hours ago",
        },
        {
          thumbnail: "https://via.placeholder.com/320x180?text=Video+2",
          title: "Shakar - ommaviy narkotik. Shakarsiz 30 kun!",
          channel: "Maqsad",
          views: "966k views",
          time: "1 year ago",
        },
        {
          thumbnail: "https://via.placeholder.com/320x180?text=Video+3",
          title: "БЕДНЫЙ vs БОГАТЫЙ СТУДЕНТ",
          channel: "A4",
          views: "67M views",
          time: "2 years ago",
        },
        {
          thumbnail: "https://via.placeholder.com/320x180?text=Video+4",
          title:
            "Веном 3 - разбор сюжета и сцены после титров. План Кнала раскрыт!",
          channel: "Axis Comics",
          views: "6.2k views",
          time: "3 hours ago",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
