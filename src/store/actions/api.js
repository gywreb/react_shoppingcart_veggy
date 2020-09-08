import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/apiCallBegan");
export const apiRequestSuccess = createAction("api/apiRequestSuccess");
export const apiRequestFailed = createAction("api/apiRequestFailed");
