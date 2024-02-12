import { ChangeEvent, FormEvent, useState } from "react";
import Form from "../../components/forms/Form";
import { signUp } from "../../fetch/authentication";
import { useNavigate } from "react-router-dom";

interface IFormInputs extends EventTarget {
    username: { value: string };
    email: { value: string };
    password: { value: string };
    confirmPassword: { value: string };
}

export default function Register() {
    const navigate = useNavigate();
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string>('');
    const [passwordValidations, setPasswordValidations] = useState<boolean[]>([false, false, false, false]);

    const registerInputs = [
        {
            label: "username",
            placeholder: "Enter your username",
            type: "text",
            isRequired: true
        },
        {
            label: "email",
            placeholder: "Enter your Email",
            type: "email",
            isRequired: true
        },
        {
            label: "password",
            placeholder: "Enter your password",
            type: "password",
            isRequired: true
        },
        {
            label: "confirmPassword",
            placeholder: "Confirm your password",
            type: "password",
            isRequired: true,
        },
    ];

    const validatePassword = (password: string): boolean[] => {
        const regexUpperCase = /[A-Z]/;
        const regexLowerCase = /[a-z]/;
        const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        const regexMinLength = /.{12,}/;

        return [
            regexUpperCase.test(password),
            regexLowerCase.test(password),
            regexSpecialChar.test(password),
            regexMinLength.test(password),
        ];
    };

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        const passwordValidations = validatePassword(e.target.value);
        setPasswordValidations(passwordValidations);
    }

    const onRegister = async (e: FormEvent) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = e.target as unknown as IFormInputs;

        if (password.value !== confirmPassword.value) {
            setPasswordMismatch(true);
            setErrorMessages("Passwords do not match");
            return;
        } else {
            setPasswordMismatch(false);
            setErrorMessages('');
        }

        const passwordErrorMessages = validatePassword(password.value);
        setPasswordValidations(passwordErrorMessages);

        const userInfo = {
            username: username.value,
            email: email.value,
            password: password.value,
        };

        if (!passwordMismatch && passwordErrorMessages.every(valid => valid) && (await signUp(userInfo))) {
            navigate("/auth/login");
        }
    };

    return (
        <Form
            title="Register"
            inputs={registerInputs}
            buttonLabel="Submit"
            onSubmit={onRegister}
            errorMessage={errorMessages.split('\n')}
            onPasswordChange={handlePasswordChange}
            passwordValidations={passwordValidations}
        />
    );
}
