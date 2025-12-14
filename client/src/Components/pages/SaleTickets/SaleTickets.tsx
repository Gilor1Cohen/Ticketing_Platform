import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import type { TicketForm, TicketType } from "../../../Types/Tickets.types";
import FormInput from "../../UI/FormInput/FormInput";
import BtnOne from "../../UI/Btns/BtnOne/BtnOne";
import SelectBox from "../../UI/SelectBox/SelectBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SaleTickets.css";
import { AuthContext } from "../../../Context/AuthContext";

function SaleTicketsPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TicketForm>({ mode: "all" });

  const [category, setCategory] = useState<TicketType>("Sport");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: TicketForm) {
    try {
      setLoading(true);
      data = { ...data, Type: category };
      const add = await axios.post<any>(
        "http://localhost:3002/AddTickets",
        data,
        { withCredentials: true }
      );
      if (add.status === 200) {
        setLoading(false);
        alert("Ticket added successfully");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (auth) auth.logout();
        navigate("/Login");
        return;
      }

      setError("Failed to add ticket. Please try again.");
    }
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowMin = tomorrow.toISOString().slice(0, 16);

  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  const futureMax = future.toISOString().slice(0, 16);

  return (
    <div id="SaleTicketsPage">
      <h1 id="SaleTickets-h">Sale a ticket</h1>
      <form id="SaleTickets-form" onSubmit={handleSubmit(onSubmit)}>
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
          errors={errors.Date?.message}
        />
        <BtnOne Type="submit" Text="Sale Ticket" Disabled={!isValid} />

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default SaleTicketsPage;
