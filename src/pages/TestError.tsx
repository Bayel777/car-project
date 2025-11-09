import { Alert, AlertTitle, AlertDescription } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

function TestError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center fixed inset-0 z-50">
      <div className="max-w-md w-full mx-4">
        <Alert variant="destructive">
          <AlertTitle>Что-то пошло не так</AlertTitle>
          <AlertDescription>
            <p>Тестовая ошибка!</p>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Вернуться назад
              </Button>

               <Button variant="destructive" className="bg-black " onClick={() => navigate(-1)}>
                На главную
              </Button>
              
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default TestError;