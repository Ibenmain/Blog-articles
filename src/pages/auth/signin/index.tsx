import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as Yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/router"


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});


interface FormValues {
    email: string;
    password: string;
}

// Handle form submission

const SignIn = () => {
    const router = useRouter();

    const onSubmit = async ({ email, password }: FormValues) => {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.ok) {
            toast.success("Successfully signed in!");
            console.log("Successfully signed in!", result);

            router.push("/home");
        } else {
            toast.error("Invalid email or password :(");
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Card className="mx-auto  max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input  {...register('email')} id="email" type="email" placeholder="m@example.com" />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register('password')} id="password" type="password" />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors?.password?.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </div>
                        <div className="flex justify-center items-center p-2 space-x-1">
                            <h5>New on our platform?</h5>
                            <Link className="text-blue-500 hover:underline" href={'/auth/signup'}>
                                Create an account
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn