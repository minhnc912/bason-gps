import { API_ENDPOINTS } from "@/constants/api";
import api from "./api";
import { OpCenter } from "@/types/opcenter";

export const getOpCenters = () => api.get<OpCenter[]>(API_ENDPOINTS.OPCENTER);
