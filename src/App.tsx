import { useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

const regExp = {
  login: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,16}$/,
};

function App() {

  const { register, handleSubmit, watch, setFocus, formState: { errors } } = useForm(); // добавляем watch

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    setFocus("name");
  }, [setFocus])

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit(onSubmit)} className="regForm">
        <h1>Form</h1>
        <input className={`${errors.name ? "borderRed" : "borderBlue"}`} {...register("name", { required: true})} {...register("name", { required: true })} type="text" placeholder="name" name="name" />
        {errors.name && (
          <span className="red">Имя обязательно</span>
        )}
        <input className={`${errors.login ? "borderRed" : "borderBlue"}`} {...register("login", { required: true, pattern: regExp.login })} type="text" placeholder="login" name="login" />
        {errors.login && (
          <span className="red">Неправильный логин</span>
        )}
        <input className={`${errors.password ? "borderRed" : "borderBlue"}`} {...register("password", { required: true, pattern: regExp.password })} type="password" placeholder="password" name="password" />
        {errors.password && (
          <span className="red">Пароль должен содержать хотя бы одну букву, одну цифру и один специальный символ (!@#$%^&*)</span>
        )}

        <input className={`${errors.confirmPassword ? "borderRed" : "borderBlue"}`}
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === watch("password") || "Должно совпадать с паролем"
          })}
          type="password" placeholder="confirm password" name="confirmPassword"
        />
        {errors.confirmPassword && (
          <span className="red">{errors.confirmPassword.message}</span>
        )}

        <label>
          <input className="checkbox" type="checkbox" {...register("terms", { required: true })} />
          Я согласен с условиями
        </label>
        {errors.terms && (
          <span className="red">Подтвердите что вы соглашаетесь с условиями</span>
        )}

        <button>Отправить</button>
      </form>
    </div>
  );
}

export default App;
