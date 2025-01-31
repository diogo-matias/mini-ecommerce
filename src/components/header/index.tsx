import {
    faCartShopping,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";

export function Header() {
    const router = useRouter();

    function renderHeader() {
        const logoUrl =
            "https://static.wixstatic.com/media/1a36e2_cd60738cde8146e88b7bc4eea18ac98c~mv2.png/v1/crop/x_0,y_183,w_1920,h_714/fill/w_206,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Agro.png";

        return (
            <header className="w-screen h-16 bg-white shadow-lg fixed">
                <div className="max-w-[1280px] h-full px-10 mx-auto flex justify-between items-center">
                    <Image
                        src={logoUrl}
                        alt={logoUrl}
                        width={100}
                        height={100}
                        unoptimized
                    />
                    <div className="flex gap-4 items-center">
                        <p
                            className="hover:underline underline-offset-4 cursor-pointer"
                            onClick={() => router.push("/product-list")}
                        >
                            Produtos
                        </p>
                        <div className="h-4 w-[1px] bg-black" />
                        <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faUserCircle}
                            onClick={() => router.push("/login")}
                        />
                        <div className="h-4 w-[1px] bg-black" />
                        <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faCartShopping}
                            onClick={() => router.push("/cart")}
                        />
                    </div>
                </div>
            </header>
        );
    }

    return renderHeader();
}
