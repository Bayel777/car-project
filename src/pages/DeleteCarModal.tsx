// DeleteCarModal.tsx

import { Button } from "@/components/ui/Button";
import { XIcon } from "lucide-react";
import { FC } from "react";

interface DeleteCarModalProps {
  modal: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCarModal: FC<DeleteCarModalProps> = ({
  modal,
  onClose,
  onConfirm,
}) => {
  return (
<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center w-full p-4">
  <div className="bg-white rounded-lg p-6 shadow-lg w-1/3 relative animate-scale-in">
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
      aria-label="Закрыть"
    >
      <XIcon className="w-5 h-5" />
    </button>

    <h2 className="text-lg font-semibold mb-2">Подтвердите удаление</h2>
    <p>
      Вы уверены, что хотите удалить машину <span className="font-medium">{modal}</span>?
    </p>

    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onClose}>
        Отмена
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        Удалить
      </Button>
    </div>
  </div>
</div>

  );
};

export default DeleteCarModal;
