import api from "./api";

export const hasCommented = async (auth0id: string | undefined) => {
    if (!auth0id) return;
    try {
        return await api.get(`/review/hasCommented/${encodeURIComponent(auth0id)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const save = async (review: Review) => {
    try {
        return await api.post(`/review/save`, review)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const update = async (review: Review) => {
    try {
        return await api.post(`/review/update`, review)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const deleteReview = async (id: string) => {
    try {
        return await api.delete(`/review/delete/${encodeURIComponent(id)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getReviewStats = async () => {
    try {
        return await api.get(`/review/stats`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getStarCount = (id: number, reviewStats: ReviewStats | undefined) => {
    if (!reviewStats) return 0;
    const value = reviewStats.star_counts[id+1] * 100 / reviewStats.total_reviews;
    return value;
}

export interface ReviewStats {
    total_reviews: number;
    average_star: number;
    star_counts: [];
}


export const getReviews = async (page: number, size: number, auth0Id: string, stars: number[]) => {
    const starsString: string = stars.join(","); 

    try {
        return await api.get(`/review/findByStars?page=${page}&size=${size}&sort=createdDate,desc&auth0Id=${encodeURIComponent(auth0Id)}&stars=${encodeURIComponent(starsString)}`)
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export interface Review {
    id: string;
    auth0id: string;
    name: string;
    firstName: string;
    createdDate: string;
    review: string;
    stars: number;
}

export const revDefault: Review = {
    id: "",
    auth0id: "",
    name: "",
    firstName: "",
    createdDate: new Date().toISOString(),
    review: "",
    stars: 1
}
