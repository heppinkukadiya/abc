import banner from './Images/Group 2238.svg';
import {Link} from "react-router-dom";
import smart from './Images/smart 1.svg';
import certified from './Images/certified 1.svg';
import secured from './Images/secured 1.svg';

function Home() {
    return (<div>
            <div className="w-full">
                <Link to="/about">
                    <img
                        src={banner}
                        alt="Top Banner"
                        className="w-full lg:h-auto object-cover cursor-pointer"
                    />
                </Link>
            </div>
            <div
                className="flex flex-col items-center text-center gap-6 lg:flex-row lg:justify-center lg:items-start my-10">
                <div className="max-w-sm">
                    <img src={smart} alt="Smart" className="mx-auto mb-2"/>
                    <h1 className="text-lg font-semibold mb-1">Smart</h1>
                    <p className="text-sm text-[#7B7B7B]">We sell directly to the buyer and help you get the best
                        value by cutting out all middlemen.</p>
                </div>

                <div className="max-w-sm">
                    <img src={certified} alt="Certified" className="mx-auto mb-2"/>
                    <h1 className="text-lg font-semibold mb-1">Certified</h1>
                    <p className="text-sm text-[#7B7B7B]">All diamonds are checked at the GIA laboratory to ensure
                        complete accuracy and confidence for both buyers.</p>
                </div>

                <div className="max-w-sm">
                    <img src={secured} alt="Secured" className="mx-auto mb-2"/>
                    <h1 className="text-lg font-semibold mb-1">Secured</h1>
                    <p className="text-sm text-[#7B7B7B]">We handle payment, collection & delivery of all sales
                        and purchases. Your transaction is as safe as it can be.</p>
                </div>
            </div>
            <div className=" flex justify-center">
                <h1 className="text-5xl font-bold">Discover Our Best Deal</h1>
            </div>


        </div>
    );
}

export default Home;
