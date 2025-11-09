import { ReactNode } from "react";

type TableProps<T> = {
  data: T[];
  headers: string[];
  renderRow: (item: T) => ReactNode; 
  renderActions?: (item: T) => ReactNode;
};

function Table<T>({ data, headers, renderRow, renderActions }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white p-4 shadow-sm ml-4 mr-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="p-4 text-sm font-medium text-gray-700 border-b"
              >
                {header}
              </th>
            ))}
            {renderActions && (
              <th className="p-4 text-sm font-medium text-gray-700 border-b text-right">
                Действия
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {renderRow(item)}
              {renderActions && <td className="p-4">{renderActions(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

