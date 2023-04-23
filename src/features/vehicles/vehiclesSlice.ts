import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../lib/store';

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useFirestore } from '../../lib/firebase';

interface VehicleParams {
    model: string;
    color: string;
    productionYear: number;
    manufacturer: string;
    seats: number;
    engineDisplacement: number;
}

export interface Vehicle extends VehicleParams {
    id: string;
}

export interface VehiclesState {
    list: Array<Vehicle> | [];
}

export const initialState: VehiclesState = {
    list: [],
};

export const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVehicles.fulfilled, (state, action) => {
                state.list = action.payload;
            })
    },
});

export const getAllVehicles = createAsyncThunk(
    'vehicles/getAllVehicles',
    async () => {
        const fb = useFirestore()

        const querySnapshot = await getDocs(collection(fb, 'vehicles'));
        const vehicles = querySnapshot.docs.map((doc) => {
            const vehicle = doc.data();
            return {
                model: vehicle?.model ?? '',
                color: vehicle?.color ?? '',
                productionYear: vehicle?.productionYear ?? '',
                manufacturer: vehicle?.manufacturer ?? '',
                seats: vehicle?.seats ?? '',
                engineDisplacement: vehicle?.engineDisplacement ?? '',
                id: doc.id as string
            };
        });

        return vehicles
    }
);

export const createVehicle = createAsyncThunk(
    'vehicles/createVehicle',
    async ({ model, color, productionYear, manufacturer, seats, engineDisplacement }: VehicleParams) => {
        const fb = useFirestore()

        try {
            const docRef = await addDoc(collection(fb, 'vehicles'), {
                model, color, productionYear, manufacturer, seats, engineDisplacement
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (err) {
            console.log(err);
        }
    }
);

export const updateVehicle = createAsyncThunk(
    'vehicles/updateVehicle',
    async ({ data, id }: { data: Partial<Vehicle>, id: string }) => {
        const fb = useFirestore()

        try {
            const vehicleRef = doc(fb, 'vehicles', id);
            await updateDoc(vehicleRef, data);
            console.log('Document updated with ID: ', id);
        } catch (err) {
            console.log(err);
        }

    }
);

export const deleteVehicle = createAsyncThunk(
    'vehicles/deleteVehicle',
    async ({ id }: { id: string }) => {
        const fb = useFirestore()

        try {
            const vehicleRef = doc(fb, 'vehicles', id);
            await deleteDoc(vehicleRef);
            console.log('Document deleted with ID: ', id);
        } catch (err) {
            console.log(err);
        }
    }
);


export const selectVehiclesList = (state: AppState) => state.vehicles.list;

export default vehiclesSlice.reducer;
