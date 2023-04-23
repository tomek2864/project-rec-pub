import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../utiles/hooks/useAppDispatch";
import {
  Vehicle,
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  selectVehiclesList,
  updateVehicle,
} from "./vehiclesSlice";
import { useAppSelector } from "../../utiles/hooks/useAppSelector";
import OverviewVehicles from "./overview";
import Spinner from "../../components/Spinner";
import cars from "../../constants/cars";

const Vehicles = () => {
  const dispatch = useAppDispatch();
  const vehiclesList = useAppSelector(selectVehiclesList);
  const [isLoading, setLoading] = useState(true);

  const handleFetchVehiclesCallback = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(getAllVehicles());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleAddVehiclesCallback = useCallback(async () => {
    try {
      cars.forEach(async (car, index) => {
        await dispatch(
          createVehicle({
            model: car.model,
            color: car.color,
            productionYear: car.productionYear,
            manufacturer: car.manufacturer,
            seats: car.seats,
            engineDisplacement: car.engineDisplacement,
          })
        );
        if (index === cars.length - 1) {
          await handleFetchVehiclesCallback();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, handleFetchVehiclesCallback]);

  const handleUpdateVehicleCallback = useCallback(
    async (id: string, value: Partial<Vehicle>) => {
      await dispatch(
        updateVehicle({
          id,
          data: value,
        })
      );
    },
    [dispatch]
  );

  const handleDeleteVehicleCallback = useCallback(
    async (id: string) => {
      await dispatch(
        deleteVehicle({
          id,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchVehiclesCallback();
  }, [dispatch, handleFetchVehiclesCallback]);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[70vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <OverviewVehicles
      data={vehiclesList}
      onAddData={handleAddVehiclesCallback}
      onUpdateData={handleUpdateVehicleCallback}
      onDeleteData={handleDeleteVehicleCallback}
    />
  );
};

export default Vehicles;
