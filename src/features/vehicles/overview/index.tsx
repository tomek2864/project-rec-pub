/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState } from "react";
import { ImArrowUp2, ImArrowDown2, ImBin } from "react-icons/im";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Vehicle } from "../vehiclesSlice";

import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: unknown,
      updatedId: string
    ) => void;
  }
}

const defaultColumn = {
  cell: ({
    getValue,
    row: { index, original },
    column: { id },
    table,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value, original.id);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Input
        className="m-0"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

type OverviewVehiclesType = {
  data: Array<Vehicle>;
  onUpdateData: (id: string, value: Partial<Vehicle>) => void;
  onDeleteData: (id: string) => void;
  onAddData: () => void;
};

const OverviewVehicles = ({
  data: dataFromApi,
  onUpdateData,
  onDeleteData,
  onAddData,
}: OverviewVehiclesType) => {
  const [data, setDataTmp] = useState(dataFromApi);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "manufacturer",
        header: () => <span>Marka</span>,
      },
      {
        accessorKey: "model",
        header: () => <span>Model</span>,
      },
      {
        accessorKey: "engineDisplacement",
        header: () => <span>Pojemność silnika</span>,
      },
      {
        accessorKey: "seats",
        header: () => <span>Ilość siedzeń</span>,
      },
      {
        accessorKey: "productionYear",
        header: () => <span>Rok produkcji</span>,
      },
      {
        accessorKey: "color",
        header: () => <span>Kolor</span>,
      },
    ],
    []
  );

  useEffect(() => {
    setDataTmp(dataFromApi);
  }, [dataFromApi]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value, updatedId) => {
        setDataTmp((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
        const newValue = {
          [columnId]: value,
        };
        onUpdateData(updatedId, newValue);
      },
    },
    debugTable: false,
  });

  const handleDeleteRow = (index: number) => {
    const dataToUpdate = [...data];
    const idToRemove = dataToUpdate[index].id;

    if (index > -1 && index < dataToUpdate.length) {
      dataToUpdate.splice(index, 1);
    }
    setDataTmp(dataToUpdate);
    onDeleteData(idToRemove);
  };

  if (data.length === 0) {
    return (
      <div
        className="flex flex-col
    "
      >
        Brak danych
        <Button className="mt-2" onClick={onAddData}>
          Dodaj przykładowe pojazdy
        </Button>
      </div>
    );
  }

  return (
    <div className="p-2 overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center justify-center"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ImArrowUp2 className="ml-2 w-3 h-3" />,
                          desc: <ImArrowDown2 className="ml-2 w-3 h-3" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
                <td>
                  <Button
                    className="mx-2"
                    onClick={() => handleDeleteRow(parseInt(row.id, 10))}
                  >
                    <ImBin className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewVehicles;
