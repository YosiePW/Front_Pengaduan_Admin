<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title">Data Masyarakat</h3>
            </div>
              <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
            <div class="card-body">
              <!-- <p class="card-title float-left"><b>Data Masyarakat</b></p> -->
              <div class="table-responsive">
                <b-table striped hover :items="user" :fields="fields">
                  <template v-slot:cell(level)="data">
                    <b-badge variant="warning">{{ data.item.level }}</b-badge>
                  </template>
                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalMasyarakat><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
                    <!-- <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)"><i class="mdi mdi-delete btn-icon-prepend"></i> Hapus</b-button> -->
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

    <b-modal 
      id="modalMasyarakat"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Form Masyarakat
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="nama" class="col-form-label">Nik</label>
            <input type="text" name="nik" class="form-control" id="nik" placeholder="Nik" v-model="nik">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">Nama Masyarakat</label>
            <input type="text" name="nama" class="form-control" id="nama" placeholder="Nama Masyarakat" v-model="nama">
          </div>
          <div class="form-group">
            <label for="nama" class="col-form-label">Kata Sandi</label>
            <input type="password" name="password" class="form-control" id="password" placeholder="Kata Sandi" v-model="password">
          </div>
          <div class="form-group">
            <label for="nis" class="col-form-label">Telepon</label>
            <input type="text" name="telepon" class="form-control" id="telepon" placeholder="Telepon" v-model="telp">
          </div>
        </form>
    </b-modal>
    </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      nama: "",
      nik: "",
      username: "",
      password: "",
      telp: "",
      level: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      user: [],
      fields: ["id", "nama", "nik", "username", "telp", "level", "Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.user = response.data.data.user;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data masyarakat."
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

    // Add : function(){
    //   this.action = "insert";
    //   this.nik = "";
    //   this.nama = "";
    //   this.username = "";
    //   this.password = ""; 
    //   this.telp = "";
    //   this.level = "";
    // },

    Edit : function(item){
      this.action = "update";
      this.id = item.id;
      this.nik = item.nik;
      this.nama = item.nama;
      this.password = item.password; 
      this.telp = item.telp;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("nik", this.nik);
        form.append("nama", this.nama);
        form.append("password", this.password);
        form.append("telp", this.telp);

        this.axios.post("/masyarakat", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
          nik: this.nik,
          nama: this.nama,
          password: this.password,
          telp: this.telp,
        }
        this.axios.put("/masyarakat/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

    // Drop : function(id){
    //   let conf = { headers: { "Authorization" : "Bearer " + this.key} };
    //   if(confirm('Apakah anda yakin ingin menghapus data ini?')){
    //     this.$bvToast.show("loadingToast");
    //     this.axios.delete("/masyarakat/" + id, conf)
    //     .then(response => {
    //         this.getData();
    //         this.$bvToast.hide("loadingToast");
    //         this.message = response.data.message;
    //         this.$bvToast.show("message");
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   }
    // },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>