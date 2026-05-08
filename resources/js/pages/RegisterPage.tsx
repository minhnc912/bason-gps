import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { registerSchema } from "@/schemas/auth.schema";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import logo from "@/assets/img/duke-energy.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useNavigate();
    const { register: handleRegister } = useAuth();

    const onSubmit = async (data: FormData) => {
        try {
            await handleRegister({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            toast.success("Đăng ký thành công, vui lòng đăng nhập");

            navigate(ROUTES.LOGIN);
        } catch {
            toast("Register failed!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm space-y-5 rounded-xl bg-white p-6 shadow-md"
            >
                <div className="text-center">
                    <img src={logo} alt="logo" className="w-full mb-2" />
                    <h1 className="text-4xl font-semibold">Register</h1>
                </div>

                <FormField label="Name" error={errors.name?.message}>
                    <Input
                        type="name"
                        placeholder="Enter name"
                        {...register("name")}
                    />
                </FormField>

                <FormField label="Email" error={errors.email?.message}>
                    <Input
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />
                </FormField>

                <FormField label="Password" error={errors.password?.message}>
                    <Input
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                    />
                </FormField>

                <Button type="submit" loading={isSubmitting}>
                    Login
                </Button>
            </form>
        </div>
    );
}
