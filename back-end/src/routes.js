import express from 'express';
import calculadorControllers from '../src/Controllers/methods.js'; 
import functionCalculador from '../src/Controllers/Price.js';   

const routes = express.Router(); 

routes.post("/Food" , calculadorControllers.addFood);
routes.get("/Food", calculadorControllers.getFood);
routes.delete("/Food/:id",calculadorControllers.removeFood);
routes.put("/Food/:id" , calculadorControllers.editFood);
routes.get("/getById/:id" , calculadorControllers.getByID);

routes.post("/calculateTotalPrice", functionCalculador.calculateTotalPrice);

export default routes;
