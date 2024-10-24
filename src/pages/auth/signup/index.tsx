import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as Yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast';



const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

interface FormValues {
    username: string;
    email: string;
    password: string;
}


const SignUp = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post('/api/auth/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                toast.success('User created successfully');
                router.push('/auth/signin');
            } else {
                toast.error('Failed to create user');
            }
        }

        catch (error) {
            console.error('Failed to create user', error);
            toast.error('Failed to create user');
        }
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">

            <Card className="mx-auto max-w-sm ">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                    <CardDescription>Create new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input {...register('username')} id="username" type="username" placeholder="johndeo" />
                                {errors.username && (
                                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register('email')} id="email" type="email" placeholder="m@example.com" />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register('password')} id="password" type="password" />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Sign up
                            </Button>
                        </div>
                        <div className="flex justify-center items-center p-2 space-x-1">
                            <h5>Already have an account?</h5>
                            <Link className="text-blue-500 hover:underline" href={'/auth/signin'}>
                                Sign-in instead
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

export default SignUp