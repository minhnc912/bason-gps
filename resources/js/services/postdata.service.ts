import api from "./api";


export interface PostDataPayload {
    uid: string;
    fwv: string;
    coord: string;
    temp: number;
    pwr: number;
    t: string;
    sim: string;
}

export const testPostData = async (
    payload: PostDataPayload
) => {
    return api.get("/postdata", {
        params: payload,
    });
};

export const testPostDataUrl = async (
    url: string
) => {
    return fetch(url).then((response) =>
        response.json()
    );
};
