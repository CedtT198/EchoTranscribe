// import { getToken } from "../auth/token";
import { getAccessTokenGlobal } from "../Auth0ProviderWithNavigate";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenGlobal();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Optionnel : gérer les 401 → logout ou refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       // Optionnel : forcer logout ou refresh
//       // const { logout } = useAuth0(); → impossible ici
//       // Donc souvent on redirige manuellement :
//       window.location.href = '/logout'; // ou une route qui logout
//     }
//     return Promise.reject(error);
//   }
// );

export default api;