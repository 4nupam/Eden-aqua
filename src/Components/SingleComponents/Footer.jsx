import React from "react";

export default function Footer() {
    const commiunityLinks = [
        { name: "YouTube", link: "https://www.youtube.com", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828435/image_2_1_tc0qdq.png" },
        { name: "Instagram", link: "https://www.instagram.com", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828500/image_4_1_frd0tz.png" },
        { name: "Twitter", link: "https://www.twitter.com", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828506/image_5_1_mjm4yj.png" },
        { name: "Facebook", link: "https://www.facebook.com", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828474/image_3_1_qitpek.png" },
    ];

    const payment = [
        { name: "Visa", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828532/image_15_1_chvngt.png" },
        { name: "MasterCard", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828576/image_16_eu4wll.png" },
        { name: "G Pay", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828595/image_17_ibdeum.png" },
        { name: "Paytm", image: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828608/image_18_ddruuj.png" },
    ];

    return (
        <footer
            className="bg-cover bg-center text-white"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828436/image_15_ocr0s3.png')" }}
        >
            {/* Centered container with padding */}
            <div className="flex items-center justify-center min-h-[80vh] px-4 sm:px-8 lg:px-20 py-12">
                <div className="bg-[var(--primary-color)]/80 w-full max-w-screen-xl p-6 sm:p-10 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Column 1 - Contact Info */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-semibold text-lg">CONTACT US</h3>
                                <p className="text-sm">For any inquiry</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">EMAIL</h3>
                                <p className="text-sm">info@edenaquawater.com</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">PHONE</h3>
                                <p className="text-sm font-light">+91-9992912121</p>
                                <p className="text-sm font-light">+91-9992912122</p>
                            </div>
                            <p className="text-sm">
                                GREEN WAGON FOOD PRODUCTS PVT. LTD. IS THE AUTHORIZED ONLINE RESELLER FOR EDEN AQUA WATER
                            </p>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-lg">QUICK LINKS</h3>
                            <ul className="space-y-1">
                                {[
                                    { name: "ABOUT", link: "/about" },
                                    { name: "SUSTAINABILITY", link: "/sustainability" },
                                    { name: "CONTACT", link: "/contact" },
                                    { name: "SUBSCRIBE & SAVE", link: "/subscribe-save" },
                                    { name: "PRIVACY POLICY", link: "/privacy" },
                                    { name: "FAQS", link: "/faq" },
                                    { name: "FEEDBACK", link: "/feedback" },
                                ].map((e, index) => (
                                    <li key={index}>
                                        <a href={e.link} className="text-sm hover:underline">
                                            {e.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3 - Community & Payment */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">COMMUNITY</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {commiunityLinks.map((e, index) => (
                                        <a href={e.link} key={index} target="_blank" rel="noopener noreferrer">
                                            <img src={e.image} alt={e.name} className="w-10 h-10 object-contain" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">PAYMENT WE ACCEPT</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {payment.map((e, index) => (
                                        <img src={e.image} alt={e.name} key={index} className="w-10 h-10 object-contain" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-10 pt-6 border-t border-white flex flex-col sm:flex-row items-center justify-between gap-4">
                       <div></div>
                        <span className="text-sm text-center">© 2025 EDEN AQUA WATER. ALL RIGHTS RESERVED.</span>
                        <img
                            src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828431/Group_2085663303_ekldgq.png"
                            alt="logo"
                            className="w-32 object-contain"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
