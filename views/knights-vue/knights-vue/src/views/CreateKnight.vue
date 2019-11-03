<template>
  <div class="home">
    <KnightForm />
  </div>
</template>

<script>
// @ is an alias to /src
import KnightForm from "@/components/KnightForm.vue";

export default {
  name: "knightlist",
  components: {
    KnightForm
  }
};
</script>
