                    /* ------ Customer API-----*/

/*----import expres ---*/
const express = require("express");
/*----import sqite ---*/
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { response } = require("express");

const databasePath = path.join(__dirname, "CustomerDetails.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();


/*-----GET ALL CUSTOMERS LIST WITH STATUS ACTIVE ---*/
const convertCustomerDbObjectToResponseObject = (dbObject) => {
    return {
      customerId: dbObject.customer_Id,
      customerFristName: dbObject.customer_firstname,
      customerLastName: dbObject.customer_lastname,
      customerMobileNumber: dbObject.mobile_number,
      customerEmailId: dbObject.customer_emailid,
      customerAddress: dbObject.customer_address,
      customerStatus: dbObject.customer_status,
    };
  };


  /*-----GET ALL CUSTOMER LIST WITH STATUS ACTIVE ----*/
  
  app.get("/Customers/", async (request, response) => {
    const getCustomerQuery = `
      SELECT
        *
      FROM
        Customer_details
      WHERE status LIKE ACTIVE;`;
    const CustomerArray = await database.all(getCustomerQuery);
    response.send(CustomerArray.map((eachCustomer) =>
    convertCustomerDbObjectToResponseObject(eachCustomer)
  )
    );
  });

  

  /* ----DELETE CUSTOMER---*/

  app.delete("/Customers/:customerId", async(request,response)=>{
    const {customerId} = request.params;
    const deleteCustomerQuery =`DELETE FROM 
    Customer_details
    WHERE 
    customer_id =${customerStatus}`;
    await db.run(deleteCustomerQuery)
    response.send("Customer Deleted Successfully");
  });


  /*----Create New Customer----*/

  app.put("/customers/:customerId/",async(request,response)=>{
    const {customerId}=request.params;
    const customerDetails = request.customers;
    const {
      firstName,
      lastName,
      mobileNumber,
      DOB,
      emailID,
      address,
      customerID,
      status,
    } =customerDetails;
    const updatecustomerQuery =`
    UPDATE 
    customer
    SET 
    firstName='${firstName}',
    lastName='${lastName}',
    mobileNumber='${mobileNumber}'
    DOB ='${DOB}'
    emailID='${emailID}'
    address='${address}'
    customerID ='${customerID}'
    status ='
    ${status}'
    WHERE 
    customerID =${customerID}`;
    await db.run(updatecustomerQuery);
    response.send("Customer Update Successfully");


  });



                                               /*------Card API-----*/


/*----import expres ---*/
const express = require("express");
/*----import sqite ---*/
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { response } = require("express");

const databasePath = path.join(__dirname, "CardDetails.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();


/*-----GET ALL CARD LIST---*/
const convertCardDbObjectToResponseObject = (dbObject) => {
    return {
      customerId: dbObject.customer_Id,
      cardType:dbObject.card_type,
      customerName: dbObject.customerName,
      status : dbObject.customerStatus
      vision:dbObject.vision
    };
  };


  /*-----GET ALL CARD ----*/
  
  app.get("/Card/", async (request, response) => {
    const getCustomerQuery = `
      SELECT
        *
      FROM
        Card_details;`;
    const CardArray = await database.all(getCardQuery);
    response.send(CardArray.map((eachCard) =>
    convertCardDbObjectToResponseObject(eachCard)
  )
    );
  });

  

  /* ----CREATE NEW CARD---*/


  app.put("/customers/:customerId/",async(request,response)=>{
    const {cardId}=request.params;
    const cardDetails = request.card;
    const {
      cardNumber,
      cardType,
      customerName,
      status,
      vision,
      customerId
    } =cardDetails;
    const updatecardQuery =`
    UPDATE 
    card
    SET
    cardNumber='${cardNumber}',
    cardType='${cardType}',
    customerName='${customerName}'
    status='${status}'
    vision ='${vision}'
    customerId='${customerId}',
    WHERE 
    customerID = '${customerId}`
    
    await db.run(updatecardQuery);
    response.send("Card Update Successfully");

  });

  
