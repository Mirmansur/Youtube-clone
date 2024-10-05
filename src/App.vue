<template>
  <div>
    <AppHeader />
    <AppHome />
    <AppShorts />
  </div>
</template>
<script>
import AppHeader from "./components/header/AppHeader.vue";
import AppHome from "./components/home/AppHome.vue";
import AppShorts from "./components/shorts/AppShorts.vue";

export default {
  components: {
    AppHeader,
    AppHome,
    AppShorts,
  },
};
</script>
<style></style>
