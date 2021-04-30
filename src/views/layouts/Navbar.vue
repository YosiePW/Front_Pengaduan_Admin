<template>
<div class="container-scroller">
    <div class="horizontal-menu">
        <nav class="navbar top-navbar col-lg-12 col-12 p-0">
          <div class="container">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a class="navbar-brand brand-logo" href="/">
                <img src="assets/images/logoesambat.svg" alt="logo" />
              </a>
              <a class="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logoesambat.svg" alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                  <a class="nav-link" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                    <div class="nav-profile-img">
		      		<span class="fa fa-user-o"></span>
                    </div>
                    <div class="nav-profile-text">
                      <p class="text-black font-weight-semibold m-0"> Hai, There </p>
                      <span class="font-13 online-color">online <i class="mdi mdi-chevron-down"></i></span>
                    </div>
                  </a>
                  <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                    <a @click="logout" class="dropdown-item">
                      <i class="mdi mdi-logout mr-2 text-primary"></i> Signout </a>
                  </div>
                </li>
              </ul>
              <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                <span class="mdi mdi-menu"></span>
              </button>
            </div>
          </div>
        </nav>
        <nav class="bottom-navbar">
          <div class="container">
            <ul class="nav page-navigation">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <i class="mdi mdi-compass-outline menu-icon"></i>
                  <span class="menu-title">Dashboard</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/pengaduan">
                  <i class="mdi mdi-file-multiple menu-icon"></i>
                  <span class="menu-title">Pengaduan</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/aspirasi">
                  <i class="mdi mdi-file-outline menu-icon"></i>
                  <span class="menu-title">Aspirasi</span>
                </a>
              </li>
              <li v-if="level == 'admin'" class="nav-item">
                <a class="nav-link" href="/petugas">
                  <i class="mdi mdi-account-check menu-icon"></i>
                  <span class="menu-title">Petugas</span>
                </a>
              </li>
              <li v-if="level == 'admin'" class="nav-item">
                <a class="nav-link" href="/masyarakat">
                  <i class="mdi mdi-account-multiple menu-icon"></i>
                  <span class="menu-title">Masyarakat</span>
                </a>
              </li>
              <li v-if="level == 'admin'" class="nav-item">
                <a class="nav-link" href="/kategori">
                  <i class="mdi mdi-format-align-justify menu-icon"></i>
                  <span class="menu-title">Kategori</span>
                </a>
              </li>
              <li v-if="level == 'admin'" class="nav-item">
                <a class="nav-link" href="/report">
                  <i class="mdi mdi-printer menu-icon"></i>
                  <span class="menu-title">Report</span>
                </a>
              </li>
              <li class="nav-item">
                <div class="nav-link d-flex">
                  <a class="text-white" href="/"><i class="mdi mdi-home-circle"></i></a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
     </div>
</template>

<script>
export default {
  data : function(){
    return {
    level: "",
    }
  },
    name: 'navbar',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          // let form = new FormData();
          this.axios.post('/logout', conf).then(response => {
            if (response.data.success === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },

      getData : function(){
      this.level = localStorage.getItem("userLevel");
    },

  },

  mounted() {
  this.getData();
  console.log(this.level);
}
}
</script>