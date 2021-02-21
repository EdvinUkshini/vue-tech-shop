module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        imgpath:String,
        name: String,
        cpu: String,
        description: String,
        stock: Number,
        price: Number
      },
      { timestamps: true }
    );
  
    const Laptop = mongoose.model("laptop", schema);
    return Laptop;
  };