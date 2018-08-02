<template>
  <div id="boxkiri" class="row">

    <div v-for="article in articles" :key="article">
      <router-link :to="`/content/${article._id}`">
        <h5>{{article.title}}</h5>
        <img :src="article.image" alt="" width="100%" height="100%">
      </router-link>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    this.getAll()
  },
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    ...mapActions(['getAll'])
  }
}
</script>

<style>
#bodyc {
  /* border: 1px solid black; */
  width: 110%;
}
#boxkiri {
  border: 1px solid rgb(206, 202, 202);
}
</style>


