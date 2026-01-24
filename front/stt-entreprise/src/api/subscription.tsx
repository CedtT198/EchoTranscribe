import api from "./api";
import React, { createContext, useContext, useState, useEffect } from "react";


export const getSubscriptions = async (filter: SubscriptionFilter, page: number, size: number) => {
    try {
        return await api.post(`/subscription/findByFilters?page=${page}&size=${size}&sort=createdDate,desc`, filter)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface SubscriptionFilter {
    mail: string,
    startDate: string,
    endDate: string,
    subscriptionType: string,
    status: string
}

export const filterDefault: SubscriptionFilter = {
    mail: "",
    startDate: "",
    endDate: "",
    subscriptionType: "",
    status: ""
}

export const getSalesDashboardStat = async (startDate: any, endDate: any) => {
    if (startDate === undefined) startDate = "";
    if (endDate === undefined) endDate = "";

    try {
        return await api.get(`/dashboard/getSalesStat?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface SubscriptionWithCodeProps {
    auth0id: string | undefined,
    mail: string | undefined,
    code: string
}

export const subscribeWithCode = async (props: SubscriptionWithCodeProps | undefined) => {
    try {
        return await api.post(`/subscription/invitationcode`, props);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const cancelSubscription = async (subId: any) => {
    try {
        return await api.post(`/payment/subscription/cancel/${encodeURIComponent(subId)}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

interface SubscriptionContextType {
    subscription: Subscription | null;
    setSubscription: (sub: Subscription | null) => void;
}

const UserSessionContext = createContext<SubscriptionContextType | undefined>(undefined);
export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subscription, setSubscriptionState] = useState<Subscription | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("subscription");
        if (stored) {
            setSubscriptionState(JSON.parse(stored));
        }
    }, []);

    const setSubscription = (sub: Subscription | null) => {
        if (sub) {
            sessionStorage.setItem("subscription", JSON.stringify(sub));
        } else {
            sessionStorage.removeItem("subscription");
        }
        setSubscriptionState(sub);
    };

    return (
        <UserSessionContext.Provider value={{ subscription, setSubscription }}>
            {children}
        </UserSessionContext.Provider>
    );
};

export const useUserSession = () => {
    const ctx = useContext(UserSessionContext);
    if (!ctx) {
        throw new Error("useUserSession must be used within UserSessionProvider");
    }
  return ctx;
};

export interface Subscription {
    id: string,
    auth0_id: string,
    mail: string,
    subscription_type: string,
    status: string,
    purchase_date: string,
    end_date: string,
    invitation_code: string,
    subscription_owner: string,
    price: number
}

export const findActual = async (auth0id: any) => {
    try {
        return await api.post(`/subscription/findActual/${encodeURIComponent(auth0id)}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const findAllByAuth0Id = async (auth0id: any) => {
    try {
        return await api.get(`/subscription/findAllByAuth0Id/${encodeURIComponent(auth0id)}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}