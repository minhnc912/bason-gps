import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { loginSchema } from "@/schemas/auth.schema";
import z from "zod";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { useOpcenters } from "@/hooks/useOpcenters";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/FormField";
import logo from "@/assets/img/duke-energy.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

type LoginInput = z.input<typeof loginSchema>;
type LoginOutput = z.output<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });
    const { login } = useAuth();
    const { opCenters } = useOpcenters();
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginInput) => {
        const parsed: LoginOutput = loginSchema.parse(data);
        try {
            const res = await login({
                email: data.email,
                password: data.password,
                opcenter_id: parsed.opcenter_id,
            });

            setUser(res.user);

            toast.success("Login Successfully");
            navigate(ROUTES.DASHBOARD);
        } catch {
            toast.error("Email or password is wrong!");
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

                <FormField label="Center" error={errors.opcenter_id?.message}>
                    <select
                        {...register("opcenter_id")}
                        className="w-full rounded-lg border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Choose a center</option>

                        {opCenters?.map((o) => (
                            <option key={o.id} value={o.id}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                </FormField>

                <Button type="submit" loading={isSubmitting}>
                    Login
                </Button>
            </form>
        </div>
    );
}
