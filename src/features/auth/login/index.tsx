import * as Yup from "yup";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";

import { useAppDispatch } from "../../../utiles/hooks/useAppDispatch";

import { signIn } from "../authSlice";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email jest wymagany"),
  password: Yup.string().required("Hasło jest wymagane"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setError("");
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = (await dispatch(signIn({ email, password }))) as any;
    if (signIn.fulfilled.match(res)) {
      setLoading(false);
    } else {
      setError(res?.error.code);
      setLoading(false);
    }
  });

  return (
    <form className="flex w-full max-w-[360px] flex-col" onSubmit={onSubmit}>
      <Input
        className="mb-2"
        variant="text"
        errorMsg={errors.email?.message as string}
        label="Adres email"
        placeholder="Wpisz swój adres email"
        {...register("email")}
      />
      <Input
        variant="text"
        type="password"
        errorMsg={errors.password?.message as string}
        label="Hasło"
        placeholder="Wpisz hasło"
        {...register("password")}
      />
      <div className="mt-6 flex w-full justify-center">
        <Button
          type="submit"
          variant="primary"
          disabled={formState.isSubmitting}
          isLoading={isLoading}
        >
          Zaloguj się
        </Button>
      </div>
      {error && (
        <div
          className="my-4 rounded-lg border border-red-300 bg-red-50 p-4 dark:bg-red-200"
          role="alert"
        >
          <div className="mt-2 mb-4 text-sm text-red-900 dark:text-red-800">
            {error}
          </div>
        </div>
      )}
      <div className="mt-6 flex w-full justify-center">
        <div>
          Nie masz konta?{" "}
          <Link to={"rejestracja"}>
            <span className="underline">Zarejestruj się!</span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
