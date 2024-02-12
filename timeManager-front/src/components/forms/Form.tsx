import { Button, Card, CardBody, CardFooter, Divider, Input } from "@nextui-org/react";
import { FormEventHandler, ChangeEvent } from "react";
import MyCardHeader from "../card/MyCardHeader";

interface IFormProps {
    title: string;
    inputs: {
        label: string;
        placeholder?: string;
        type: string;
        isRequired?: boolean;
        value?: string;
    }[];
    buttonLabel: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    errorMessage?: string[];
    onPasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    passwordValidations?: boolean[];
}

export default function Form({
    title,
    inputs,
    buttonLabel,
    onSubmit,
    errorMessage,
    onPasswordChange,
    passwordValidations,
}: IFormProps) {
    return (
        <form className="flex justify-center" onSubmit={onSubmit}>
            <Card className="w-35">
                <MyCardHeader title={title} />
                <CardBody>
                    {inputs.map((input, key) => {
                        return (
                            <Input
                                className="mb-3"
                                key={input.label + key}
                                label={input.label}
                                name={input.label}
                                placeholder={input.placeholder}
                                labelPlacement="outside"
                                isRequired={input.isRequired}
                                type={input.type}
                                value={input.value}
                                aria-label={input.label}
                                onChange={input.label === 'password' ? onPasswordChange : undefined}
                            />
                        );
                    })}
                </CardBody>
                {inputs.length >= 4 && inputs[3].label === 'confirmPassword' && (
                    <div>
                        <ul>
                            <li className={passwordValidations[0] ? 'text-green-500' : 'text-red-500'}>
                                {passwordValidations[0] ? '✅ Password contains at least one uppercase letter' : '❌ Password does not contain at least one uppercase letter'}
                            </li>
                            <li className={passwordValidations[1] ? 'text-green-500' : 'text-red-500'}>
                                {passwordValidations[1] ? '✅ Password contains at least one lowercase letter' : '❌ Password does not contain at least one lowercase letter'}
                            </li>
                            <li className={passwordValidations[2] ? 'text-green-500' : 'text-red-500'}>
                                {passwordValidations[2] ? '✅ Password contains at least one special character' : '❌ Password does not contain at least one special character'}
                            </li>
                            <li className={passwordValidations[3] ? 'text-green-500' : 'text-red-500'}>
                                {passwordValidations[3] ? '✅ Password has a minimum length of 12 characters' : '❌ Password does not have a minimum length of 12 characters'}
                            </li>
                        </ul>
                    </div>
                )}
                {/* Display error message if present */
                errorMessage && errorMessage.length > 0 && (
                    <div className="text-red-500 text-center mt-2">
                        {errorMessage.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <Divider />
                <CardFooter className="justify-center">
                    <Button type="submit" children={buttonLabel} />
                </CardFooter>
            </Card>
        </form>
    );
}
