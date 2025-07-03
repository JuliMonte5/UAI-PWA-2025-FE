import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import axiosInstance from "../../config/axios";

type ProductFormInputs = {
  _id?: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  image: string;
};

const validationsSchema = Joi.object<ProductFormInputs>({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  amount: Joi.number().min(1).required().messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount must be at least 1",
    "any.required": "Amount is required",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 0",
    "any.required": "Price is required",
  }),
  image: Joi.string().uri().required().messages({
    "string.uri": "Image must be a valid URL",
    "string.empty": "Image URL is required",
  }),
});

const Dashboard = () => {
  const [data, setData] = useState<ProductFormInputs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: joiResolver(validationsSchema),
  });

  const onSubmit = async (data) => {
    const sendData = {
      name: data.name,
      description: data.description,
      amount: data.amount,
      price: data.price,
      image: data.image,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/products",
        sendData
      );
      console.log("Product created:", response.data);
      fetchData();
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setData(response.data.data);
      console.log(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      console.log(`Product with id ${id} deleted successfully`);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}
      {data && (
        <ul>
          {data.map((item: ProductFormInputs) => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <button onClick={() => deleteProduct(item._id || "")}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          placeholder="Product Name"
          className="text-input"
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          {...register("description")}
          placeholder="Product Description"
          className="text-input"
        />
        {errors.description && <span>{errors.description.message}</span>}
        <input
          {...register("amount")}
          placeholder="Amount"
          type="number"
          className="text-input"
        />
        {errors.amount && <span>{errors.amount.message}</span>}
        <input
          {...register("price")}
          placeholder="Price"
          type="number"
          className="text-input"
        />
        {errors.price && <span>{errors.price.message}</span>}
        <input
          {...register("image")}
          placeholder="Image URL"
          className="text-input"
        />
        {errors.image && <span>{errors.image.message}</span>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
