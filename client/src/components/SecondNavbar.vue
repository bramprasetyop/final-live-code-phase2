<template>
  <div id="ciatt" class="row">
    <div id="loginb" class="col s1 m1 l1 right">
      <button class="btn waves-effect waves-light center" type="submit" name="action">Logout

      </button>
    </div>
    <div id="logoutb" class="col s1 m1 l1 right">
      <button  class="btn waves-effect waves-light center" type="submit" name="action">Login

      </button>
    </div>
    <div id="posta" class="col s1 m1 l1 right">
      <button class="btn waves-effect waves-light right" type="submit" name="action">Post

      </button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      status: '',
      body: '',
      title: '',
      article: '',
      loginStatus: '',
      category: '',
      img: ''
    }
  },
  methods: {
    fetchImg(e) {
      this.img = e.target.files[0]
    },
    upload() {
      let formData = new FormData()
      formData.append('image', this.img)
      formData.append('title', this.title)
      formData.append('content', this.article)
      formData.append('category', this.category)

      // ====================== axios ==========================
      axios({
        url: 'http://localhost:3000/home',
        method: 'post',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // console.log(response);
          this.$router.push('/')
          swal({
            text: 'Upload Success',
            icon: 'success'
          })
        })
        .catch(err => {
          swal({
            text: 'Something Error',
            icon: 'error'
          })
        })
      // ====================== axios ==========================
    },
    logout() {
      if (localStorage.hasOwnProperty('token') === true) {
        swal({
          text: 'Logout Success',
          icon: 'success'
        })
        localStorage.clear()
        this.$router.push('/')
      }
    },
    login() {
      let obj = {
        username: this.body,
        password: this.status
      }
      axios
        .post('http://localhost:3000/login', obj)
        .then(response => {
          // console.log(response);

          localStorage.setItem('token', response.data.token)
          this.$router.push('/')
          swal({
            text: 'Login Success',
            icon: 'success'
          })
        })
        .catch(err => {
          swal({
            text: 'Email/ Username Wrong',
            icon: 'error'
          })
        })
    }
  }
}
</script>


<style>
#ciatt {
  margin: 5px;
  border: 1px solid rgb(201, 198, 198);
  height: 60px;
  background-color: rgb(251, 253, 255);
  width: 100%;
}

#loginb {
  /* border: 1px solid black; */
  margin-top: 15px;
}
#logoutb {
  /* border: 1px solid black; */
    margin-top: 15px;

}
#posta {
  /* border: 1px solid black; */
    margin-top: 15px;

}
</style>
