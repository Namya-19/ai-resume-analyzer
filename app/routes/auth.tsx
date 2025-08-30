import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {type NavigateFunction, useLocation, useNavigate} from "react-router";

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'Log into your account'},
])
const Auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next:string = location.search.split('next=')[1];
    const navigate:NavigateFunction = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);
    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h1>Log In to Continue Your Job Journey</h1>
                    </div>
                    <div className="text-center">
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log in</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>

        </main>
    )
}

export default Auth