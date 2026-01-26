import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../features/auth/authApi'
import { vendorApi } from '../features/vendors/vendorApi'
import { bookingApi } from '../features/bookings/bookingApi'
import { paymentApi } from '../features/payments/paymentApi'
import uiSlice from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      vendorApi.middleware,
      bookingApi.middleware,
      paymentApi.middleware
    ),
})

setupListeners(store.dispatch)
export default store
