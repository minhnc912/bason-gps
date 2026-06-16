import { useState } from "react";

import toast from "react-hot-toast";

import PostDataForm from "@/components/pages/tools/PostDataForm";
import PostDataUrlTester from "@/components/pages/tools/PostDataUrlTester";
import PostDataResponse from "@/components/pages/tools/PostDataResponse";

import {
    testPostData,
    testPostDataUrl,
} from "@/services/postdata.service";

export default function PostDataPage() {
    const [loading, setLoading] =
        useState(false);

    const [response, setResponse] =
        useState<unknown>(null);

    const handleFormSubmit = async (
        payload: any
    ) => {
        try {
            setLoading(true);

            const result =
                await testPostData(payload);

            setResponse(result.data);

            toast.success("Success");
        } catch (error: any) {
            setResponse(error.response?.data);

            toast.error("Request failed");
        } finally {
            setLoading(false);
        }
    };

    const handleUrlSubmit = async (
        url: string
    ) => {
        try {
            setLoading(true);

            const result =
                await testPostDataUrl(url);

            setResponse(result);

            toast.success("Success");
        } catch (error: any) {
            toast.error("Request failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Post Data
                </h1>
            </div>

            <PostDataForm
                loading={loading}
                onSubmit={handleFormSubmit}
            />

            <PostDataUrlTester
                loading={loading}
                onSubmit={handleUrlSubmit}
            />

            <PostDataResponse
                response={response}
            />
        </div>
    );
}
