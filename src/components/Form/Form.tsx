import classNames from "classnames";
import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { getPosId, getToken, addUser } from "../api";
import { Position } from "../types";
import "./Form.scss";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// eslint-disable-next-line
const regExp = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
// eslint-disable-next-line
const regExpPhone = /^[\+]{0,1}380([0-9]{9})$/;

export const Form: React.FC<{ updateUsers: () => void }> = ({
  updateUsers,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [posId, setPosId] = useState<string>("1");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    async function result() {
      const response = await getPosId();
      const responseToken = await getToken();

      if (response.success) {
        setPositions(response.positions);
      }

      if (responseToken.success) {
        setToken(responseToken.token);
      }
    }

    result();
  }, []);

  const hangleChange =
    (setValue: SetState<string>, setError?: SetState<string | null>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(value);
      setError?.(null);
      if (serverMessage) {
        setServerMessage(null);
      }
    };

  const validateName = () => {
    if (!name.trim() || name.length < 2 || name.length > 60) {
      setNameError("Min name lenght 2, max 60");

      return false;
    }

    return true;
  };

  const validateEmail = () => {
    if (
      !email.trim() ||
      !regExp.test(email) ||
      email.length < 2 ||
      name.length > 60
    ) {
      setEmailError("Please enter valid email");

      return false;
    }

    return true;
  };

  const validatePhone = () => {
    if (!phone.trim() || !regExpPhone.test(phone)) {
      setPhoneError("Please enter valid phone number");

      return false;
    }

    return true;
  };

  const validationImage = (file: File | null) => {
    if (!file) {
      setFileError("image is required");

      return false;
    }

    if (file.size > 5e6) {
      setFileError("Please upload a file smaller than 5 MB");

      return false;
    }

    return true;
  };

  const fileChangedHandler = (event: ChangeEvent) => {
    let target = event.target as HTMLInputElement;

    const image: File = (target.files as FileList)[0];

    setFile(image);

    if (validationImage(image)) {
      setFileError(null);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const arrFunc = [
      validateName(),
      validateEmail(),
      validatePhone(),
      validationImage(file),
    ];
    const validate = arrFunc.every((el) => el);

    if (validate) {
      const formData = new FormData();
      formData.append("position_id", String(posId));
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("photo", file as Blob);

      const result = await addUser(formData, token);
      if (!result.success) {
        setServerMessage(result.message);
        return;
      }

      setName("");
      setEmail("");
      setPhone("");
      setPosId("1");
      setFile(null);

      updateUsers();
    }
  };

  const formIsInvalid =
    nameError !== null ||
    emailError !== null ||
    phoneError !== null ||
    fileError !== null ||
    !name ||
    !email ||
    !phone ||
    !file;
  return (
    <>
      <h2 className="Form__title">Working with POST request</h2>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="Form__inputs">
          <div>
            <label>
              <input
                type="text"
                name="name"
                placeholder="Your name*"
                value={name}
                onChange={hangleChange(setName, setNameError)}
                onBlur={validateName}
                className={classNames("Form__input", {
                  Form__inputErr: nameError,
                })}
              />
            </label>
            {nameError && <p className="Form__errorMessage">{nameError}</p>}
          </div>

          <div>
            <label>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={email}
                onChange={hangleChange(setEmail, setEmailError)}
                onBlur={validateEmail}
                className={classNames("Form__input", {
                  Form__inputErr: emailError,
                })}
              />
            </label>
            {emailError && <p className="Form__errorMessage">{emailError}</p>}
          </div>

          <div>
            <label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={phone}
                onChange={hangleChange(setPhone, setPhoneError)}
                onBlur={validatePhone}
                className={classNames("Form__input", {
                  Form__inputErr: phoneError,
                })}
              />
            </label>
            {phoneError && <p className="Form__errorMessage">{phoneError}</p>}
          </div>
        </div>
        <p className="Form__phoneFormat">+38 (XXX) XXX - XX - XX</p>
        <p className="Form__position">Select your position*</p>
        {positions.length > 0 ? (
          <ul>
            {positions.map((pos) => (
              <li className="Form__posList" key={pos.id}>
                <label className="Form__radio">
                  <input
                    type="radio"
                    name="position"
                    value={pos.id}
                    onChange={hangleChange(setPosId)}
                    className="Form__radioInput"
                    checked={pos.id === +posId}
                  />
                  {pos.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <label className="Form__chooseFile">
          <div className="Form__blockLoad">Upload</div>
          <input
            type="file"
            className="Form__loadInput"
            accept=".jpg, .jpeg"
            onChange={fileChangedHandler}
          />
          <span className="Form__loadContent">{file ? file.name : "Upload your photo*"}</span>
        </label>
        {fileError && <p className="Form__errorMessage">{fileError}</p>}
        <p className="Form__requiredMessage">* field are required</p>
        {serverMessage && <p className="Form__errorMessage">{serverMessage}</p>}
        <button
          type="submit"
          disabled={formIsInvalid}
          className={classNames("button Form__submit", {
            Button__disabled: formIsInvalid,
          })}
        >
          Sign up
        </button>
      </form>
    </>
  );
};
