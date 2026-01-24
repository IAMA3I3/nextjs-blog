import SignInForm from "@/components/auth/SignInForm";
import AuthFormContainer from "@/components/container/AuthFormContainer";

export default function SignIn() {

    return (
        <AuthFormContainer header="Sign In" subHeader="Login to your account">
            <SignInForm />
        </AuthFormContainer>
    )
}