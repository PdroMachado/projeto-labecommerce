import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { PurchaseData, PurchaseProducts, TUser } from "./types/types";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando");
});
//Ver todos os usuarios
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});
app.post("/user", async (req: Request, res: Response) => {
    try {
      const id = req.body.id as string;
      const name = req.body.name as string;
      const email = req.body.email as string;
      const password = req.body.password as string;
  
      console.log("Received request with the following data:");
      console.log("ID:", id);
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
  
      if (!id || !name || !email) {
        console.log("Invalid data provided");
        res.status(400);
        throw new Error("Dados Inválidos");
      }
  
      await db
        .insert({
          id: id,
          name: name,
          email: email,
          password: password,
        })
        .into("users");
  
      console.log("User inserted into the database successfully");
  
      res.status(200).send({ message: "Cadastro Realizado com sucesso" });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(400).send(error);
    }
  });
  

  app.post("/products", async (req: Request, res: Response) => {
    try {
      const id = req.body.id as string;
      const name = req.body.name as string;
      const price = req.body.price as number;
      const description = req.body.description as string;
      const image_url = req.body.image_url as string;
      if (!id || !name || isNaN(price) || !description || !image_url) {
        console.log("Dados inválidos:", req.body);
        res.status(400);
        throw new Error("Dados Inválidos");
      }
  
      console.log("Inserindo produto no banco de dados:", {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url,
      });
  
      await db
        .insert({
          id: id,
          name: name,
          price: price,
          description: description,
          image_url: image_url,
        })
        .into("product");
  
      console.log("Produto cadastrado com sucesso");
  
      res.status(200).send({ message: "Produto cadastrado com sucesso" });
    } catch (error) {
      console.log("Erro ao cadastrar produto:", error);
      res.status(400).send(error);
    }
  });
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("product");
    res.status(200).send(result);
  } catch (error) {
    res.send(400).send(error);
  }
});
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const [products] = await db
      .select("*")
      .from("product")
      .where({ name: name });

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.put("/product/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImage = req.body.image_url;

    console.log("idToEdit:", idToEdit);
    console.log("newId:", newId);
    console.log("newName:", newName);
    console.log("newPrice:", newPrice);
    console.log("newDescription:", newDescription);
    console.log("newImage:", newImage);

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser um number");
      }
      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no minimo um caracter");
      }
    }

    const [product] = await db("product").where({ id: idToEdit });
    if (product) {
      const updateProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newImage || product.imageUrl,
      };

      console.log("updateProduct:", updateProduct);

      await db("product").where({ id: idToEdit }).update(updateProduct);
    } else {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    console.log("Update successful");
    res.status(200).send("Atualização realizada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(400).send("erro");
  }
});
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, product } = req.body;

    console.log("Request Body:", req.body);

    if (id == undefined || typeof id != "string" || id.length < 1) {
      res.statusCode = 400;
      throw new Error(`'id' is requerid, need to be the string type 
          and must heave at least one character`);
    }
    if (buyer == undefined || typeof buyer != "string" || buyer.length < 1) {
      res.statusCode = 400;
      throw new Error(`'buyer' is requirid, need to be the string type
          and must heave at least one character`);
    }
    if (product == undefined || product.length < 1) {
      res.statusCode = 400;
      throw new Error("incomplete purchase, missing products");
    }
    
    const productsFromDb = [];

    for (let products of product) {
      const [result] = await db("product").where({ id: products.id });
      if (!result) {
        throw new Error(`Produto ${product.id} nao encontrado`);
      }
      productsFromDb.push(result);
    }

    // cria o objeto da nova compra
    const newPurchase: PurchaseData = {
      id: id,
      buyer: buyer,
      total_price: productsFromDb.reduce(
        (accumulator, current) => accumulator + current.price,
        0
      ),
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    // criar o objeto do produtos
    const newPurchaseProducts: PurchaseProducts[] = [];

    for (let products of product) {
      const newProduct: PurchaseProducts = {
        product_id: products.id,
        purchase_id: id,
        quantity: products.quantity,
      };
      newPurchaseProducts.push(newProduct);
    }

    console.log("New Purchase:", newPurchase);
    console.log("New Purchase Products:", newPurchaseProducts);

    // salva do banco de dados a compra
    await db("purchases").insert(newPurchase);
    await db("purchases_products").insert(newPurchaseProducts);

    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (error: any) {
    console.log("Error:", error);
    res.status(400).send({ error: error.message || JSON.stringify(error) });
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    await db("purchases_products").where("purchase_id", idToDelete).del();

    await db("purchases").del().where({ id: idToDelete });
    res.status(200).send({ message: "Compra Deletado" });
  } catch (error) {
    console.log("Error:", error);
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idSearch = req.params.id;
    const [resultPurchase] = await db
      .select(
        "purchases.id AS IDCompra",
        "purchases.buyer AS IDComprador",
        "users.name AS Cliente",
        "users.email AS EmailUsuario",
        "purchases.total_price AS ValorTotal",
        "purchases.created_at AS DataDaCompra"
      )
      .from("purchases")
      .innerJoin("users", "purchases.buyer", "=", "users.id")
      .where("purchases.id", "=", idSearch);

    console.log("Result Purchase:", resultPurchase);

    const resultPurchaseProducts = await db
      .select(
        "product.id",
        "product.name",
        "product.price",
        "product.description",
        "product.image_url AS imageUrl",
        "quantity"
      )
      .from("purchases_products")
      .innerJoin("product", "product_id", "product.id")
      .where("purchase_id", "=", idSearch);

    console.log("Result Purchase Products:", resultPurchaseProducts);

    const result = {
      ...resultPurchase,
      products: resultPurchaseProducts,
    };

    console.log("Result:", result);

    res.status(200).json(result);
  } catch (error) {
    console.log("Error:", error);
  }
});