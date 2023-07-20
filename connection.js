import mongoose from "mongoose";

try {
   await mongoose.connect("mongodb+srv://valiep:Tq2NU20Z2QSKwHJu@cluster0.mecht0g.mongodb.net/bdapi?retryWrites=true&w=majority");
   console.log("todo ok!!!!")
} catch (error) {
    console.log(error)
}

