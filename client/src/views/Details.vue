<template>
  <div class="details">
    <div>
      <Navbar/>

      <div id="judulnya" class="col s12">

        <SecondNavbar/>
      </div>

      <div class="row">

        <div id="left" class="col s12 m4 l3">

          <div id="boxleft" class="col s12">
            <LeftBox/>
          </div>

        </div>

        <div id="centerbody" class="col s12 m8 l6">

          <Caurlah/>
        </div>



      </div>
    </div>
    <Footer/>
  </div>
</template>


<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import Caurlah from '@/components/caurlah.vue'
import Navbar from '@/components/navbar.vue'
import LeftBox from '@/components/LeftBox.vue'

import SecondNavbar from '@/components/SecondNavbar.vue'
import axios from 'axios'
import Footer from '@/components/Footer.vue'


export default {
  name: 'details',
  components: {
    // HelloWorld,
    Caurlah,
    Navbar,
    LeftBox,
 
    SecondNavbar,
    Footer
  }
}
</script>

