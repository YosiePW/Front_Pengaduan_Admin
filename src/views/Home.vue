<template>
 <div class="container-scroller">
  <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper pb-0">
                <div class="row">
                  <div class="col-lg-3 grid-margin stretch-card">
                    <div class="card bg-warning">
                      <div class="card-body px-3 py-4">
                        <div class="d-flex justify-content-between align-items-start">
                          <div class="color-card">
                            <!-- <p class="mb-0 color-card-head">Data</p> -->
                            <h2 class="text-white">{{pengaduan}}
                            </h2>
                          </div>
                          <i class="card-icon-indicator mdi mdi-file-multiple bg-inverse-icon-warning"></i>
                        </div>
                        <br>
                        <h6 class="text-white">All Pengaduan</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 grid-margin stretch-card">
                    <div class="card bg-danger">
                      <div class="card-body px-3 py-4">
                        <div class="d-flex justify-content-between align-items-start">
                          <div class="color-card">
                            <!-- <p class="mb-0 color-card-head">Margin</p> -->
                            <h2 class="text-white">{{aspirasi}}
                            </h2>
                          </div>
                          <i class="card-icon-indicator mdi mdi-file-document bg-inverse-icon-danger"></i>
                        </div>
                        <br>
                        <h6 class="text-white">All Aspirasi</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 grid-margin stretch-card">
                    <div class="card bg-primary">
                      <div class="card-body px-3 py-4">
                        <div class="d-flex justify-content-between align-items-start">
                          <div class="color-card">
                            <!-- <p class="mb-0 color-card-head">Orders</p> -->
                            <h2 class="text-white">{{tanggapan}}
                            </h2>
                          </div>
                          <i class="card-icon-indicator mdi mdi-email-open-outline bg-inverse-icon-primary"></i>
                        </div>
                        <br>
                        <h6 class="text-white">All Tanggapan</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 grid-margin stretch-card">
                    <div class="card bg-success">
                      <div class="card-body px-3 py-4">
                        <div class="d-flex justify-content-between align-items-start">
                          <div class="color-card">
                            <!-- <p class="mb-0 color-card-head">Affiliate</p> -->
                            <h2 class="text-white">{{masyarakat}}</h2>
                          </div>
                          <i class="card-icon-indicator mdi mdi-account-circle bg-inverse-icon-success"></i>
                        </div>
                        <br>
                        <h6 class="text-white">Data Masyarakat</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
				</div>
				<!-- content-wrapper ends -->
				<!-- partial:partials/_footer.html -->
				<!-- partial -->
			</div>

</template>
<script>
module.exports = {
  data: function(){
    return{
      pengaduan: 0,
      aspirasi: 0,
	  tanggapan: 0,
	  masyarakat: 0,
      perPage: 5,
      currentPage: 1,
      key: "",
    }
  },
  methods: {
	getDataPengaduan : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/", conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
        //   this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    getDataAspirasi : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/aspirasi/", conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.aspirasi = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
        //   this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

	getDataTanggapan : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/tanggapan/", conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.tanggapan = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
        //   this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

	getDataMasyarakat : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/", conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.masyarakat = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
        //   this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

  },
  mounted(){
	this.key = localStorage.getItem("Authorization");
    this.getDataPengaduan();
	this.getDataAspirasi();
	this.getDataTanggapan();
	this.getDataMasyarakat();
  }
}
</script>
