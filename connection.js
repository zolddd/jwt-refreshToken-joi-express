import mongoose from "mongoose";

try {
   await mongoose.connect("mongodb://localhost/pruebita")
   console.log("todo ok como alilopez")
} catch (error) {
    console.log(error)
}
