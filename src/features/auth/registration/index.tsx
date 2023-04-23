import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import YupPassword from "yup-password";

import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";

import { useAppDispatch } from "../../../utiles/hooks/useAppDispatch";

import { signUp } from "../authSlice";
import Select from "../../../components/select/Select";
import regions from "../../../constants/regions";
import ControllerDatePicker from "../../../components/datepickers/ControllerDatePicker";
import { Link } from "react-router-dom";
import { useState } from "react";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email jest wymagany")
    .email("Wprowadzony email jest nieprawidłowy"),
  name: Yup.string().required("Imie jest wymagane"),
  lastname: Yup.string().required("Nazwisko jest wymagane"),
  password: Yup.string()
    .required("Hasło jest wymagane")
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .minLowercase(1, "Hasło musi zawierać minimum 1 małą literę")
    .minUppercase(1, "Hasło musi zawierać minimum 1 duża literę")
    .minNumbers(1, "Hasło musi zawierać minimum 1 cyfrę"),
  password2: Yup.string().oneOf(
    [Yup.ref("password")],
    "Hasła nie pasują do siebie"
  ),
});

const Registration = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const { register, handleSubmit, formState, control } = useForm(formOptions);

  const { errors } = formState;

  const onSubmit = handleSubmit(
    async ({ email, password, name, lastname, region, dateOfBirth }) => {
      setError("");
      setLoading(true);
      const res = (await dispatch(
        signUp({ email, password, name, lastname, region, dateOfBirth })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )) as any;
      if (signUp.fulfilled.match(res)) {
        setLoading(false);
      } else {
        setError(res?.error.code);
        setLoading(false);
      }
    }
  );

  return (
    <form className="flex w-full max-w-[360px] flex-col" onSubmit={onSubmit}>
      <Input
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
      <Input
        variant="text"
        type="password"
        errorMsg={errors.password2?.message as string}
        label="Powtórz hasło"
        placeholder="Wpisz hasło ponownie"
        {...register("password2")}
      />
      <Input
        variant="text"
        errorMsg={errors.name?.message as string}
        label="Imię"
        placeholder="Podaj swoje imię"
        {...register("name")}
      />
      <Input
        variant="text"
        errorMsg={errors.lastname?.message as string}
        label="Nazwisko"
        placeholder="Podaj swoje nazwisko"
        {...register("lastname")}
      />
      <Select
        id="selector-region"
        variant="text"
        list={regions}
        label="Województwo"
        {...register("region")}
      />
      <ControllerDatePicker
        name="dateOfBirth"
        control={control}
        rules={{ required: true }}
        label="Data urodzenia*"
        placeholder="Podaj datę urodzin"
        dateFormat="dd-MM-yyyy"
        isClearable
      />
      <div className="mt-6 flex w-full justify-center">
        <Button
          type="submit"
          variant="primary"
          disabled={formState.isSubmitting}
          isLoading={isLoading}
        >
          Zarejestruj się
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
          <Link to={"/"}>
            <span className="underline">Powrót do strony logowania</span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Registration;
