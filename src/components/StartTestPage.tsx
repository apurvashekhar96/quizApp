import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import "./StartTestPage.css";

const StartTestPage = () => {
  type language = "english" | "kannada" | "other";

  //input states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<number | null>(null);
  const [language, setLanguage] = useState<language>("english");
  const { started, handleSetStarted } = useGlobalContext();

  const handleNameChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "name": {
        setName(name);
        console.log(started);

        break;
      }
      case "email": {
        setEmail(e.target.value);
        break;
      }
      case "mobile": {
        setMobile(Number(e.target.value));
        break;
      }
      case "language": {
        console.log(e.target.value);
        break;
      }
      default:
        throw new Error("Input not handled, thrown error by devloper");
    }
  };

  const handleStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSetStarted();
  };

  return (
    <div className="container">
      <p className="container title">
        Please enter Your details to start the test !
      </p>
      <form onSubmit={handleStart} className="inputForm">
        <div className="inputName">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleNameChange}
            id="name"
            type="text"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="inputEmail">
          <label htmlFor="email">Email Id</label>
          <input
            onChange={handleNameChange}
            id="email"
            type="email"
            placeholder="Enter Your email"
          />
        </div>
        <div className="inputPhoneNumber">
          <label htmlFor="mobile">Mobile No</label>
          <input
            onChange={handleNameChange}
            id="mobile"
            type="text"
            minLength={10}
            maxLength={11}
            placeholder="Enter Your Mobile"
          />
        </div>
        <div className="inputLanguage">
          <label htmlFor="language">Select Language</label>
          <select id="language" onChange={handleNameChange}>
            <option value="English">English</option>
            <option value="Kannada">Kannada</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button disabled={!Number(name) && !Number(email) && !Number(mobile)}>
          Start Test
        </button>
      </form>
    </div>
  );
};

export default StartTestPage;
