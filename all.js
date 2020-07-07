new Vue({
  el: "#app",
  data: {
    products: [{
        id: 1156934917213,
        title: "手工藍莓醬",
        category: "果醬",
        content: "採摘後24小時內製成果醬",
        description: "成熟的果實破個洞",
        imageUrl: "https://images.unsplash.com/photo-1541690325738-d4ba017004b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
        enabled: false,
        origin_price: 320,
        price: 280,
        unit: "罐"
      },
      {
        id: 1156934918953,
        title: "手工草莓醬",
        category: "果醬",
        content: "採摘後24小時內製成果醬",
        description: "你看過把籽全部挑出來的草莓嗎",
        imageUrl: "https://images.unsplash.com/photo-1500912239908-4ee48acb3a7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
        enabled: true,
        origin_price: 300,
        price: 260,
        unit: "罐"
      },
      {
        id: 1156935019960,
        title: "手工檸檬醬",
        category: "果醬",
        content: "採摘後24小時內製成果醬",
        description: "有時候會酸到不要不要的",
        imageUrl: "https://images.unsplash.com/photo-1576359409444-1699423921dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        enabled: true,
        origin_price: 280,
        price: 220,
        unit: "罐"
      }
    ],
    editingProduct: {},
    modalForCreating: true //用來變換modal標題
  },
  methods: {
    openModal(mode, item, key) {
      switch (mode) {
        case "newProduct":
          this.modalForCreating = true; //變換modal標題
          this.editingProduct = {}; //清空內容
          this.editingProduct.id = new Date().getTime(); //抓取數值當作id
          $("#productModal").modal("show");
          break;
        case "editProduct":
          this.modalForCreating = false; //變換modal標題
          this.editingProduct = Object.assign({}, item); //用淺拷貝建立新的參考路徑，利用v-model的綁定可同時修改畫面及資料
          this.editingProduct.key = key; //使用$set修改物件時會用到的索引值
          $("#productModal").modal("show");
          break;
        case "deleteProduct":
          this.editingProduct = Object.assign({}, item);
          this.editingProduct.key = key; //刪除時會使用到的索引值
          $("#delModal").modal("show");
          break;
        default:
          break;
      }
    },
    saveProduct() {
      if (this.modalForCreating) {
        this.products.push(this.editingProduct);
      } else {
        this.$set(this.products, this.editingProduct.key, Object.assign({}, this.editingProduct)); //$set(目標, 陣列索引, 加入/修改的值)
      }
      $("#productModal").modal("hide");
    },
    deleteProduct() {
      this.products.splice(this.editingProduct.key, 1);
      this.editingProduct = {};
      $("#delModal").modal("hide");
    }
  }
})