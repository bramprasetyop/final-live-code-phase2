<template>
  <div id="bodyc" class="container">

    <div id="rowbody" class="row">
      <div id="foto" class="col s10 center">
        <h5>{{articles[1].title}}</h5>
        <img :src="articles[1].image" alt="" width="100%" height="100%">
        <h6>{{articles[1].content}}</h6>
      </div>
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

#rowbody {
  /* border: 1px solid rgb(190, 4, 4); */
  width: 90%;
  margin: 10px;
}

#foto {
  /* border: 1px solid rgb(28, 165, 9); */
  padding: 20px;
}
</style>


