<template>
  <div id="ciatt" class="row">
    <div v-if="auth" id="loginb" class="col s1 m1 l1 right">
      <button @click="logout" class="btn waves-effect waves-light center" type="submit" name="action">Logout

      </button>
    </div>
    <div v-if="!auth" id="logoutb" class="col s1 m1 l1 right">
      <button @click="openModal()" class="btn waves-effect waves-light center" type="submit" name="action">Login

      </button>
    </div>
    <div v-if="auth" id="posta" class="col s1 m1 l1 right">
      <button @click="openModall()" class="btn waves-effect waves-light right" type="submit" name="action">Post

      </button>
    </div>

    <div id="searcht" class="col s4 m4 l4 center">

      <textarea id="textarea1" class="materialize-textarea"></textarea>

    </div>

    <div id="butsearch" class="col s1 m1 l1 center">
      <button class="btn waves-effect waves-light left" type="submit" name="action">Search

      </button>
    </div>
    <!-- =========================== modal =================================== -->
    <modal v-if="modalAuth">

      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <i class="material-icons prefix">username</i>
                <input v-model="body" placeholder="username..." id="icon_prefix" type="text" class="validate">

              </div>

              <div class="modal-body">

                <input v-model="status" placeholder="Password..." id="icon_prefixx" type="password" class="validate">
              </div>

              <div id="logintomb" class="row">
                <router-link to="">
                  <div id="loginbutton" class=" col s12 center">
                    <button @click="login()" class="btn waves-effect waves-light center" type="submit" name="action">Login

                    </button>

                  </div>
                </router-link>
              </div>
              <div class="row">
                <router-link to="">
                  <div id="loginbutton" class=" col s12 center">
                    <button @click="close" class="btn waves-effect waves-light center" type="submit" name="action">Cancel

                    </button>

                  </div>
                </router-link>

              </div>
            </div>
          </div>
        </div>
      </transition>

    </modal>
    <!-- =========================== modal =================================== -->

    <!-- =========================== modal post=================================== -->
    <modal v-if="postModal">

      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">

                <input v-model="title" placeholder="Title..." id="icon_prefix" type="text" class="validate">

              </div>

              <div class="modal-header">

                <textarea v-bind="content" id="textarea1" placeholder=" Content..." class="materialize-textarea"></textarea>

              </div>

              <div class="modal-header">

                <input v-model="category" placeholder="Category..." id="icon_prefix" type="text" class="validate">

              </div>

              <div class="modal-body">

                <div class="file-field input-field">
                  <div class="btn">
                    <span>File</span>
                    <input @change="fetchImg" type="file">
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                  </div>
                </div>
              </div>
              <div id="logintomb" class="row">
                <router-link to="">
                  <div id="loginbutton" class=" col s12 center">
                    <button @click="upload()" class="btn waves-effect waves-light center" type="submit" name="action">Submit

                    </button>

                  </div>
                </router-link>
              </div>
              <div class="row">
                <router-link to="">
                  <div id="loginbutton" class=" col s12 center">
                    <button @click="close" class="btn waves-effect waves-light center" type="submit" name="action">Cancel

                    </button>

                  </div>
                </router-link>

              </div>
            </div>
          </div>
        </div>
      </transition>

    </modal>
    <!-- =========================== modal post=================================== -->

  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

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
  created() {},
  computed: {
    ...mapState(['auth', 'modalAuth','postModal'])
  },
  methods: {
    ...mapActions(['getAll', 'close', 'logout','setPostModal']),
    fetchImg(e) {
      this.img = e.target.files[0]
    },
    openModal() {
      this.$store.commit('setModalAuth', true)
    },
    openModall() {
      this.$store.commit('setPostModal', true)
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
          this.$store.commit('setPostModal', false)
          this.getAll()
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
    login() {
      if (this.body === '' || this.status === '') {
        swal({
          text: 'Something wrong',
          icon: 'error'
        })
      } else {
        let obj = {
          username: this.body,
          password: this.status
        }
        axios
          .post('http://localhost:3000/login', obj)
          .then(response => {
            console.log(response)
            this.$store.commit('setModalAuth', false)
            this.$store.commit('setAuth', true)

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

#logintomb {
  /* border: 1px solid black; */
}
.btnn {
  width: 100px;
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
#searcht {
  /* border: 1px solid black; */
  /* margin-top: 15px; */
  /* height: 20px; */
}
#butsearch {
  /* border: 1px solid black; */
  margin-top: 15px;
}

/* // ======================= modal ==================================== */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-containe {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
