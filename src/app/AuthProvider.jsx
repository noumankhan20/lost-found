"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "@/redux/slices/authApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const { data,isLoading } = useGetMeQuery();

  useEffect(() => {
    if (data?.user) {
      dispatch(setCredentials(data.user));
    }
  }, [data, dispatch]);

  return children;
}