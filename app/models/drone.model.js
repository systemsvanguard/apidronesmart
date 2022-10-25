module.exports = (sequelize, Sequelize) => {
  const Drone = sequelize.define("drone", {
    title:  	{type: Sequelize.STRING(256) },    
	brand:  	{type: Sequelize.STRING(100) },  
	price:  	{type: Sequelize.DECIMAL(5,2)}, 
	asinid: 	{type: Sequelize.STRING(15)  },    
	rating: 	{type: Sequelize.DECIMAL(2,1)}, 
	stockqnty: 	{type: Sequelize.INTEGER(7)      },    
	amazon_image: {type: Sequelize.STRING(256) }, 
	amazon_url: {type: Sequelize.STRING(500) },    
	synopsis:  	{type: Sequelize.STRING(400)     },   
	description:{type: Sequelize.STRING(1200)  },   
	published:  {type: Sequelize.BOOLEAN(1)  }   
  });

  return Drone;
};
