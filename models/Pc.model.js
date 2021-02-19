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
  
    const Pc = mongoose.model("pc", schema);
    return Pc;
  };