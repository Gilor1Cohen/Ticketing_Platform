import { useLocation, useNavigate } from "react-router-dom";
import type {
  Ticket,
  TicketForm,
  TicketType,
} from "../../../Types/Tickets.types";
import { useForm } from "react-hook-form";
import BtnOne from "../../UI/Btns/BtnOne/BtnOne";
import FormInput from "../../UI/FormInput/FormInput";
import { useContext, useState } from "react";
import SelectBox from "../../UI/SelectBox/SelectBox";
import axios from "axios";
import "./UpdatePage.css";
import { AuthContext } from "../../../Context/AuthContext";
import { CartContext } from "../../../Context/CartContext";

function UpdatePage() {
  const Auth = useContext(AuthContext);
  const Cart = useContext(CartContext);

  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as { Ticket: Ticket };

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<TicketType>("Sport");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TicketForm>({ mode: "all" });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowMin = tomorrow.toISOString().slice(0, 16);

  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  const futureMax = future.toISOString().slice(0, 16);

  async function onSubmit(data: TicketForm) {
    try {
      setLoading(true);
      setError(null);
      data = { ...data, Type: category, _id: state?.Ticket._id };
      if (
        data.Date == state?.Ticket.Date &&
        data.Price == state?.Ticket.Price &&
        data.Title == state?.Ticket.Title &&
        data.Type == state?.Ticket.Type
      ) {
        return;
      }

      const res = await axios.put<Ticket>(
        "http://localhost:3002/UpdateTickets",
        data,
        {
          withCredentials: true,
        }
      );

      setLoading(false);

      if (res.status === 200) {
        Cart?.removeFromCart(res.data._id);
        Cart?.addToCart(res.data);
        setLoading(false);
        navigate("/my");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.status === 401) {
          if (Auth) Auth.logout();
          navigate("/login");
          return;
        }

        setError(error.response.data.message);
      }
    }
  }

  return (
    <section id="UpdatePage">
      <h1 id="UpdatePage-h">Update Tickets</h1>
      <form id="UpdatePage-form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formType="Ticket"
          type="text"
          placeholder="Title"
          register={register}
          name="Title"
          options={{
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          }}
          value={state?.Ticket.Title}
          errors={errors.Title?.message}
        />
        <FormInput
          formType="Ticket"
          type="number"
          placeholder="Price"
          register={register}
          name="Price"
          options={{
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" },
          }}
          errors={errors.Price?.message}
          value={`${state?.Ticket.Price}`}
        />

        <SelectBox setCategory={setCategory} />

        <FormInput
          formType="Ticket"
          type="datetime-local"
          placeholder="Date"
          register={register}
          name="Date"
          options={{
            required: "Date is required",
            min: {
              value: tomorrowMin,
              message: "Date must be in the future",
            },
            max: {
              value: futureMax,
              message: "Date is too far in the future",
            },
          }}
          value={state?.Ticket.Date.replace(":00.000Z", "")}
          errors={errors.Date?.message}
        />
        <BtnOne
          Type="submit"
          Text="Sale Ticket"
          Disabled={!isValid || loading}
        />

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}

export default UpdatePage;
