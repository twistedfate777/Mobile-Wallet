import { useUser } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { useState } from "react";
import { Alert } from "react-native";

const API_URL = "http://localhost:5000/api";

export const useTransactions = (userId) => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState({
    balance: undefined,
    income: undefined,
    expenses: undefined,
  });

  const createUserIfNotExist = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          username: user.emailAddresses[0].emailAddress.split("@")[0],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("createUserIfNotExist", error);
    } catch (error) {
      console.log("Error in createUserIfNotExist", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await createUserIfNotExist();
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      console.log(res)
      if (!res.ok) throw new Error("Error Deleting transaction");

      loadData();
      Alert.alert("Transaction Deleted Successfully");
    } catch (error) {
      console.error("Error deleteTransaction", error);
    }
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
