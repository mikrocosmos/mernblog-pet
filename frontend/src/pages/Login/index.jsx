import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchUser, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "tewsg2211@test.ru",
			password: "123456",
		},
		mode: "onChange",
	});

	const onSubmit = (values) => {
		dispatch(fetchUser(values));
	};
	if (isAuth) {
		return <Navigate to="/" />;
	}
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					type="email"
					{...register("email", { required: "Укажите почту" })}
					helperText={errors.email?.message}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type="password"
					{...register("password", { required: "Укажите пароль" })}
					fullWidth
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
