import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";
import { loginSchema } from "@/schemas/auth.schema";
import z from "zod";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/common/FormField";
import logo from "@/assets/img/bacson-logo.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { UserRoleEnum } from "@/components/enums/user-role.enum";

type LoginInput = z.input<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });
    const { login } = useAuth();
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginInput) => {
        try {
            const res = await login({
                email: data.email,
                password: data.password,
            });

            setUser(res.user);

            const user = res.user;

            if (user.role === UserRoleEnum.SUPERUSER) {
                navigate(ROUTES.DEVICES);
            } else {
                navigate(ROUTES.SELECT_OPCENTER);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm space-y-5 rounded-xl bg-white p-6 shadow-md"
            >
                <div className="text-center flex flex-col">
                    <img src={logo} alt="logo" className="w-1/4 mb-2 self-center" />
                    <h1 className="text-4xl font-semibold">Login</h1>
                </div>

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
