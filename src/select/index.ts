import { createConnect } from 'react-electors';
import { AppState } from '../store';

export const { Provider, useSelector } = createConnect<AppState>();
