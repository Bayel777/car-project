import { Button } from "./Button";
import Typography from "./Typography";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/store/UserContext";

function Header() {
  const navigate = useNavigate();
  const { name } = useUser();

  return (
    <div className=" fixed top-0 left-0 w-full bg-white z-50 border-b">
      <div className="flex justify-between items-center py-4  p-4">
        <Typography>M Car</Typography>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/cars/error-page")}
          >
            Тестовая ошибка!
          </Button>
          {name && <p className="font-semibold"> {name}</p>}
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
