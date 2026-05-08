import footerImg from "@/assets/img/tmall.png";

export default function Footer() {
    return (
        <footer className="flex items-center justify-center gap-1 bg-white py-3 text-center text-sm text-gray-500">
            Powered by{" "}
            <img className="w-12.5 -mb-1.75" src={footerImg} alt="bacson" /> Bac
            Son Technologies
        </footer>
    );
}
