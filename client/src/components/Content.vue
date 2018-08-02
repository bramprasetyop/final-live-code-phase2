<template>
  <div id="bodycc" class="container">

    <div id="rowbodyy" class="row">
      <div v-if="article._id === $route.params.id" v-for="article in articles" :key="article" id="fotoo" class="col s12 center">
        <h5>{{article.title}}</h5>
        <img :src="article.image" alt="" width="100%" height="100%">
        <h6>{{article.content}}</h6>

        <div v-if="article.author === users._id" id="deleteb" class="col s2 m2 l2 right">
          <button v-if="auth" class="btn waves-effect waves-light right" type="submit" name="action">Delete

          </button>
        </div>
        <div v-if="article.author === users._id" class="col s2 m2 l2 right left">
          <button v-if="auth" class="btn waves-effect waves-light right" type="submit" name="action">Edit

          </button>
        </div>
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
    this.getUser()
  },
  computed: {
    ...mapState(['articles', 'users','auth','postModal'])
  },
  methods: {
    ...mapActions(['getAll', 'getUser','setPostModal'])
  }
}
</script>

<style>
#bodycc {
  /* border: 1px solid black; */
  width: 110%;
}

#rowbodyy {
  /* border: 1px solid rgb(190, 4, 4); */
  width: 90%;
  margin: 10px;
}

#deleteb {
  margin-right: 20px;
}
#fotoo {
  /* border: 1px solid rgb(28, 165, 9); */
  padding: 20px;
}
</style>


