import { useState } from "react";
import axios from "axios";
import useSessionUserIdMatch from "./useSessionUserIdMatch";
import { useCallback } from "react";

const defaultState = {
    sendRequest: () => {},
    isLoading: false,
    error: null,
    data: null,
};

function usePostRequest(userId, accessToken) {
    const isValidUserId = useSessionUserIdMatch(userId);
    if (!isValidUserId) {
        return defaultState;
    }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (url, data) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };
    return { sendRequest, isLoading, error };
}

function useGetRequest(userId, accessToken, requireValidUser = true) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const isValidUserId = useSessionUserIdMatch(userId);

    if (requireValidUser && !isValidUserId) {
        return defaultState;
    }
    const sendRequest = useCallback(
        async (url) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(url, {
                    headers: accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {},
                });
                setData(response.data);
                return response.data;
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        },
        [accessToken]
    );
    return { sendRequest, isLoading, error, data };
}

function useDeleteRequest(userId, accessToken) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const isValidUserId = useSessionUserIdMatch(userId);

    if (!isValidUserId) {
        return defaultState;
    }

    const sendDeleteRequest = async (url) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`${url}`, {
                headers: {
                    headers: accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {},
                },
            });
            setData(response.data);
            return response.data;
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { sendDeleteRequest, isLoading, error, data };
}
export { usePostRequest, useGetRequest, useDeleteRequest };
