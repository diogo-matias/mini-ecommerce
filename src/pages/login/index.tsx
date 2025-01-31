import { Input } from "@/components";
import { useAppDispatch } from "@/hooks/redux";
import { UserActions } from "@/store/modules/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

const logoUrl =
    "https://static.wixstatic.com/media/1a36e2_cd60738cde8146e88b7bc4eea18ac98c~mv2.png/v1/crop/x_0,y_183,w_1920,h_714/fill/w_206,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Agro.png";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();

    function onSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("Preencha todos os campos");
            return;
        }

        dispatch(UserActions.setUserInfo({ email, password }));
        router.push("./product-list");
    }

    return (
        <div className="mx-auto max-w-fit flex items-center h-screen px-10">
            <div className="flex flex-col px-10 py-10 rounded-lg border shadow-lg">
                <Image
                    src={logoUrl}
                    alt={logoUrl}
                    width={120}
                    height={120}
                    unoptimized
                    className="mb-4"
                />
                <h2 className="mb-4 text-center font-bold">
                    Entrar na sua conta
                </h2>
                <form className="flex flex-col" onSubmit={onSubmit}>
                    <Input
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                        type="email"
                        required
                    />
                    <Input
                        placeholder="Senha"
                        value={password}
                        setValue={setPassword}
                        type="password"
                        required={true}
                    />
                    <button
                        className="border px-2 py-2 rounded-full text-sm bg-black text-white"
                        type="submit"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    );
}
