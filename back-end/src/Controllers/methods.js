//import { request, response } from 'express';                                              
import mongoose from 'mongoose';
import dogFood from '../Models/racaoData.js';

class Food{
    
    static async addFood(req , res){
        try{
            const newRacao = await dogFood.create(req.body);
            res.status(201).json({message: "Mais uma ração adicionada" , dogFood: newRacao});
        }catch(error){
            res.status(500).json({message: `${error.message} - falha ao adicionar a ração` });
        }
        
    }

    static async getFood(req,res){
        try {
            const listRacao = await dogFood.find({});
            res.status(200).json(listRacao);
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha solicitar ração` });
        }
    }


      static async removeFood(req, res) {
        try {
            const id = req.params.id;
            await dogFood.findByIdAndDelete(id, req.body);
            res.status(200).json({ message: "Ração deletada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao deletar ração ` })
        }
    }
    
      static async editFood(req, res) {
        try {
          const { id } = req.params;
      
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
          }

          const dadosAtualizados = req.body;
          const racaoEncontrada = await dogFood.findById(id);
    
          if (!racaoEncontrada) {
            return res.status(404).json({ message: "Ração não encontrada" });
          }
      
          Object.assign(racaoEncontrada, dadosAtualizados);
      
          await racaoEncontrada.save();
          
          res.status(200).json({ message: "Ração atualizada com sucesso", racao: racaoEncontrada });
        } catch (error) {
        
          res.status(500).json({ message: `${error.message} - falha ao editar ração` });
        }
      }

      static async getByID(req , res){
        try{
            const id = req.paramns.id;
            const newRacao = await Food.findById(id);
            res.status(200).json(newRacao);
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao editar ração`});
        }
      }

    }


export default Food;










