"use client";

import { FC, useState } from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./Login.module.css";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type InputProps = {
  name: keyof IFormInputs;
  control: any;
  rules: object;
  label: string;
};

const Input: FC<InputProps> = ({ name, control, rules, label }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => {
      return (
        <div className={styles.inputContainer}>
          <label htmlFor={name} className={styles.inputLabel}>
            {label}
          </label>
          <input
            {...field}
            id={name}
            type={name.toLowerCase() === "password" ? "password" : "text"}
            className={styles.inputBox}
            placeholder={label}
          />
          {error && <span className={styles.inputError}>{error.message}</span>}
        </div>
      );
    }}
  />
);

function Login() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const [userData, setUserData] = useState<IFormInputs | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log("userData", userData);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { username, email, password } = data;
    console.log({ username, email, password });
    setUserData(data);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();

      setUserData(result.data);
      setError(null);
    } catch (error) {
      console.error("Registration error web: ", error);
      setError("Registration failed.Please try again.");
    }
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.mainForm}>
      <Input
        name="username"
        control={control}
        rules={{
          required: "Username is required!",
          pattern: {
            value: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            message:
              "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
          },
        }}
        label="Username"
      />
      <Input
        name="email"
        control={control}
        rules={{
          required: "Email is required!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
            message: "Invalid email address!",
          },
        }}
        label="Email"
      />
      <Input
        name="password"
        control={control}
        rules={{
          required: "Password is required!",
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
            message:
              "Password invalid, it should contain 8-20 alphanumeric letters and be unique!",
          },
        }}
        label="Password"
      />
      <Input
        name="confirmPassword"
        control={control}
        rules={{
          required: "Please confirm your password!",
          validate: (value: string) =>
            value === password || "The passwords do not match",
        }}
        label="Confirm Password"
      />
      <div className={styles.btnContainer}>
        <button type="submit" className={styles.formBtn}>
          Submit
        </button>
        <div className={styles.authBtn}>Google</div>
      </div>
    </form>
  );
}

export default Login;
