module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        imgpath:String,
        type:Number,
        manufacturer:String,
        name: String,
        description: String,
        stock: Number,
        price: Number
      },
      { timestamps: true }
    );
  
    const Peripheral = mongoose.model("peripheral", schema);
    return Peripheral;
  };