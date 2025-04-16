import promotions from "../models/promotionSchema.js"

export const getAllPromotions = async (req, res) => {
    try {
      const allPromotions = await promotions.find();
      res.status(200).json(allPromotions);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};


export const addPromotion = async (req, res) => {
  const { title, content, imageUrl } = req.body;

  try {
    const newPromotion = new promotions({
      title,
      content,
      imageUrl,
    });
    await newPromotion.save();
    res.status(200).json({ message: "Promotion added successfully" });
  } catch (error) {
    console.error("Error adding promotion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



  