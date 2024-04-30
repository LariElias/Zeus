import { Decimal128 } from 'mongodb'; // feito
import mongoose, { Schema } from 'mongoose';

const RacaoSchema = new  Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    brand: {type: String , require : true},
    kg: {type: Number , require: true},
    date: { type: Date, default: Date.now , require: true},
    price: {type: Number, require: true},
});

const Racao = mongoose.model('Racao', RacaoSchema);

export default Racao; 