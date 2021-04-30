<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title">Data Aspirasi</h3>
            </div>
             <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
            <div class="card-body">
              <!-- <p class="card-title float-left"><b>Data Aspirasi</b></p> -->
              <div class="table-responsive">
                <b-table striped hover :items="aspirasi" :fields="fields">
                  <template v-slot:cell(kategori)="data">
                    <b-badge variant="warning">{{ data.item.kategori.nama_kategori}}</b-badge>
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
        <!-- partial:../../partials/_footer.html -->
        <!-- partial -->
      </div>
      </div>
      <!-- main-panel ends -->

    </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id_aspirasi: "",
      id_kategori: "",
      kategori: "",
      id_user: "",
      isi_aspirasi: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      aspirasi: [], 
      kategori: [],
      fields: ["id_aspirasi", "kategori", "isi_aspirasi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/aspirasi/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.aspirasi = response.data.data.aspirasi;
          this.kategori = response.data.data.kategori;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data aspirasi."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>