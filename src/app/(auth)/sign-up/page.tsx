import SignUpForm from "@/components/auth/SignUpForm";
import AuthFormContainer from "@/components/container/AuthFormContainer";

export default function SignUp() {

    return (
        <AuthFormContainer header="Sign Up" subHeader="Create an account">
            <SignUpForm />
        </AuthFormContainer>
    )
}