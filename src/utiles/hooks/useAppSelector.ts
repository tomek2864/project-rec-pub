import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../../lib/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
