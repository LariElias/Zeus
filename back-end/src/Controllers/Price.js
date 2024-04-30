class OperationFood{
    static async calculateTotalPrice(req, res) {
        try {
            const listRacao = await dogFood.find({});
            let totalPrice = 0;
            listRacao.forEach(racao => {
                totalPrice += racao.price; 
            });
            res.status(200).json({ totalPrice });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao calcular preço total das rações` });
        }
    }
}

export default OperationFood;// passar a class



