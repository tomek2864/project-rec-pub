import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../lib/store';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from '../../lib/firebase';

import UserRoles from '../../enums/user-roles.enum';

export interface User {
  uid: string;
  email: string | null;
  name: string;
  lastname: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams {
  email: string;
  password: string;
  name: string;
  lastname: string;
  region: string;
  dateOfBirth?: string;
}

export interface AuthState {
  userDetails: User | null;
  userRole: UserRoles;
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  userDetails: null,
  userRole: UserRoles.unknown,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setGuestRole: (state) => {
      state.userDetails = null
      state.userRole = UserRoles.guest
    },
  },
  extraReducers: (builder) => {
    builder
      /* .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }) */
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.userRole = UserRoles.regular
          state.userDetails = {
            uid: action.payload.uid,
            email: action.payload.email,
            name: action.payload.name,
            lastname: action.payload.lastname,
          }
        } else {
          state.userRole = UserRoles.guest
          state.userDetails = null
        }
      })
      /* .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Wystąpił błąd podczas logowania';
      }) */
      .addCase(logout.fulfilled, (state,) => {
        state.userDetails = null;
        state.userRole = UserRoles.guest;
      })
  },
});

export const signUp = createAsyncThunk(
  'auth/registerUser',
  async (userData: SignUpParams) => {

    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      userData.email,
      userData.password,
    );

    const { uid, email } = userCredential.user;
    const fb = useFirestore()

    await setDoc(doc(fb, 'users', uid), {
      name: userData.name,
      lastname: userData.lastname,
      region: userData.region,
      dateOfBirth: userData.dateOfBirth ?? null,
    });

    return { uid, email };
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async ({ uid, email }: { uid: string, email: string | null }) => {
    const fb = useFirestore()

    const docRef = doc(fb, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userProfile = docSnap.data();
      return {
        uid,
        email,
        name: userProfile.name as string,
        lastname: userProfile.lastname as string
      };
    } else {
      return null
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/loginUser',
  async (userData: SignInParams) => {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      userData.email,
      userData.password
    );

    const { uid, email } = userCredential.user;
    const fb = useFirestore()

    const docRef = doc(fb, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userProfile = docSnap.data();
      return {
        uid,
        email,
        name: userProfile.name,
        lastname: userProfile.lastname
      };
    } else {
      return null
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(getAuth());
});

export const { setGuestRole } = authSlice.actions;

export const selectCurrentUser = (state: AppState) => state.auth.userDetails;
export const selectCurrentUserRole = (state: AppState) => state.auth.userRole;
export const selectCurrentUserLoading = (state: AppState) => state.auth.isLoading;
export const selectCurrentUserError = (state: AppState) => state.auth.error;

export default authSlice.reducer;
