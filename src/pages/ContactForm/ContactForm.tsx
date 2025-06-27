import { Outlet } from "react-router";
import styles from "./ContactForm.module.css";
import { NavBar } from "../Tutorials/components/NavBar";
import { HomeButton } from "../../components";
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

type ContactFormInputs = {
  name: string;
  email: string;
  age: number;
  gender: string;
  terms: boolean;
};

const validationsSchema = Joi.object<ContactFormInputs>({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  age: Joi.number().min(18).max(120).required().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be at least 18',
    'number.max': 'Age must be less than or equal to 120',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().required().messages({
    'string.empty': 'Gender is required',
  }),
  terms: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the terms and conditions',
  }),
});

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: joiResolver(validationsSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h1>Contact Form</h1>
      <HomeButton />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register('name')}
          placeholder="Name"
          className={styles.textInput}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <input
          {...register('email')}
          placeholder="Email"
          type="email"
          className={styles.textInput}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          {...register('age')}
          placeholder="Age"
          type="number"
          className={styles.textInput}
        />
        {errors.age && <span>{errors.age.message}</span>}

        <select {...register('gender')}>
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}

        <label>
          <input
            {...register('terms')}
            type="checkbox"
            className={styles.termsCheckbox}
          />
            Accept terms and conditions
        </label>
        {errors.terms && <span>{errors.terms.message}</span>}
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
      <NavBar />
      <Outlet />
    </div>
  );
};