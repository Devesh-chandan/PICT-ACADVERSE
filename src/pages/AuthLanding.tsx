import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import type { AuthUser } from "@/lib/api";
import { cn } from "@/lib/utils";

// Google sign-in only appears when a client id is configured (see main.tsx)
const GOOGLE_ENABLED = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const MIN_PASSWORD_LENGTH = 6;

type Mode = "login" | "register";

const OFFERINGS = [
    { title: "Previous year papers", text: "Every exam, organised by year and subject." },
    { title: "Notes and lab programs", text: "Revision material and viva questions in one place." },
    { title: "Subject coverage", text: "See which subjects have papers and where help is needed." },
];

const inputClass =
    "h-10 rounded-md border-neutral-800 bg-neutral-900 text-sm text-neutral-100 placeholder:text-neutral-500 " +
    "focus-visible:border-indigo-500 focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-0";

const Brand = () => (
    <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-indigo-600">
            <GraduationCap className="h-[18px] w-[18px] text-white" aria-hidden />
        </span>
        <span className="text-lg font-semibold tracking-tight text-neutral-50">Acadverse</span>
    </div>
);

const Field = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
        <Label htmlFor={id} className="text-sm font-medium text-neutral-300">{label}</Label>
        {children}
    </div>
);

const PasswordInput = ({
    id, value, onChange, autoComplete,
}: { id: string; value: string; onChange: (v: string) => void; autoComplete: string }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <Input
                id={id}
                type={visible ? "text" : "password"}
                autoComplete={autoComplete}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(inputClass, "pr-10")}
            />
            <button
                type="button"
                aria-label={visible ? "Hide password" : "Show password"}
                onClick={() => setVisible((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-500 transition-colors hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
            >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
};

const Divider = () => (
    <div className="my-5 flex items-center gap-3 text-xs text-neutral-500" aria-hidden>
        <span className="h-px flex-1 bg-neutral-800" />
        or
        <span className="h-px flex-1 bg-neutral-800" />
    </div>
);

const AuthLanding = () => {
    const navigate = useNavigate();
    const { login, register, googleLogin, isAuthenticated, user } = useAuth();
    const [mode, setMode] = useState<Mode>("login");
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // The Google button has a fixed pixel width, so size it to the form (max 400)
    const formRef = useRef<HTMLDivElement>(null);
    const [googleWidth, setGoogleWidth] = useState(360);
    useEffect(() => {
        const measure = () => formRef.current && setGoogleWidth(Math.min(Math.floor(formRef.current.clientWidth), 400));
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const isLogin = mode === "login";

    // Admins land in the admin portal, everyone else in the app
    const enterApp = (signedIn: Pick<AuthUser, "role">) => navigate(signedIn.role === "admin" ? "/admin" : "/home");

    const switchMode = () => {
        setMode(isLogin ? "register" : "login");
        setFormError("");
        setPassword("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password || (!isLogin && !name.trim())) {
            setFormError(isLogin ? "Enter your email and password." : "Please fill in all fields.");
            return;
        }
        if (!isLogin && password.length < MIN_PASSWORD_LENGTH) {
            setFormError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
            return;
        }
        setFormError("");
        setIsLoading(true);
        try {
            const signedIn = isLogin
                ? await login(email.trim(), password)
                : await register(name.trim(), email.trim(), password);
            enterApp(signedIn);
        } catch {
            // The error toast is shown by AuthContext
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            toast.error("Google sign-in failed", { description: "No credential received" });
            return;
        }
        setIsLoading(true);
        try {
            enterApp(await googleLogin(credentialResponse.credential));
        } catch {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-indigo-500/30 lg:grid lg:grid-cols-[5fr_6fr]">
            {/* Left: product summary (desktop only) */}
            <aside className="hidden border-r border-neutral-800 bg-neutral-900/40 p-12 lg:flex lg:min-h-screen lg:flex-col lg:justify-between xl:p-16">
                <Brand />

                <div className="max-w-md">
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-50 xl:text-4xl">
                        Academic resources for PICT students
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-neutral-400">
                        Everything you need to prepare for exams, collected and maintained by students.
                    </p>
                    <dl className="mt-10 divide-y divide-neutral-800 border-y border-neutral-800">
                        {OFFERINGS.map(({ title, text }) => (
                            <div key={title} className="py-4">
                                <dt className="text-sm font-medium text-neutral-100">{title}</dt>
                                <dd className="mt-0.5 text-sm text-neutral-500">{text}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <p className="text-xs text-neutral-600">An independent student initiative, not affiliated with PICT.</p>
            </aside>

            {/* Right: authentication */}
            <main className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-8">
                <div ref={formRef} className="mx-auto w-full max-w-[400px]">
                    <div className="mb-10 lg:hidden"><Brand /></div>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-50">
                        {isLogin ? "Sign in" : "Create your account"}
                    </h2>
                    <p className="mt-1.5 text-sm text-neutral-400">
                        {isLogin ? "Use your Acadverse account to continue." : "Save your progress and access every resource."}
                    </p>

                    {isAuthenticated && user && (
                        <div className="mt-6 flex items-center justify-between gap-3 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-3">
                            <div className="min-w-0">
                                <div className="text-xs text-neutral-500">Signed in as</div>
                                <div className="truncate text-sm font-medium">{user.name}</div>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => enterApp(user)}
                                className="shrink-0 bg-indigo-600 text-white hover:bg-indigo-500"
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
                        {!isLogin && (
                            <Field id="name" label="Full name">
                                <Input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                            </Field>
                        )}

                        <Field id="email" label="Email">
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                            />
                        </Field>

                        <Field id="password" label="Password">
                            <PasswordInput
                                id="password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                value={password}
                                onChange={setPassword}
                            />
                            {!isLogin && <p className="pt-1 text-xs text-neutral-500">At least {MIN_PASSWORD_LENGTH} characters.</p>}
                        </Field>

                        <p role="alert" aria-live="polite" className={cn("text-sm text-red-400", !formError && "sr-only")}>
                            {formError}
                        </p>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-10 w-full rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500"
                        >
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isLogin ? "Signing in" : "Creating account"}</>
                            ) : isLogin ? "Sign in" : "Create account"}
                        </Button>
                    </form>

                    {GOOGLE_ENABLED && (
                        <>
                            <Divider />
                            <div className="flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => toast.error("Google sign-in failed", { description: "Please try again" })}
                                    theme="filled_black"
                                    size="large"
                                    text="continue_with"
                                    shape="rectangular"
                                    width={String(googleWidth)}
                                />
                            </div>
                        </>
                    )}

                    <Divider />
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => navigate("/home")}
                        className="h-10 w-full rounded-md border-neutral-800 bg-transparent text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-white"
                    >
                        Continue as guest
                    </Button>

                    <p className="mt-6 text-center text-sm text-neutral-400">
                        {isLogin ? "New to Acadverse?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={switchMode}
                            className="font-medium text-indigo-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
                        >
                            {isLogin ? "Create an account" : "Sign in"}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AuthLanding;
