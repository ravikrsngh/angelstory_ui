import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "../components/ui/input"
import { useTriggerOTP } from "../hooks/forgot-password/use-trigger-otp"
import toast from "react-hot-toast"
import { userId } from "../signals/user-signal"
import { useVerifyOTP } from "../hooks/forgot-password/use-verify-otp"
import { useResetPassword } from "../hooks/forgot-password/use-reset-password"
import { useNavigate } from "react-router-dom"



const TriggerOTP = ({setStep, setEmail}:{setStep: Dispatch<SetStateAction<number>>, setEmail:Dispatch<SetStateAction<string>>}) => {
    const triggerOTPHook = useTriggerOTP()

    const handleTriggerOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form)
        triggerOTPHook.mutate({email: formData.get('email') as string}, {
            onSuccess: (response) => {
              userId.value = (response as {userId:number}).userId;
              toast.success("OTP sent successfully to your email");
              setEmail(formData.get('email') as string)
              setStep(2)
            }
          })
    }
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password ?
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-0 md:py-12 md:shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleTriggerOTPSubmit}>
              <Input label="Email" name="email" />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  Send OTP
                </button>
              </div>
            </form>

    
          </div>

        </div>
        </>
    )
}

const VerifyOTPComp = ({setStep}:{setStep: Dispatch<SetStateAction<number>>}) => {
    const verifyOTPHook = useVerifyOTP()


    const handleVerifyOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form)
        // verifyOTPHook.mutate({otp: formData.get('otp') as string, userId:userId.value}, {
        //     onSuccess: () => {
        //       toast.success("OTP verified.");
        //       setStep(3)
        //     }
        //   })
        toast.success("OTP verified.");
        setStep(3)
    }
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Verify your OTP
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-0 md:py-12 md:shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleVerifyOTPSubmit}>
              <Input label="OTP" name="otp" />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  Verify OTP
                </button>
              </div>
            </form>

    
          </div>

        </div>
        </>
    )
}


const ResetPassword = ({email}:{email:string}) => {
    const resetPasswordHook = useResetPassword()
    const navigate = useNavigate()
    const handleResetPassword = (e:React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form)
    const password = formData.get('password') as string;
        resetPasswordHook.mutate({username:email, password:password}, {
            onSuccess: () => {
              toast.success("Password changed successfully.");
              navigate('/login')
            }
          })
    }
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Reset
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-0 md:py-12 md:shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <Input label="New Password" name="password" type="password" />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  Change Password
                </button>
              </div>
            </form>

    
          </div>

        </div>
        </>
    )
}

export const ForgotPassword = () => {
    const [step,setStep] = useState<number>(1)
    const [email, setEmail] = useState<string>('')
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-4 md:py-12 sm:px-6 lg:px-8">
            {step == 1? <TriggerOTP setStep={setStep} setEmail={setEmail} /> : null}
            {step == 2? <VerifyOTPComp setStep={setStep} /> : null}
            {step == 3? <ResetPassword email={email}/> : null}
        </div>
    )
}