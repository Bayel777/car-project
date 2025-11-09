import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/store/UserContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Registration = () => {
  const navigate = useNavigate();
  const { setName } = useUser();

  const defaultEmail = "newuser@mokky.test";

  const [fullName, setFullName] = useState("Вася Пупкин");
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("123456");

  const handleRegister = () => {
    setName(fullName);
    navigate("/cars");
  };

  const isButtonDisabled = email.trim() === "" || email.trim() === defaultEmail;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">Регистрация</h2>

        <label className="block text-sm font-medium mb-1">Полное имя</label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1 mt-2">Почта</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1 mt-2">Пароль</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={handleRegister}
          disabled={isButtonDisabled}
          className="w-full mt-4"
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default Registration;
