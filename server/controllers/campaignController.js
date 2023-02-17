const Campaign = require("../models/campaign")

  exports.index = (req, res) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
  };
  exports.getAllCampaign = async (req, res) => {
    const allCampaign = await Campaign.find({});
    res.send(allCampaign);
  };
  exports.createCampaign = async (req, res) => {
    const campaignInstance = new Campaign(
      { 
        name : req.body.name,
        description: req.body.description,
        donation_target: req.body.donation_target, 
        public_key: req.body.public_key,
        category: req.body.category
      });
    await campaignInstance.save();
    res.send(campaignInstance);
  }
  exports.getCampaignById = async (req,res)=>{
    const id = req.query.id;
    const result = await Campaign.findById(id);
    res.send(result);
  }
  exports.getCampaignByCategory= async (req,res)=>{
    const category = req.query.category;
    console.log(category);
    const result = await Campaign.find({category: category});
    console.log(result);
    res.send(result);
  }
  exports.deleteCampaignById= async (req,res)=>{
    const id = req.query.id;
    console.log(id);
    const result = await Campaign.findByIdAndDelete(id);
    console.log(result);
    res.send(result);
  }
  // Display list of all books.
  // Display detail page for a specific book.
  // exports.book_detail = (req, res) => {
  //   res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
  // };
  
  // // Display book create form on GET.
  // exports.book_create_get = async (req, res) => {
    
  //   res.send("NOT IMPLEMENTED: Book create GET");
  // };
  
  // // Handle book create on POST.
 

  
  // // Display book delete form on GET.
  // exports.book_delete_get = (req, res) => {
  //   res.send("NOT IMPLEMENTED: Book delete GET");
  // };
  
  // // Handle book delete on POST.
  // exports.book_delete_post = (req, res) => {
  //   res.send("NOT IMPLEMENTED: Book delete POST");
  // };
  
  // // Display book update form on GET.
  // exports.book_update_get = (req, res) => {
  //   res.send("NOT IMPLEMENTED: Book update GET");
  // };
  
  // // Handle book update on POST.
  // exports.book_update_post = (req, res) => {
  //   res.send("NOT IMPLEMENTED: Book update POST");
  // };