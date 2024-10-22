import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUp() {
    return (
        <Card className="mx-auto max-w-sm ">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                <CardDescription>Create new account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="email">Username</Label>
                        <Input id="email" type="email" placeholder="johndeo" required />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                </div>
                <div className="flex justify-center items-center p-2 space-x-1">
                    <h5>Already have an account?</h5>
                    <Link className="text-blue-500 hover:underline" href={'/auth/sign-in'}>
                        Sign in instead
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}