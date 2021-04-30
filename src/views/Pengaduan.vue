<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title">Data Pengaduan</h3>
            </div>
             <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
            <div class="card-body">
              <!-- <div>
                <vue-html2pdf
                  :show-layout="false"
                  :float-layout="true"
                  :enable-download="false"
                  :preview-modal="true"
                  :paginate-elements-by-height="1400"
                    filename="hee hee"
                  :pdf-quality="2"
                  :manual-pagination="false"
                    pdf-format="a4"
                    pdf-orientation="portrait"
                    pdf-content-width="800px"
 
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf" >
        <section slot="pdf-content">
            <div class="invoice-box">
			  <table>
				  <tr class="top">
					  <td colspan="2">
					  	<table>
						  	<tr>
								<td class="title">
								</td>

								<td>
                </td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
				
								</td>

								<td>
									Dengan: {{reports.nama}} <br />
									Tanggal: {{reportt.tgl_tanggapan}} <br />
									Kategori: {{reportk.nama_kategori}} <br />
                  Status: {{reportp.status}}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Data User</td>

					<td>:</td>
				</tr>

				<tr class="details">
					<td>NIK</td>

					<td> {{reports.nik}} </td>
				</tr>

        <tr class="details">
					<td>Nama</td>

					<td> {{reports.nama}} </td>
				</tr>

        <tr class="details">
					<td>Username</td>

					<td> {{reports.username}} </td>
				</tr>

        <tr class="details">
					<td>Telepon</td>

					<td> {{reports.telp}} </td>
				</tr>

				<tr class="heading">
					<td>Data Pengaduan</td>

					<td>:</td>
				</tr>

				<tr class="item">
					<td>Tanggal Pengaduan</td>

					<td> {{reportp.tgl_pengaduan}} </td>
				</tr>

				<tr class="item">
					<td>Laporan</td>

					<td> {{reportp.isi_laporan}} </td>
				</tr>

				<tr class="item">
					<td>Status</td>

					<td> {{reportp.status}} </td>
				</tr>

				<tr class="item">
					<td>Foto</td>

					<td> <img v-if="reportp.foto"
                style="width: 150px;
                height: 150px;
                border-radius: 10%;"
                :src="'http://localhost:8000/uploads/' + reportp.foto">

          </td>
				</tr>
			</table>
		</div>
        </section>
    </vue-html2pdf>
   </div> -->
              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <template v-slot:cell(kategori)="data">
                    <b-badge variant="danger">{{ data.item.kategori.nama_kategori }}</b-badge>
                  </template>
                  <template v-slot:cell(foto)="data">
                    <img style="width:200px; height:150px; border-radius:5%" :src="'http://localhost:8000/uploads/' + data.item.foto" />
                  </template>
                  <template v-slot:cell(status)="data">
                    <b-badge variant="info" v-if="data.item.status === 'terkirim'">{{ data.item.status }}</b-badge>
                    <b-badge variant="warning" v-if="data.item.status === 'proses'">{{ data.item.status }}</b-badge>
                    <b-badge variant="success" v-if="data.item.status === 'selesai'">{{ data.item.status }}</b-badge>
                    <b-badge variant="danger" v-if="data.item.status === 'tolak'">{{ data.item.status }}</b-badge>
                 </template>
                  <template v-slot:cell(tanggapan)="data">
                    {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                  </template>
                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="dark" v-on:click="Edit(data.item)" v-b-modal.modalStatus><i class="mdi mdi-reload btn-icon-prepend"></i> Ubah Status</b-button>&nbsp;
                    <b-button size="sm" variant="info" v-on:click="Add(data.item)" v-b-modal.modalTanggapan><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah Tanggapan</b-button>&nbsp;
                    <!-- <b-button size="sm" variant="dark"  v-on:click="generateReport(data.item.id_pengaduan)"><i class="mdi mdi-note btn-icon-prepend"></i> Report</b-button>                -->
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
      </div>
      </div>

      <b-modal 
      id="modalStatus"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Form Ubah Status
      </template>
        <form ref="form">
          <!-- <div class="form-group">
            <label for="nama" class="col-form-label">Id Pengaduan</label>
            <input type="text" name="id_pengaduan" class="form-control" id="id_pengaduan" placeholder="id_pengaduan" v-model="id_pengaduan">
          </div> -->
          <div class="form-group">
            <label for="status" class="col-form-label">Status</label>
            <select class="form-control" name="status" id="status" v-model="status">
              <option value="terkirim" checked>Terkirim</option>
              <option value="proses">Proses</option>
              <option value="selesai">Selesai</option>
              <option value="tolak">Tolak</option>
            </select>
          </div>
        </form>
    </b-modal>

    <b-modal 
      id="modalTanggapan"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Form Tanggapan
      </template>
        <form ref="form">
          <!-- <div class="form-group">
            <label for="nama" class="col-form-label">Id Pengaduan</label>
            <input type="text" name="id_pengaduan" class="form-control" id="id_pengaduan" placeholder="id_pengaduan" v-model="id_pengaduan">
          </div> -->
          <div class="form-group">
            <label for="nama" class="col-form-label">Tanggapan</label>
            <input type="text" name="tanggapan" class="form-control" id="tanggapan" placeholder="Tanggapan" v-model="tanggapan">
          </div>
        </form>
    </b-modal>

      </div>
      <!-- main-panel ends -->
</template>

<script>

// import VueHtml2pdf from 'vue-html2pdf'

module.exports = {
  data : function(){
    return {
      search:"",
      reportp: "",
      reportk: "",
      reportt: "",
      reports: "",
      id_user: "",
      nik: "",
      nama: "",
      telp: "",
      username: "",
      id_pengaduan: "",
      id_kategori: "",
      nama_kategori: "",
      kategori: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      foto: "",
      status: "",
      tanggapan: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      kategori: [],
      tanggapan: [],
      fields: ["id_pengaduan", "tgl_pengaduan", "kategori", "isi_laporan", "foto", "tanggapan" , "status", "Aksi"],
    }
  },

  // components: {
  //   VueHtml2pdf
  // },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/"  + this.perPage + "/" + offset , conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.kategori = response.data.data.kategori;
          this.tanggapan = response.data.data.pengaduan.tanggapan;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    // generateReport (id) {
    //    let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
    //    this.$bvToast.show("loadingToast");
    //    this.axios.get("/pengaduan/" + id, conf)
    //    .then(response => {
    //       if(response.data.success == true){
    //       this.$bvToast.hide("loadingToast");
    //       this.reportp = response.data.data.pengaduan[0];
    //       this.reports = response.data.data.pengaduan[0].user;
    //       this.reportt = response.data.data.pengaduan[0].tanggapan;
    //       this.reportk = response.data.data.pengaduan[0].kategori;
    //       this.$refs.html2Pdf.generatePdf()
    //       } else {
    //       this.$bvToast.hide("loadingToast");
    //       this.message = "Gagal menampilkan data pengaduan."
    //       this.$bvToast.show("message");
    //       this.$router.push({name: "login"})
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error.response.data.message);
    //   });
    // },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(item){
      this.action = "insert";
      this.id_pengaduan = item.id_pengaduan;
      this.tanggapan = "";
    },

     Edit : function(item){
      this.action = "update";
      this.id_pengaduan = item.id_pengaduan;
      this.status = item.status;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        // form.append("id", this.id);
        // form.append("id_pengaduan", this.id_pengaduan);
        form.append("tanggapan", this.tanggapan);

        this.axios.post("/pengaduan/tanggapan/" + this.id_pengaduan, form, conf)
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
          id_pengaduan: this.id_pengaduan,
          status: this.status,
        }
        this.axios.post("/pengaduan/status/" + this.id_pengaduan, form, conf)
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
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
    // this.generateReport();
  }
}
</script>